import React, { useState, useEffect } from "react";
import { 
  View, Image, Alert, ActivityIndicator, Text, TextInput, ScrollView, 
  TouchableOpacity, StyleSheet, Animated 
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import Tesseract from "tesseract.js";
import { useRoute, useNavigation, useFocusEffect } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import Icon from "react-native-vector-icons/MaterialIcons";

const OCRScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { imageUri: initialImage } = route.params || {};  
  const [image, setImage] = useState(initialImage);
  const [loading, setLoading] = useState(false);
  const [extractedText, setExtractedText] = useState("");
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [customText, setCustomText] = useState("");
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

          {image && (
            <View style={styles.imageContainer}>
              <Image source={{ uri: image }} style={styles.image} />
            </View>
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
  },
  actionButton: {
    flexDirection: "row",
    backgroundColor: "#FF5722",
    padding: 15,
    borderRadius: 10,
    marginVertical: 10,
    width: "90%",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonIcon: {
    marginRight: 10,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
  },
  imageContainer: {
    borderWidth: 2,
    borderColor: "#FF5722",
    borderRadius: 10,
    padding: 5,
    marginVertical: 10,
  },
  image: {
    width: 200,
    height: 200,
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
  },
  subTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
    marginVertical: 10,
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
  },
  selectedTemplate: {
    backgroundColor: "#0056b3",
  },
  templateButtonText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "white",
    marginTop: 5,
  },
  pickImageButton: {
    flexDirection: "row",
    backgroundColor: "#007AFF",
    padding: 15,
    borderRadius: 10,
    marginVertical: 10,
    width: "90%",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default OCRScreen;