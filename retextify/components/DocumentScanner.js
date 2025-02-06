import React, { useState, useEffect, useRef } from "react";
import { 
  View, Text, Image, StyleSheet, Alert, TouchableOpacity, SafeAreaView, ActivityIndicator, Platform
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useNavigation } from "@react-navigation/native";

// Dynamic Import for Web Camera (react-webcam)
let Webcam;
if (Platform.OS === "web") {
  Webcam = require("react-webcam").default;
}

// Dynamic Import for Mobile Camera (react-native-vision-camera)
let Camera;
if (Platform.OS !== "web") {
  Camera = require("react-native-vision-camera").Camera;
}

const DocumentScanner = () => {
  const [image, setImage] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [hasPermission, setHasPermission] = useState(null);
  const [cameraOpen, setCameraOpen] = useState(false);
  const cameraRef = useRef(null);
  const navigation = useNavigation();

  useEffect(() => {
    if (Platform.OS !== "web") {
      (async () => {
        const cameraStatus = await Camera.requestCameraPermission();
        setHasPermission(cameraStatus === "granted");
      })();
    }
  }, []);

  // Open Camera (Only for Mobile)
  const openCamera = () => {
    if (Platform.OS === "web") {
      Alert.alert("Camera not supported on Web. Use Upload instead.");
      return;
    }
    if (!hasPermission) {
      Alert.alert("Permission Denied", "Camera access is required to scan documents.");
      return;
    }
    setCameraOpen(true);
  };

  // Capture Image (Mobile)
  const takePicture = async () => {
    if (!cameraRef.current) return;
    const photo = await cameraRef.current.takePhoto({ quality: 1 });
    setIsProcessing(true);
    setImage(photo.path);
    setIsProcessing(false);
  };

  // Pick Image from Gallery (Both Mobile & Web)
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled && result.assets.length > 0) {
      setIsProcessing(true);
      setImage(result.assets[0].uri);
      setIsProcessing(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>📄 AI Document Scanner</Text>

      {Platform.OS === "web" ? (
        <Webcam
          audio={false}
          height={300}
          width={300}
          screenshotFormat="image/jpeg"
          ref={cameraRef}
        />
      ) : cameraOpen ? (
        <View style={styles.cameraContainer}>
          <Camera 
            style={styles.camera} 
            ref={cameraRef}
            isActive={true}
            photo={true}
          />
          <View style={styles.cameraOverlay}>
            <TouchableOpacity onPress={takePicture} style={styles.captureButton}>
              <Text style={styles.buttonText}>📸 Capture</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setCameraOpen(false)} style={styles.cancelButton}>
              <Text style={styles.buttonText}>❌ Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.actionButton} onPress={pickImage}>
              <Text style={styles.buttonText}>🖼️ Pick from Gallery</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton} onPress={openCamera}>
              <Text style={styles.buttonText}>📄 Scan Document</Text>
            </TouchableOpacity>
          </View>

          {isProcessing && <ActivityIndicator size="large" color="#007AFF" />}

          {image && <Image source={{ uri: image }} style={styles.image} />}
        </>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f9f9f9", alignItems: "center", paddingTop: 20 },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 10, color: "#333" },
  cameraContainer: { flex: 1, width: "100%" },
  camera: { flex: 1, width: "100%" },
  cameraOverlay: { 
    flex: 1, flexDirection: "row", justifyContent: "space-between", 
    alignItems: "flex-end", paddingBottom: 20, backgroundColor: "transparent"
  },
  captureButton: { backgroundColor: "#007AFF", padding: 15, borderRadius: 50, marginHorizontal: 20 },
  cancelButton: { backgroundColor: "#FF3B30", padding: 15, borderRadius: 50, marginHorizontal: 20 },
  buttonContainer: { flexDirection: "column", width: "90%", alignItems: "center" },
  actionButton: { backgroundColor: "#007AFF", padding: 15, borderRadius: 10, marginVertical: 5, width: "90%" },
  buttonText: { fontSize: 16, fontWeight: "bold", color: "white", textAlign: "center" },
  image: { width: 250, height: 250, borderRadius: 10, marginTop: 10 },
});

export default DocumentScanner;
