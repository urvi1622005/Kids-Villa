import axios from "axios";

const GOOGLE_CLOUD_VISION_API_KEY = "YOUR_GOOGLE_VISION_API_KEY";

export const analyzeText = async (imageUri) => {
  try {
    const base64Image = await convertToBase64(imageUri);

    const response = await axios.post(
      `https://vision.googleapis.com/v1/images:annotate?key=${GOOGLE_CLOUD_VISION_API_KEY}`,
      {
        requests: [
          {
            image: { content: base64Image },
            features: [{ type: "TEXT_DETECTION" }],
          },
        ],
      }
    );

    const extractedText = response.data.responses[0]?.fullTextAnnotation?.text;
    return extractedText || "No text found";
  } catch (error) {
    console.error("OCR Error:", error);
    return "Error extracting text";
  }
};

// Convert image URI to Base64
const convertToBase64 = async (uri) => {
  const response = await fetch(uri);
  const blob = await response.blob();
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.readAsDataURL(blob);
    reader.onloadend = () => {
      const base64data = reader.result.split(",")[1];
      resolve(base64data);
    };
  });
};
