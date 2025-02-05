import React, { useState, useEffect, useRef } from 'react';
import { 
  View, Text, Image, StyleSheet, Alert, ScrollView, TouchableOpacity, SafeAreaView, Dimensions 
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Camera } from 'expo-camera';
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

const DocumentScanner = () => {
  const [image, setImage] = useState(null);
  const [cameraOpen, setCameraOpen] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const cameraRef = useRef(null);
  const navigation = useNavigation();

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasCameraPermission(status === 'granted');
    })();
  }, []);

  // Open Camera for Scanning
  const takePicture = async () => {
    if (!cameraRef.current) return;
    const photo = await cameraRef.current.takePictureAsync();
    setImage(photo.uri);
    setCameraOpen(false);
  };

  // Pick an image from the gallery
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled && result.assets.length > 0) {
      setImage(result.assets[0].uri);
    }
  };

  // Navigate to OCR Screen
  const goToOCRScreen = () => {
    if (!image) {
      Alert.alert('Error', 'Please select or scan an image first.');
      return;
    }
    if (!selectedTemplate) {
      Alert.alert('Error', 'Please select a template before processing.');
      return;
    }
    navigation.navigate('OCRScreen', { imageUri: image, template: selectedTemplate });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>📄 AI Document Scanner</Text>

      {cameraOpen ? (
        <View style={styles.cameraContainer}>
          <Camera 
            style={styles.camera} 
            type={Camera.Constants.Type.back} 
            ref={cameraRef}
            ratio="16:9"
          >
            <View style={styles.cameraOverlay}>
              <TouchableOpacity onPress={takePicture} style={styles.captureButton}>
                <Text style={styles.buttonText}>📸 Capture</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setCameraOpen(false)} style={styles.cancelButton}>
                <Text style={styles.buttonText}>❌ Cancel</Text>
              </TouchableOpacity>
            </View>
          </Camera>
        </View>
      ) : (
        <ScrollView contentContainerStyle={styles.content}>
          {/* Buttons */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.actionButton} onPress={pickImage}>
              <Text style={styles.buttonText}>🖼️ Pick from Gallery</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton} onPress={() => setCameraOpen(true)}>
              <Text style={styles.buttonText}>📄 Scan Document</Text>
            </TouchableOpacity>
          </View>

          {/* Image Preview */}
          {image && <Image source={{ uri: image }} style={styles.image} />}

          {/* Template Selection */}
          <Text style={styles.subTitle}>Select a Template</Text>
          <View style={styles.templateContainer}>
            <TouchableOpacity
              style={[
                styles.templateButton,
                selectedTemplate === 'Standard' && styles.selectedTemplate,
              ]}
              onPress={() => setSelectedTemplate('Standard')}
            >
              <Text style={styles.buttonText}>📄 Standard</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.templateButton,
                selectedTemplate === 'Handwritten' && styles.selectedTemplate,
              ]}
              onPress={() => setSelectedTemplate('Handwritten')}
            >
              <Text style={styles.buttonText}>✍️ Handwritten</Text>
            </TouchableOpacity>
          </View>

          {/* Navigate to OCR Screen */}
          <TouchableOpacity style={styles.actionButton} onPress={goToOCRScreen}>
            <Text style={styles.buttonText}>🔍 Process OCR</Text>
          </TouchableOpacity>
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f9f9f9' },
  content: { alignItems: 'center', padding: width * 0.05 },
  title: { fontSize: 24, fontWeight: 'bold', marginVertical: 20, textAlign: 'center', color: '#333' },
  subTitle: { fontSize: 18, fontWeight: 'bold', marginTop: 10, marginBottom: 5, color: '#555' },
  image: { width: width * 0.9, height: height * 0.3, resizeMode: 'contain', marginVertical: 10, borderRadius: 10 },
  cameraContainer: { flex: 1, width: '100%', height: '100%' },
  camera: { flex: 1, width: '100%', height: '100%' },
  cameraOverlay: { 
    flex: 1, flexDirection: 'row', justifyContent: 'space-between', 
    alignItems: 'flex-end', paddingBottom: 20, backgroundColor: 'transparent'
  },
  captureButton: { backgroundColor: '#007AFF', padding: 15, borderRadius: 50, marginHorizontal: 20 },
  cancelButton: { backgroundColor: '#FF3B30', padding: 15, borderRadius: 50, marginHorizontal: 20 },
  buttonContainer: { flexDirection: 'column', width: '100%', alignItems: 'center' },
  actionButton: { 
    backgroundColor: '#007AFF', padding: 15, borderRadius: 10, 
    alignItems: 'center', marginVertical: 5, width: '90%' 
  },
  templateContainer: { flexDirection: 'row', justifyContent: 'space-around', width: '90%', marginVertical: 10 },
  templateButton: { 
    backgroundColor: '#28a745', padding: 12, borderRadius: 8, alignItems: 'center', width: '45%' 
  },
  selectedTemplate: { backgroundColor: '#0056b3' },
  buttonText: { fontSize: 16, fontWeight: 'bold', color: 'white' },
});

export default DocumentScanner;
