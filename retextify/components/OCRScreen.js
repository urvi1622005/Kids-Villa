import { useState } from "react";
import { View, Button, Image, Alert } from "react-native";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";

const OCRScreen = () => {
  const [image, setImage] = useState(null);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri); // Store image URI
      sendImageToOCR(result.assets[0].uri); // Call OCR function
    }
  };

  const sendImageToOCR = async (imageUri) => {
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
      Alert.alert("OCR Result", response.data.text); // Show extracted text
    } catch (error) {
      console.error("Error:", error);
      Alert.alert("Error", "Failed to extract text.");
    }
  };

  return (
    <View>
      <Button title="Pick an Image" onPress={pickImage} />
      {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
    </View>
  );
};

export default OCRScreen;
