import * as FileSystem from "expo-file-system";
import * as Print from "expo-print";
import * as Sharing from "expo-sharing";
import pptxgen from "pptxgenjs"; // Install with: npm install pptxgenjs

// Generate PDF from extracted text
export const generatePDF = async (text) => {
  const htmlContent = `<html><body><h1>Extracted Document</h1><p>${text}</p></body></html>`;
  const { uri } = await Print.printToFileAsync({ html: htmlContent });

  if (!(await Sharing.isAvailableAsync())) {
    alert("Sharing is not available on this device");
    return;
  }
  await Sharing.shareAsync(uri);
};

// Generate PPTX from extracted text
export const generatePPTX = async (text) => {
  let pptx = new pptxgen();
  let slide = pptx.addSlide();
  slide.addText(text, { x: 1, y: 1, fontSize: 18 });

  const pptxFile = FileSystem.documentDirectory + "document.pptx";
  await pptx.writeFile(pptxFile);

  if (!(await Sharing.isAvailableAsync())) {
    alert("Sharing is not available on this device");
    return;
  }
  await Sharing.shareAsync(pptxFile);
};
