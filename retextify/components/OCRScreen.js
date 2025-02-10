import { useState, useEffect } from "react";
import { 
  View, Button, Image, Alert, ActivityIndicator, Text, TextInput, ScrollView, 
  TouchableOpacity, StyleSheet 
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import Tesseract from "tesseract.js";
import { useRoute, useNavigation } from "@react-navigation/native";

const OCRScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { imageUri: initialImage } = route.params || {};  
  const [image, setImage] = useState(initialImage);
  const [loading, setLoading] = useState(false);
  const [extractedText, setExtractedText] = useState("");
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [customText, setCustomText] = useState("");

  useEffect(() => {
    if (initialImage) {
      extractTextFromImage(initialImage);
    }
  }, [initialImage]);

  // Pick Image Again
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

  // Extract text from image using Tesseract.js
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

  // Apply Template Formatting
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

  // Navigate to DocumentScanner for scanning
  const navigateToDocumentScanner = () => {
    navigation.navigate("DocumentScanner");
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>📄 OCR & Template Formatting</Text>

      {/* Button to navigate to DocumentScanner */}
      <TouchableOpacity style={styles.actionButton} onPress={navigateToDocumentScanner}>
        <Text style={styles.buttonText}>📄 Scan Document</Text>
      </TouchableOpacity>

      {/* Image Preview */}
      {image && <Image source={{ uri: image }} style={styles.image} />}

      {loading && <ActivityIndicator size="large" color="#007AFF" />}
      
      {/* Extracted Text */}
      {!loading && extractedText ? (
        <>
          <Text style={styles.subTitle}>Extracted Text</Text>
          <TextInput
            style={styles.textArea}
            multiline
            value={customText}
            onChangeText={setCustomText}
            placeholder="Extracted text will appear here..."
          />
        </>
      ) : null}

      {/* Template Selection */}
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
              <Text style={styles.buttonText}>📄 Standard</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.templateButton,
                selectedTemplate === "Handwritten" && styles.selectedTemplate,
              ]}
              onPress={() => applyTemplate("Handwritten")}
            >
              <Text style={styles.buttonText}>✍️ Handwritten</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.templateButton,
                selectedTemplate === "Custom" && styles.selectedTemplate,
              ]}
              onPress={() => applyTemplate("Custom")}
            >
              <Text style={styles.buttonText}>✏️ Custom</Text>
            </TouchableOpacity>
          </View>
        </>
      ) : null}

      {/* Pick Another Image */}
      <Button title="📂 Pick Another Image" onPress={pickImage} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flexGrow: 1, alignItems: "center", padding: 20 },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 10 },
  actionButton: { backgroundColor: "#007AFF", padding: 15, borderRadius: 10, marginVertical: 5, width: "90%" },
  buttonText: { fontSize: 16, fontWeight: "bold", color: "white", textAlign: "center" },
  image: { width: 200, height: 200, resizeMode: "contain", marginVertical: 10 },
  subTitle: { fontSize: 18, fontWeight: "bold", marginVertical: 10 },
  textArea: {
    width: "90%",
    height: 150,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 10,
    fontSize: 16,
    backgroundColor: "#f9f9f9",
  },
  templateContainer: { flexDirection: "row", justifyContent: "space-around", width: "90%", marginVertical: 10 },
  templateButton: { backgroundColor: "#28a745", padding: 12, borderRadius: 8, alignItems: "center", width: "30%" },
  selectedTemplate: { backgroundColor: "#0056b3" },
  buttonText: { fontSize: 16, fontWeight: "bold", color: "white" },
});

export default OCRScreen;