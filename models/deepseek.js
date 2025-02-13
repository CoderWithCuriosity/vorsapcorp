const axios = require("axios");

const LM_STUDIO_API_URL = "http://localhost:1234/v1/chat/completions";
const MODEL_NAME = "deepseek-r1-distill-qwen-1.5b";

async function deepseekAI(question, contextData) {
    const formattedData = contextData.map(item => JSON.stringify(item)).join("\n");

    const payload = {
        model: MODEL_NAME,
        messages: [
            { role: "system", content: "You are an AI that answers questions based on retrieved data." },
            { role: "user", content: `Relevant data:\n${formattedData}\n\nQuestion:\n${question}` }
        ],
        temperature: 0.5
    };

    try {
        const response = await axios.post(LM_STUDIO_API_URL, payload);
        return { answer: response.data.choices[0].message.content };
    } catch (error) {
        console.error("DeepSeek AI Error:", error.message);
        throw new Error("Error fetching response from AI.");
    }
}

module.exports = deepseekAI;
