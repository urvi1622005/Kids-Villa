import TextRecognition from "@react-native-ml-kit/text-recognition";

export const AnalyzeText = async (imageUri) => {
  try {
    const result = await TextRecognition.recognize(imageUri, {
      language: "latin", // Default to Latin script (English, etc.), adjustable as needed
    });

    return result.text || "No text found";
  } catch (error) {
    console.error("OCR Error:", error);
    return "Error extracting text";
  }
};