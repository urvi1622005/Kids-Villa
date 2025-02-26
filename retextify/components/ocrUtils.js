import Tesseract from "tesseract.js";

export const analyzeText = async (imageUri) => {
  try {
    const { data } = await Tesseract.recognize(imageUri, "eng", {
      logger: (m) => console.log(m), // Logs progress
    });

    return data.text || "No text found";
  } catch (error) {
    console.error("OCR Error:", error);
    return "Error extracting text";
  }
};
