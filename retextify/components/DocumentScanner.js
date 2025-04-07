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
import { LinearGradient } from "expo-linear-gradient";
import * as ImagePicker from "expo-image-picker";
import { useNavigation } from "@react-navigation/native";
// import AnalyzeText from "./components/AnalyzeText";  // Capital "A" and "T"

import { Ionicons } from "@expo/vector-icons";

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
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permission Denied", "Photo library permission is required.");
      return;
    }

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
      const uri = result.assets[0].uri;
      setImage(uri);
      try {
        const text = await AnalyzeText(uri); 
        setExtractedText(text);
      } catch (error) {
        Alert.alert("Error", "Failed to extract text. Please try again.");
      } finally {
        setIsProcessing(false);
      }
    }
  };

  // Clear Image and Text
  const clearResult = () => {
    setImage(null);
    setExtractedText("");
    Alert.alert("Cleared", "Image and extracted text have been reset.");
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
            <LinearGradient
              colors={["#3B82F6", "#1E40AF"]}
              style={styles.backButtonGradient}
            >
              <Ionicons name="arrow-back" size={28} color="#F8FAFC" />
              <Text style={styles.backButtonText}>Back</Text>
            </LinearGradient>
          </TouchableOpacity>

          {/* Title */}
          <Text style={styles.title}>📄 AI Document Scanner</Text>

          {/* Action Buttons */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.actionButton} onPress={pickImage} disabled={isProcessing}>
              <LinearGradient
                colors={["#60A5FA", "#2563EB"]}
                style={styles.buttonGradient}
              >
                <Text style={styles.buttonText}>🖼️ Pick from Gallery</Text>
              </LinearGradient>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton} onPress={openCamera} disabled={isProcessing}>
              <LinearGradient
                colors={["#60A5FA", "#2563EB"]}
                style={styles.buttonGradient}
              >
                <Text style={styles.buttonText}>📷 Scan Document</Text>
              </LinearGradient>
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
          {image && !isProcessing && (
            <View style={styles.resultContainer}>
              <Image source={{ uri: image }} style={styles.image} />
              <Text style={styles.extractedTextLabel}>Extracted Text:</Text>
              <Text style={styles.extractedText}>{extractedText || "No text extracted"}</Text>
              <TouchableOpacity
                style={styles.actionButton}
                onPress={() => navigation.navigate("EditText", { text: extractedText })}
              >
                <LinearGradient
                  colors={["#10B981", "#047857"]}
                  style={styles.buttonGradient}
                >
                  <Text style={styles.buttonText}>✍️ Edit Extracted Text</Text>
                </LinearGradient>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.actionButton}
                onPress={() => navigation.navigate("TemplateChooser", { text: extractedText })}
              >
                <LinearGradient
                  colors={["#F59E0B", "#D97706"]}
                  style={styles.buttonGradient}
                >
                  <Text style={styles.buttonText}>📄 Choose Template</Text>
                </LinearGradient>
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionButton} onPress={clearResult}>
                <LinearGradient
                  colors={["#EF4444", "#B91C1C"]}
                  style={styles.buttonGradient}
                >
                  <Text style={styles.buttonText}>🗑️ Clear</Text>
                </LinearGradient>
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
    alignSelf: "flex-start",
    marginBottom: 20,
    borderRadius: 12,
    overflow: "hidden",
  },
  backButtonGradient: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
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
    width: "90%",
    borderRadius: 12,
    marginVertical: 8,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 5,
  },
  buttonGradient: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    alignItems: "center",
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
  extractedTextLabel: {
    fontSize: 18,
    fontWeight: "600",
    color: "#F8FAFC",
    marginBottom: 10,
  },
  extractedText: {
    fontSize: 16,
    color: "#E2E8F0",
    backgroundColor: "rgba(30, 41, 59, 0.8)",
    padding: 10,
    borderRadius: 8,
    width: "90%",
    textAlign: "center",
    marginBottom: 20,
  },
});

export default DocumentScanner;