const xlsx = require("xlsx");
const fs = require("fs");
const DATA_FILE = require("../config").DATA_FILE;

function parseExcel(filePath) {
    const workbook = xlsx.readFile(filePath);
    const sheetName = workbook.SheetNames[0]; 
    const data = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);

    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
    return data;
}

module.exports = parseExcel;
