import { useState, useEffect } from "react";
import { 
  View, Button, Image, Alert, ActivityIndicator, Text, TextInput, ScrollView, 
  TouchableOpacity, StyleSheet 
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";
import { useRoute } from "@react-navigation/native";

const OCRScreen = () => {
  const route = useRoute();
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

  // Extract text from image using OCR API
  const extractTextFromImage = async (imageUri) => {
    if (!imageUri) return;

    setLoading(true);
    setExtractedText("");
    setCustomText("");

    const formData = new FormData();
    formData.append("image", {
      uri: imageUri,
      type: "image/jpeg",
      name: "photo.jpg",
    });

    try {
      const response = await axios.post("https://your-backend-api.com/ocr", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      const extracted = response.data.text || "No text detected.";
      setExtractedText(extracted);
      setCustomText(extracted);
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

    if (template === "Standard") {
      setCustomText(`📄 Standard Document\n\n${extractedText}`);
    } else if (template === "Handwritten") {
      setCustomText(`✍️ Handwritten Style\n\n"${extractedText}"`);
    } else if (template === "Custom") {
      setCustomText(extractedText); // Let user edit freely
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>📄 OCR & Template Formatting</Text>

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
