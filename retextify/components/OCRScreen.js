import React, { useState, useEffect } from "react";
import { 
  View, Image, Alert, ActivityIndicator, Text, TextInput, ScrollView, 
  TouchableOpacity, StyleSheet, Animated, Dimensions, Modal, TouchableWithoutFeedback, Keyboard 
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import Tesseract from "tesseract.js";
import { useRoute, useNavigation, useFocusEffect } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import Icon from "react-native-vector-icons/MaterialIcons";
import * as Clipboard from 'expo-clipboard';
import * as FileSystem from 'expo-file-system';

const { width, height } = Dimensions.get("window");

const OCRScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { imageUri: initialImage } = route.params || {};  
  const [image, setImage] = useState(initialImage);
  const [loading, setLoading] = useState(false);
  const [extractedText, setExtractedText] = useState("");
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [customText, setCustomText] = useState("");
  const [isImageModalVisible, setImageModalVisible] = useState(false);
  const fadeAnim = useState(new Animated.Value(0))[0];

  useEffect(() => {
    if (initialImage) {
      extractTextFromImage(initialImage);
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
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      extractTextFromImage(result.assets[0].uri);
    }
  };

  const extractTextFromImage = async (imageUri) => {
    if (!imageUri) return;

    setLoading(true);
    setExtractedText("");
    setCustomText("");

    try {
      const { data: { text } } = await Tesseract.recognize(imageUri, "eng");
      setExtractedText(text || "No text detected.");
      setCustomText(text || "No text detected.");
    } catch (error) {
      console.error("OCR Error:", error);
      Alert.alert("Error", "Failed to extract text.");
    } finally {
      setLoading(false);
    }
  };

  const applyTemplate = (template) => {
    setSelectedTemplate(template);

    let formattedText = extractedText;
    if (template === "Standard") {
      formattedText = `📄 Standard Document\n\n${extractedText}`;
    } else if (template === "Handwritten") {
      formattedText = `✍️ Handwritten Style\n\n"${extractedText}"`;
    } else if (template === "Custom") {
      formattedText = extractedText; // Let user edit freely
    }

    setCustomText(formattedText);
  };

  const navigateToDocumentScanner = () => {
    navigation.navigate("DocumentScanner");
  };

  const copyToClipboard = async () => {
    await Clipboard.setStringAsync(customText);
    Alert.alert("Copied", "Text copied to clipboard!");
  };

  const saveTextToFile = async () => {
    const fileUri = FileSystem.documentDirectory + "extracted_text.txt";
    await FileSystem.writeAsStringAsync(fileUri, customText);
    Alert.alert("Saved", `Text saved to ${fileUri}`);
  };

  const fadeIn = () => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  };

  React.useEffect(() => {
    fadeIn();
  }, []);

  return (
    <LinearGradient
      colors={["#1A1A1A", "#121212"]}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Animated.View style={[styles.contentContainer, { opacity: fadeAnim }]}>
          <Text style={styles.title}>📄 OCR & Template Formatting</Text>

          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.actionButton} onPress={navigateToDocumentScanner}>
              <Icon name="document-scanner" size={24} color="#fff" style={styles.buttonIcon} />
              <Text style={styles.buttonText}>Scan Document</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.actionButton} 
              onPress={() => navigation.navigate("TemplateChooser", { text: extractedText })}
            >
              <Icon name="format-align-left" size={24} color="#fff" style={styles.buttonIcon} />
              <Text style={styles.buttonText}>Choose Template</Text>
            </TouchableOpacity>
          </View>

          {image && (
            <TouchableOpacity onPress={() => setImageModalVisible(true)}>
              <View style={styles.imageContainer}>
                <Image source={{ uri: image }} style={styles.image} />
              </View>
            </TouchableOpacity>
          )}

          {loading && (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color="#FF5722" />
              <Text style={styles.loadingText}>Extracting Text...</Text>
            </View>
          )}
          
          {!loading && extractedText ? (
            <>
              <Text style={styles.subTitle}>Extracted Text</Text>
              <TextInput
                style={styles.textArea}
                multiline
                value={customText}
                onChangeText={setCustomText}
                placeholder="Extracted text will appear here..."
                placeholderTextColor="#bbb"
              />
              <View style={styles.textActions}>
                <TouchableOpacity style={styles.textActionButton} onPress={copyToClipboard}>
                  <Icon name="content-copy" size={24} color="#fff" />
                  <Text style={styles.textActionButtonText}>Copy</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.textActionButton} onPress={saveTextToFile}>
                  <Icon name="save" size={24} color="#fff" />
                  <Text style={styles.textActionButtonText}>Save</Text>
                </TouchableOpacity>
              </View>
            </>
          ) : null}

          {!loading && extractedText ? (
            <>
              <Text style={styles.subTitle}>Choose a Template</Text>
              <View style={styles.templateContainer}>
                <TouchableOpacity
                  style={[
                    styles.templateButton,
                    selectedTemplate === "Standard" && styles.selectedTemplate,
                  ]}
                  onPress={() => applyTemplate("Standard")}
                >
                  <Icon name="description" size={24} color="#fff" />
                  <Text style={styles.templateButtonText}>Standard</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[
                    styles.templateButton,
                    selectedTemplate === "Handwritten" && styles.selectedTemplate,
                  ]}
                  onPress={() => applyTemplate("Handwritten")}
                >
                  <Icon name="edit" size={24} color="#fff" />
                  <Text style={styles.templateButtonText}>Handwritten</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[
                    styles.templateButton,
                    selectedTemplate === "Custom" && styles.selectedTemplate,
                  ]}
                  onPress={() => applyTemplate("Custom")}
                >
                  <Icon name="create" size={24} color="#fff" />
                  <Text style={styles.templateButtonText}>Custom</Text>
                </TouchableOpacity>
              </View>
            </>
          ) : null}

          <TouchableOpacity style={styles.pickImageButton} onPress={pickImage}>
            <Icon name="image" size={24} color="#fff" style={styles.buttonIcon} />
            <Text style={styles.buttonText}>Pick Another Image</Text>
          </TouchableOpacity>
        </Animated.View>
      </ScrollView>

      {/* Image Preview Modal */}
      <Modal
        visible={isImageModalVisible}
        transparent={true}
        onRequestClose={() => setImageModalVisible(false)}
      >
        <TouchableWithoutFeedback onPress={() => setImageModalVisible(false)}>
          <View style={styles.modalContainer}>
            <Image source={{ uri: image }} style={styles.fullScreenImage} />
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    paddingVertical: 20,
  },
  contentContainer: {
    padding: 20,
    alignItems: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "white",
    marginBottom: 20,
    textAlign: "center",
    fontFamily: "Roboto-Bold",
  },
  buttonContainer: {
    width: "100%",
    alignItems: "center",
  },
  actionButton: {
    flexDirection: "row",
    backgroundColor: "#FF5722",
    padding: 15,
    borderRadius: 10,
    marginVertical: 10,
    width: "80%",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  buttonIcon: {
    marginRight: 10,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
    fontFamily: "Roboto-Medium",
  },
  imageContainer: {
    borderWidth: 2,
    borderColor: "#FF5722",
    borderRadius: 10,
    padding: 5,
    marginVertical: 10,
  },
  image: {
    width: width * 0.8,
    height: height * 0.3,
    resizeMode: "contain",
    borderRadius: 10,
  },
  loadingContainer: {
    marginVertical: 20,
    alignItems: "center",
  },
  loadingText: {
    fontSize: 16,
    color: "#FF5722",
    marginTop: 10,
    fontFamily: "Roboto-Regular",
  },
  subTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
    marginVertical: 10,
    fontFamily: "Roboto-Bold",
  },
  textArea: {
    width: "90%",
    height: 150,
    borderWidth: 1,
    borderColor: "#FF5722",
    borderRadius: 10,
    padding: 10,
    fontSize: 16,
    color: "white",
    backgroundColor: "#2A2A2A",
    fontFamily: "Roboto-Regular",
  },
  textActions: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "90%",
    marginVertical: 10,
  },
  textActionButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#007AFF",
    padding: 10,
    borderRadius: 8,
    marginHorizontal: 5,
  },
  textActionButtonText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "white",
    marginLeft: 5,
    fontFamily: "Roboto-Medium",
  },
  templateContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "90%",
    marginVertical: 10,
  },
  templateButton: {
    backgroundColor: "#28a745",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    width: "30%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  selectedTemplate: {
    backgroundColor: "#0056b3",
  },
  templateButtonText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "white",
    marginTop: 5,
    fontFamily: "Roboto-Medium",
  },
  pickImageButton: {
    flexDirection: "row",
    backgroundColor: "#007AFF",
    padding: 15,
    borderRadius: 10,
    marginVertical: 10,
    width: "80%",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.9)",
  },
  fullScreenImage: {
    width: width * 0.9,
    height: height * 0.7,
    resizeMode: "contain",
  },
});

export default OCRScreen;