import React, { useState, useEffect } from "react";
import {
  View, Text, Image, StyleSheet, Alert, TouchableOpacity, SafeAreaView, ActivityIndicator, TextInput
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useNavigation } from "@react-navigation/native";
import { analyzeText } from "./ocrUtils"; // Function to analyze text using OCR

const DocumentScanner = ({ route }) => {
  const [image, setImage] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [extractedText, setExtractedText] = useState(route?.params?.updatedText || "");
  const navigation = useNavigation();

  useEffect(() => {
    if (route?.params?.updatedText) {
      setExtractedText(route.params.updatedText);
    }
  }, [route?.params?.updatedText]);

  // Open Camera for Scanning
  const openCamera = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert("Permission Denied", "Camera permission is required to scan documents.");
      return;
    }

    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    handleImageResult(result);
  };

  // Pick Image from Gallery
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    handleImageResult(result);
  };

  // Handle Image Result
  const handleImageResult = async (result) => {
    if (!result.canceled && result.assets.length > 0) {
      setIsProcessing(true);
      setImage(result.assets[0].uri);
      try {
        const text = await analyzeText(result.assets[0].uri);
        setExtractedText(text);
      } catch (error) {
        Alert.alert("Error", "Failed to extract text. Please try again.");
      } finally {
        setIsProcessing(false);
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>📄 AI Document Scanner</Text>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.actionButton} onPress={pickImage}>
          <Text style={styles.buttonText}>🖼️ Pick from Gallery</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton} onPress={openCamera}>
          <Text style={styles.buttonText}>📷 Scan Document</Text>
        </TouchableOpacity>
      </View>

      {isProcessing && <ActivityIndicator size="large" color="#007AFF" />}

      {image && (
        <>
          <Image source={{ uri: image }} style={styles.image} />
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => navigation.navigate('EditText', { text: extractedText })}
          >
            <Text style={styles.buttonText}>✍️ Edit Extracted Text</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => navigation.navigate('TemplateChooser', { text: extractedText })}
          >
            <Text style={styles.buttonText}>📄 Choose Template</Text>
          </TouchableOpacity>
        </>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f9f9f9", alignItems: "center", paddingTop: 20 },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 10, color: "#333" },
  buttonContainer: { flexDirection: "column", width: "90%", alignItems: "center" },
  actionButton: { backgroundColor: "#007AFF", padding: 15, borderRadius: 10, marginVertical: 5, width: "90%" },
  buttonText: { fontSize: 16, fontWeight: "bold", color: "white", textAlign: "center" },
  textInput: { width: "90%", height: 200, borderWidth: 1, borderColor: "#ccc", padding: 10, borderRadius: 5, marginTop: 10 },
  image: { width: 250, height: 250, borderRadius: 10, marginTop: 10 },
});

export default DocumentScanner;