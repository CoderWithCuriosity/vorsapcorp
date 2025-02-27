const fs = require("fs");
const path = require("path");

function init() {
  function ensureFolderExists(folderPath) {
    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath, { recursive: true }); // Create folder recursively if it doesn’t exist
      console.log(`✅ Folder created: ${folderPath}`);
    }
  }

  ensureFolderExists("./dataset"); // Ensure dataset folder exists
  ensureFolderExists("./dataset/questions"); // Ensure questions folder inside dataset exists
}

module.exports = init;
