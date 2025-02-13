const express = require("express");
const { ACTIVE_MODEL, DATA_SET } = require("./config");

const models = {
    deepseek: require("./models/deepseek"),
    chatgpt: require("./models/chatgpt"),
};

const parseExcel = require("./utils/excelParser");
const retrieveRelevantData = require("./utils/retriever");

const askAI = models[ACTIVE_MODEL];

const app = express();
app.use(express.json());

// Parse Excel on startup
parseExcel(DATA_SET);

app.post("/ask", async (req, res) => {
    const { question } = req.body;

    try {
        // Retrieve relevant context from Excel data
        const contextData = retrieveRelevantData(question);

        // Query AI with retrieved context
        const response = await askAI(question, contextData);

        res.json(response);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(3000, () => console.log(`Server running on port 3000 🚀 (Model: ${ACTIVE_MODEL})`));
