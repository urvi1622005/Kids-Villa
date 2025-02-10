import * as FileSystem from "expo-file-system";
import * as Print from "expo-print";
import * as Sharing from "expo-sharing";
import pptxgen from "pptxgenjs"; // Install with: npm install pptxgenjs

// Generate PDF from extracted text with template support
export const generatePDF = async (text, template = "default") => {
  try {
    let htmlContent = "";

    // Apply template-specific styling
    switch (template) {
      case "resume":
        htmlContent = `
          <html>
            <body>
              <h1 style="text-align: center; color: #007AFF;">Resume</h1>
              <p style="font-size: 16px; line-height: 1.5;">${text}</p>
            </body>
          </html>
        `;
        break;
      case "invoice":
        htmlContent = `
          <html>
            <body>
              <h1 style="text-align: center; color: #FF3B30;">Invoice</h1>
              <p style="font-size: 16px; line-height: 1.5;">${text}</p>
            </body>
          </html>
        `;
        break;
      case "report":
        htmlContent = `
          <html>
            <body>
              <h1 style="text-align: center; color: #34C759;">Report</h1>
              <p style="font-size: 16px; line-height: 1.5;">${text}</p>
            </body>
          </html>
        `;
        break;
      default:
        htmlContent = `
          <html>
            <body>
              <h1 style="text-align: center; color: #000;">Extracted Document</h1>
              <p style="font-size: 16px; line-height: 1.5;">${text}</p>
            </body>
          </html>
        `;
    }

    // Generate PDF file
    const { uri } = await Print.printToFileAsync({ html: htmlContent });

    // Share the PDF file
    if (!(await Sharing.isAvailableAsync())) {
      Alert.alert("Error", "Sharing is not available on this device");
      return;
    }
    await Sharing.shareAsync(uri);
  } catch (error) {
    console.error("PDF Generation Error:", error);
    Alert.alert("Error", "Failed to generate PDF. Please try again.");
  }
};

// Generate PPTX from extracted text with template support
export const generatePPTX = async (text, template = "default") => {
  try {
    let pptx = new pptxgen();
    let slide = pptx.addSlide();

    // Apply template-specific content
    switch (template) {
      case "resume":
        slide.addText("Resume", { x: 1, y: 0.5, fontSize: 24, bold: true, color: "007AFF" });
        break;
      case "invoice":
        slide.addText("Invoice", { x: 1, y: 0.5, fontSize: 24, bold: true, color: "FF3B30" });
        break;
      case "report":
        slide.addText("Report", { x: 1, y: 0.5, fontSize: 24, bold: true, color: "34C759" });
        break;
      default:
        slide.addText("Extracted Document", { x: 1, y: 0.5, fontSize: 24, bold: true, color: "000000" });
    }

    // Add the extracted text
    slide.addText(text, { x: 1, y: 1.5, fontSize: 18, color: "000000" });

    // Save the PPTX file
    const pptxFile = FileSystem.documentDirectory + "document.pptx";
    await pptx.writeFile({ fileName: pptxFile });

    // Share the PPTX file
    if (!(await Sharing.isAvailableAsync())) {
      Alert.alert("Error", "Sharing is not available on this device");
      return;
    }
    await Sharing.shareAsync(pptxFile);
  } catch (error) {
    console.error("PPTX Generation Error:", error);
    Alert.alert("Error", "Failed to generate PPTX. Please try again.");
  }
};