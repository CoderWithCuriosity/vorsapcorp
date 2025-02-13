const axios = require("axios");

const OPENAI_API_KEY = "your-api-key-here";
const OPENAI_API_URL = "https://api.openai.com/v1/chat/completions";

async function chatgptAI(question, contextData) {
    const formattedData = contextData.map(item => JSON.stringify(item)).join("\n");

    const payload = {
        model: "gpt-4-turbo",
        messages: [
            { role: "system", content: "You are an AI that answers questions based on retrieved data." },
            { role: "user", content: `Relevant data:\n${formattedData}\n\nQuestion:\n${question}` }
        ],
        temperature: 0.5
    };

    try {
        const response = await axios.post(OPENAI_API_URL, payload, {
            headers: { Authorization: `Bearer ${OPENAI_API_KEY}` }
        });

        return { answer: response.data.choices[0].message.content };
    } catch (error) {
        console.error("ChatGPT Error:", error.message);
        throw new Error("Error fetching response from AI.");
    }
}

module.exports = chatgptAI;
