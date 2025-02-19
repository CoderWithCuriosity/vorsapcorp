const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const questions = require("../utils/questions"); // Import the questions array

// Ensure the 'data_set' folder exists
const DATA_SET_FOLDER = path.join(__dirname, "data_set");
if (!fs.existsSync(DATA_SET_FOLDER)) {
    fs.mkdirSync(DATA_SET_FOLDER);
}

// Multer storage configuration
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, DATA_SET_FOLDER);
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    },
});

// File filter to allow only Excel files
const fileFilter = (req, file, cb) => {
    const filetypes = [".xls", ".xlsx"];
    const extname = path.extname(file.originalname).toLowerCase();
    if (filetypes.includes(extname)) {
        return cb(null, true);
    }
    return cb(new Error("Only Excel files are allowed!"), false);
};

const upload = multer({ storage, fileFilter });

const router = express.Router();

// Upload route
router.post("/upload", upload.single("file"), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: "No file uploaded or invalid file type!" });
    }
    // Get the first question
    const firstQuestion = questions[0];

    res.json({
        message: "File uploaded successfully!",
        filename: req.file.filename,
        originalFilename: req.file.originalname, // Optional: Show original file name
        nextQuestion: firstQuestion
    });
});

module.exports = router;
