const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Ensure the 'dataset' folder exists
const DATA_SET_FOLDER = "dataset";
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
router.post("/", upload.single("file"), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: "No file uploaded or invalid file type!" });
    }
    
    res.json({
        message: "File uploaded successfully!",
        filename: req.file.filename,
        originalFilename: req.file.originalname, // Optional: Show original file name
    });
});

module.exports = router;
