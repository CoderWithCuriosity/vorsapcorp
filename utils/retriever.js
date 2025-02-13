const fs = require("fs");
const DATA_FILE = require("../config").DATA_FILE;

function retrieveRelevantData(query) {
    const data = JSON.parse(fs.readFileSync(DATA_FILE));
    
    return data.filter(entry => 
        Object.values(entry).some(value =>
            String(value).toLowerCase().includes(query.toLowerCase())
        )
    ).slice(0, 5); // Top 5 relevant results
}

module.exports = retrieveRelevantData;
