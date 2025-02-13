const xlsx = require('xlsx');
const fs = require('fs');

function convertExcelToJson(excelFilePath, jsonFilePath) {
    // Read the Excel file
    const workbook = xlsx.readFile(excelFilePath);
    const sheetName = workbook.SheetNames[0]; // Get the first sheet
    const data = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]); // Convert to JSON

    // Save as JSON file
    fs.writeFileSync(jsonFilePath, JSON.stringify(data, null, 4));

    console.log("Excel file successfully converted to JSON!");
}

// Convert your Excel file
convertExcelToJson("your_data.xlsx", "your_data.json");
