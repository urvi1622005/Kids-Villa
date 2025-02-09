import React, { useState, useRef, useEffect } from "react";
import { 
  View, Text, Image, StyleSheet, Alert, TouchableOpacity, SafeAreaView, ActivityIndicator, Platform, TextInput 
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useNavigation } from "@react-navigation/native";
import Webcam from "react-webcam"; // For Web
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { analyzeText } from "./ocrUtils"; // Function to analyze text using OCR
import { generatePDF, generatePPTX } from "./exportUtils"; // Exporting utilities

const Stack = createNativeStackNavigator();

const DocumentScanner = ({ route }) => {
  const [image, setImage] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [extractedText, setExtractedText] = useState(route?.params?.updatedText || "");
  const navigation = useNavigation();
  const webcamRef = useRef(null);

  useEffect(() => {
    if (route?.params?.updatedText) {
      setExtractedText(route.params.updatedText);
    }
  }, [route?.params?.updatedText]);

  // Open Camera for Scanning
  const openCamera = async () => {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled && result.assets.length > 0) {
      setIsProcessing(true);
      setImage(result.assets[0].uri);
      const text = await analyzeText(result.assets[0].uri);
      setExtractedText(text);
      setIsProcessing(false);
    }
  };

  // Pick Image from Gallery
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled && result.assets.length > 0) {
      setIsProcessing(true);
      setImage(result.assets[0].uri);
      const text = await analyzeText(result.assets[0].uri);
      setExtractedText(text);
      setIsProcessing(false);
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
          <Text style={styles.buttonText}>📄 Scan Document</Text>
        </TouchableOpacity>
      </View>

      {isProcessing && <ActivityIndicator size="large" color="#007AFF" />}

      {image && (
        <>
          <Image source={{ uri: image }} style={styles.image} />
            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => navigation.navigate('OCRScreen', { imageUri: image })}
          >
            <Text style={styles.buttonText}>✍️ Edit Extracted Text</Text>
          </TouchableOpacity>
        </>
      )}
    </SafeAreaView>
  );
};

const EditTextScreen = ({ route, navigation }) => {
  const [text, setText] = useState(route.params.text);
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>📝 Edit Extracted Text</Text>
      <TextInput
        multiline
        style={styles.textInput}
        value={text}
        onChangeText={setText}
      />
      <TouchableOpacity
        style={styles.actionButton}
        onPress={() => navigation.navigate('Scanner', { updatedText: text })}
      >
        <Text style={styles.buttonText}>✅ Save & Go Back</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const DocumentScannerApp = () => (
  <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen name="Scanner" component={DocumentScanner} />
      <Stack.Screen name="EditText" component={EditTextScreen} />
      <Stack.Screen name="TemplateChooser" component={TemplateChooser} />
    </Stack.Navigator>
  </NavigationContainer>
);

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
