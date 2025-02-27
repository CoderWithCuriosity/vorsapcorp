const express = require("express");
const router = express.Router();
const path = require("path");
const fs = require("fs");
const { generateQuestionsFromExcel } = require("../models/chatgpt");

router.post("/", async (req, res) => {
  try {
    const result = {
      "What type of clinical research is being carried out?": [
        "Clinical Trial",
        "Epidemiological Research",
        "Laboratory-Based Research",
        "Medical Device Testing"
      ],
      "What is the primary objective of this clinical research?": [
        "Drug Effectiveness Study",
        "Patient Treatment Outcome",
        "Disease Prevention",
        "Medical Device Testing"
      ],
      "Which SAP module supports this clinical research?": [
        "SAP IS-H (Industry Solution for Hospitals)",
        "SAP MM (Material Management for Drugs & Equipment)",
        "SAP FICO (Financial Management for Research Funds)",
        "SAP BW (Business Warehouse for Data Analysis)"
      ],
      "What type of clinical data is being analyzed?": [
        "Patient Health Records",
        "Laboratory Results",
        "Clinical Trial Data",
        "Drug Inventory Data"
      ]
    };

    console.log(`✅ Clinical Research Questions Generated Successfully`);
    return res.json({
      success: true,
      message: "Clinical Research Questions Generated",
      data: result
    });

  } catch (error) {
    console.error("Error processing file:", error.message);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
