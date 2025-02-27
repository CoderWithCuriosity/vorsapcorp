const express = require("express");
const router = express.Router();
const { chatgptAIWithExcel } = require("./../models/chatgpt");
const generatedDocx = require("../middleware/generateDOCX");
const path = require("path");

/**
 * Generate SAP with Excel data + user-answered questions
 */
router.post("/", async (req, res) => {
  try {
    const { filePath, answeredQs } = req.body;

    if (!filePath || !answeredQs) {
      return res
        .status(400)
        .json({ error: "Missing required fields: filePath or answeredQs" });
    }

    const generatedSAP = await chatgptAIWithExcel(
      `./dataset/${filePath}`,
      answeredQs
    );

    if (generatedSAP.error) {
      return res.status(500).json({ error: generatedSAP.error });
    }

    // Ensure valid JSON response
    let formattedSAP;
    try {
      formattedSAP = JSON.parse(generatedSAP.answer);
    } catch (parseError) {
      return res
        .status(500)
        .json({ error: "Invalid JSON format from AI response." });
    }
    const filetypes = [".xls", ".xlsx"];
    const extname = path.extname(filePath).toLowerCase();
    const fileName = path.basename(filePath, extname); // Safer approach

    // Generate DOCX from SAP content
    generatedDocx(formattedSAP, fileName);

    return res.json({
      status: "success",
      message: "SAP generated successfully.",
      sap: formattedSAP
    });
  } catch (error) {
    console.error("Error in /generate-sap:", error.message);
    return res.status(500).json({ error: "Internal server error." });
  }
});

module.exports = router;
