import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Alert,
  TouchableOpacity,
  SafeAreaView,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient"; // Added for consistent design
import * as ImagePicker from "expo-image-picker";
import { useNavigation } from "@react-navigation/native";
import { analyzeText } from "./ocrUtils"; // Function to analyze text using OCR
import { Ionicons } from "@expo/vector-icons"; // For back button icon

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
    if (status !== "granted") {
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
    <LinearGradient colors={["#0F172A", "#1E40AF"]} style={styles.gradientContainer}>
      <SafeAreaView style={styles.safeArea}>
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
        >
          {/* Back Button */}
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back" size={28} color="#F8FAFC" />
            <Text style={styles.backButtonText}>Back</Text>
          </TouchableOpacity>

          {/* Title */}
          <Text style={styles.title}>📄 AI Document Scanner</Text>

          {/* Action Buttons */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.actionButton} onPress={pickImage}>
              <Text style={styles.buttonText}>🖼️ Pick from Gallery</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton} onPress={openCamera}>
              <Text style={styles.buttonText}>📷 Scan Document</Text>
            </TouchableOpacity>
          </View>

          {/* Processing Indicator */}
          {isProcessing && (
            <View style={styles.processingContainer}>
              <ActivityIndicator size="large" color="#60A5FA" />
              <Text style={styles.processingText}>Processing...</Text>
            </View>
          )}

          {/* Image and Navigation Buttons */}
          {image && (
            <View style={styles.resultContainer}>
              <Image source={{ uri: image }} style={styles.image} />
              <TouchableOpacity
                style={styles.actionButton}
                onPress={() => navigation.navigate("EditText", { text: extractedText })}
              >
                <Text style={styles.buttonText}>✍️ Edit Extracted Text</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.actionButton}
                onPress={() =>
                  navigation.navigate("TemplateChooser", { text: extractedText })
                }
              >
                <Text style={styles.buttonText}>📄 Choose Template</Text>
              </TouchableOpacity>
            </View>
          )}
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradientContainer: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    paddingVertical: 20,
    paddingHorizontal: 15,
    alignItems: "center",
  },
  backButton: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    padding: 10,
    marginBottom: 20,
  },
  backButtonText: {
    color: "#F8FAFC",
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 8,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#F8FAFC",
    marginBottom: 20,
    textShadowColor: "rgba(96, 165, 250, 0.3)",
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 6,
  },
  buttonContainer: {
    width: "100%",
    alignItems: "center",
    marginBottom: 20,
  },
  actionButton: {
    backgroundColor: "#3B82F6",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 12,
    marginVertical: 8,
    width: "90%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 5,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#F8FAFC",
    textAlign: "center",
  },
  processingContainer: {
    alignItems: "center",
    marginVertical: 20,
    backgroundColor: "rgba(30, 41, 59, 0.8)",
    padding: 15,
    borderRadius: 10,
  },
  processingText: {
    color: "#60A5FA",
    fontSize: 16,
    marginTop: 10,
    fontWeight: "500",
  },
  resultContainer: {
    alignItems: "center",
    width: "100%",
  },
  image: {
    width: 280,
    height: 280,
    borderRadius: 15,
    marginVertical: 20,
    borderWidth: 2,
    borderColor: "#60A5FA",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 5,
  },
});

export default DocumentScanner;