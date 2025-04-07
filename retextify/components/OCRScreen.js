import React, { useState, useEffect } from "react";
import {
  View,
  Image,
  Alert,
  ActivityIndicator,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Modal,
  TouchableWithoutFeedback,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useRoute, useNavigation, useFocusEffect } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import Icon from "react-native-vector-icons/MaterialIcons";
import * as Clipboard from "expo-clipboard";
import * as FileSystem from "expo-file-system";
import Animated, { FadeIn, FadeOut, SlideInRight, SlideOutRight } from "react-native-reanimated";
// import AnalyzeText from "./components/AnalyzeText";  // Capital "A" and "T"
 // Import the analyzeText function

const { width, height } = Dimensions.get("window");

const OCRScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { imageUri: initialImage } = route.params || {};
  const [image, setImage] = useState(initialImage);
  const [loading, setLoading] = useState(false);
  const [imageLoading, setImageLoading] = useState(false);
  const [extractedText, setExtractedText] = useState("");
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [customText, setCustomText] = useState("");
  const [isImageModalVisible, setImageModalVisible] = useState(false);
  const [isSidebarVisible, setSidebarVisible] = useState(false);
  const [ocrLanguage, setOcrLanguage] = useState("latin"); // Language selection

  useEffect(() => {
    if (initialImage) {
      processImage(initialImage);
    }
  }, [initialImage]);

  useFocusEffect(
    React.useCallback(() => {
      if (route.params?.updatedText) {
        setCustomText(route.params.updatedText);
      }
    }, [route.params?.updatedText])
  );

  const pickImage = async () => {
    setImageLoading(true);
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permission Denied", "Please grant photo library access.");
      setImageLoading(false);
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      const uri = result.assets[0].uri;
      setImage(uri);
      await processImage(uri);
    }
    setImageLoading(false);
  };

  const processImage = async (imageUri) => {
    if (!imageUri) {
      Alert.alert("Error", "No image selected.");
      return;
    }

    setLoading(true);
    setExtractedText("");
    setCustomText("");

    try {
      // Use the analyzeText function from analyzeText.js
      const text = await AnalyzeText(imageUri, ocrLanguage);
      setExtractedText(text);
      setCustomText(text);
    } catch (error) {
      console.error("Processing Error:", error);
      Alert.alert("Error", "Failed to process image. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const applyTemplate = (template) => {
    setSelectedTemplate(template);
    let formattedText = extractedText;
    if (template === "Standard") {
      formattedText = `📄 Standard Format\n\n${extractedText}`;
    } else if (template === "Handwritten") {
      formattedText = `✍️ Handwritten Note\n\n"${extractedText}"`;
    } else if (template === "Custom") {
      formattedText = extractedText;
    }
    setCustomText(formattedText);
  };

  const copyToClipboard = async () => {
    await Clipboard.setStringAsync(customText);
    Alert.alert("Success", "Text copied to clipboard!");
  };

  const saveTextToFile = async () => {
    const fileUri = FileSystem.documentDirectory + "extracted_text.txt";
    await FileSystem.writeAsStringAsync(fileUri, customText);
    Alert.alert("Success", `Text saved to ${fileUri}`);
  };

  const toggleLanguage = () => {
    const newLanguage = ocrLanguage === "latin" ? "japanese" : "latin";
    setOcrLanguage(newLanguage);
    Alert.alert("Language Changed", `OCR language set to ${newLanguage}`);
  };

  return (
    <LinearGradient colors={["#0F172A", "#1E293B"]} style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={28} color="#F8FAFC" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Text Extractor</Text>
        <TouchableOpacity onPress={() => setSidebarVisible(!isSidebarVisible)}>
          <Icon name="menu" size={28} color="#F8FAFC" />
        </TouchableOpacity>
      </View>

      {/* Sidebar */}
      {isSidebarVisible && (
        <Animated.View
          style={styles.sidebarOverlay}
          entering={FadeIn.duration(300)}
          exiting={FadeOut.duration(300)}
        >
          <TouchableWithoutFeedback onPress={() => setSidebarVisible(false)}>
            <Animated.View
              style={styles.sidebar}
              entering={SlideInRight.duration(300)}
              exiting={SlideOutRight.duration(300)}
            >
              <TouchableOpacity style={styles.sidebarItem} onPress={() => navigation.navigate("Home")}>
                <Icon name="home" size={26} color="#F8FAFC" />
                <Text style={styles.sidebarText}>Home</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.sidebarItem} onPress={() => navigation.navigate("Settings")}>
                <Icon name="settings" size={26} color="#F8FAFC" />
                <Text style={styles.sidebarText}>Settings</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.sidebarItem} onPress={() => navigation.navigate("History")}>
                <Icon name="history" size={26} color="#F8FAFC" />
                <Text style={styles.sidebarText}>History</Text>
              </TouchableOpacity>
            </Animated.View>
          </TouchableWithoutFeedback>
        </Animated.View>
      )}

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Animated.View style={styles.contentContainer} entering={FadeIn.duration(600)}>
          {/* Action Buttons */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity 
_donuts onPress={() => navigation.navigate("DocumentScanner")}>
              <LinearGradient
                colors={["#3B82F6", "#1E40AF"]}
                style={styles.buttonGradient}

              >
                <Icon name="document-scanner" size={24} color="#F8FAF" />
                <Text style={styles.buttonText}>Scan Document</Text>
              </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => navigation.navigate('TemplateChooser', { text: extractedText })}
            >
              <LinearGradient
                colors={["#10B981", "#047857"]}
                style={styles.buttonGradient}
              >
                <Icon name="format-align-left" size={24} color="#F8FAFC" />
                <Text style={styles.buttonText}>Templates</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>

          {/* Image Preview */}
          {image && (
            <TouchableOpacity onPress={() => setImageModalVisible(true)}>
              <View style={styles.imageContainer}>
                <Image source={{ uri: image }} style={styles.image} />
                <View style={styles.imageOverlay}>
                  <Text style={styles.imageOverlayText}>Tap to enlarge</Text>
                </View>
              </View>
            </TouchableOpacity>
          )}

          {/* Loading Indicator */}
          {loading && (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color="#60A5FA" />
              <Text style={styles.loadingText}>Processing Image...</Text>
            </View>
          )}

          {/* Extracted Text */}
          {!loading && extractedText ? (
            <>
              <Text style={styles.subTitle}>Extracted Text</Text>
              <TextInput
                style={styles.textArea}
                multiline
                value={customText}
                onChangeText={setCustomText}
                placeholder="Your extracted text will appear here..."
                placeholderTextColor="#94A3B8"
              />
              <View style={styles.textActions}>
                <TouchableOpacity style={styles.textActionButton} onPress={copyToClipboard}>
                  <Icon name="content-copy" size={22} color="#F8FAFC" />
                  <Text style={styles.textActionButtonText}>Copy</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.textActionButton} onPress={saveTextToFile}>
                  <Icon name="save" size={22} color="#F8FAFC" />
                  <Text style={styles.textActionButtonText}>Save</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.textActionButton}
                  onPress={() => {
                    setExtractedText("");
                    setCustomText("");
                  }}
                >
                  <Icon name="clear" size={22} color="#F8FAFC" />
                  <Text style={styles.textActionButtonText}>Clear</Text>
                </TouchableOpacity>
              </View>
            </>
          ) : null}

          {/* Template Selection */}
          {!loading && extractedText ? (
            <>
              <Text style={styles.subTitle}>Format Your Text</Text>
              <View style={styles.templateContainer}>
                {["Standard", "Handwritten", "Custom"].map((template) => (
                  <TouchableOpacity
                    key={template}
                    style={[
                      styles.templateButton,
                      selectedTemplate === template && styles.selectedTemplate,
                    ]}
                    onPress={() => applyTemplate(template)}
                  >
                    <LinearGradient
                      colors={
                        template === "Standard" ? ["#8B5CF6", "#6D28D9"] :
                        template === "Handwritten" ? ["#EC4899", "#DB2777"] :
                        ["#F59E0B", "#D97706"]
                      }
                      style={styles.templateGradient}
                    >
                      <Icon
                        name={
                          template === "Standard" ? "description" :
                          template === "Handwritten" ? "edit" :
                          "create"
                        }
                        size={24}
                        color="#F8FAFC"
                      />
                      <Text style={styles.templateButtonText}>{template}</Text>
                    </LinearGradient>
                  </TouchableOpacity>
                ))}
              </View>
            </>
          ) : null}

          {/* Pick Image Button */}
          <TouchableOpacity 
            style={styles.pickImageButton} 
            onPress={pickImage} 
            disabled={imageLoading}
          >
            <LinearGradient
              colors={["#60A5FA", "#2563EB"]}
              style={styles.buttonGradient}
            >
              {imageLoading ? (
                <ActivityIndicator size="small" color="#F8FAFC" />
              ) : (
                <>
                  <Icon name="image" size={24} color="#F8FAFC" />
                  <Text style={styles.buttonText}>Pick New Image</Text>
                </>
              )}
            </LinearGradient>
          </TouchableOpacity>

          {/* Language Toggle Button */}
          <TouchableOpacity
            style={styles.languageButton}
            onPress={toggleLanguage}
          >
            <LinearGradient
              colors={["#9333EA", "#7E22CE"]}
              style={styles.buttonGradient}
            >
              <Icon name="language" size={24} color="#F8FAFC" />
              <Text style={styles.buttonText}>
                {`Language: ${ocrLanguage === "latin" ? "English" : "Japanese"}`}
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        </Animated.View>
      </ScrollView>

      {/* Image Modal */}
      <Modal
        visible={isImageModalVisible}
        transparent={true}
        onRequestClose={() => setImageModalVisible(false)}
      >
        <TouchableWithoutFeedback onPress={() => setImageModalVisible(false)}>
          <View style={styles.modalContainer}>
            <Image source={{ uri: image }} style={styles.fullScreenImage} />
            <TouchableOpacity 
              style={styles.modalCloseButton}
              onPress={() => setImageModalVisible(false)}
            >
              <Icon name="close" size={30} color="#F8FAFC" />
            </TouchableOpacity>
          </View>
        </TouchableWithoutFeedback>
      </Modal>

      {/* Bottom Navigation */}
      <View style={styles.navigationButtons}>
        {[
          { icon: "home", text: "Home", route: "Home" },
          { icon: "chat", text: "AI Chat", route: "AIChat", params: { extractedText } },
          { icon: "settings", text: "Settings", route: "Settings" },
        ].map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.navButton}
            onPress={() => navigation.navigate(item.route, item.params)}
          >
            <LinearGradient
              colors={["#475569", "#334155"]}
              style={styles.navButtonGradient}
            >
              <Icon name={item.icon} size={24} color="#F8FAFC" />
              <Text style={styles.navButtonText}>{item.text}</Text>
            </LinearGradient>
          </TouchableOpacity>
        ))}
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: "rgba(15, 23, 42, 0.9)",
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: "#F8FAFC",
    letterSpacing: 0.5,
  },
  sidebarOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    zIndex: 1000,
  },
  sidebar: {
    position: "absolute",
    top: 0,
    right: 0,
    width: 240,
    height: "100%",
    backgroundColor: "#1E293B",
    padding: 20,
    zIndex: 1001,
    borderLeftWidth: 1,
    borderLeftColor: "#334155",
  },
  sidebarItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderRadius: 8,
    marginBottom: 10,
    backgroundColor: "rgba(51, 65, 85, 0.3)",
  },
  sidebarText: {
    fontSize: 18,
    color: "#F8FAFC",
    marginLeft: 15,
    fontWeight: "500",
  },
  scrollContainer: {
    padding: 20,
    paddingBottom: 100,
  },
  contentContainer: {
    alignItems: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 25,
  },
  actionButton: {
    width: "48%",
    borderRadius: 12,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 8,
  },
  buttonGradient: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 14,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#F8FAFC",
    marginLeft: 10,
  },
  imageContainer: {
    borderRadius: 16,
    overflow: "hidden",
    marginBottom: 25,
    borderWidth: 2,
    borderColor: "#60A5FA",
    position: "relative",
  },
  image: {
    width: width * 0.9,
    height: height * 0.35,
    resizeMode: "contain",
  },
  imageOverlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    padding: 8,
    alignItems: "center",
  },
  imageOverlayText: {
    color: "#F8FAFC",
    fontSize: 14,
  },
  loadingContainer: {
    alignItems: "center",
    marginVertical: 30,
  },
  loadingText: {
    fontSize: 16,
    color: "#60A5FA",
    marginTop: 10,
    fontWeight: "500",
  },
  subTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: "#F8FAFC",
    marginBottom: 15,
    alignSelf: "flex-start",
  },
  textArea: {
    width: "100%",
    height: 180,
    borderRadius: 12,
    padding: 15,
    fontSize: 16,
    color: "#F8FAFC",
    backgroundColor: "#1E293B",
    borderWidth: 1,
    borderColor: "#475569",
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  textActions: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 25,
  },
  textActionButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#475569",
    padding: 12,
    borderRadius: 10,
    marginHorizontal: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  textActionButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#F8FAFC",
    marginLeft: 8,
  },
  templateContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 25,
  },
  templateButton: {
    width: "31%",
    borderRadius: 12,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 8,
  },
  selectedTemplate: {
    borderWidth: 2,
    borderColor: "#F8FAFC",
  },
  templateGradient: {
    padding: 14,
    alignItems: "center",
  },
  templateButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#F8FAFC",
    marginTop: 8,
  },
  pickImageButton: {
    width: "100%",
    borderRadius: 12,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 8,
    marginBottom: 20,
  },
  languageButton: {
    width: "100%",
    borderRadius: 12,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 8,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.9)",
  },
  fullScreenImage: {
    width: width * 0.95,
    height: height * 0.75,
    resizeMode: "contain",
  },
  modalCloseButton: {
    position: "absolute",
    top: 40,
    right: 20,
    backgroundColor: "rgba(71, 85, 105, 0.8)",
    borderRadius: 20,
    padding: 8,
  },
  navigationButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 15,
    backgroundColor: "rgba(15, 23, 42, 0.9)",
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    borderTopWidth: 1,
    borderTopColor: "#334155",
  },
  navButton: {
    flex: 1,
    marginHorizontal: 5,
    borderRadius: 10,
    overflow: "hidden",
  },
  navButtonGradient: {
    padding: 12,
    alignItems: "center",
  },
  navButtonText: {
    fontSize: 14,
    color: "#F8FAFC",
    marginTop: 4,
    fontWeight: "500",
  },
});

export default OCRScreen;