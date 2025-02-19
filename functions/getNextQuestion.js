const express = require("express");
const router = express.Router();

const questions = require("../utils/questions");

// Function to get the next questions based on the user's response
const getNextQuestions = (currentQuestion, answer) => {
    const questionObj = questions.find(q => q.question === currentQuestion);
    if (questionObj && questionObj.followUp && questionObj.followUp[answer]) {
        return questionObj.followUp[answer];
    }
    return [];
};

router.post("/next-question", (req, res) => {
    const { currentQuestion, answer } = req.body;

    if (!currentQuestion || !answer) {
        return res.status(400).json({ error: "Current question and answer are required." });
    }

    const nextQuestions = getNextQuestions(currentQuestion, answer);

    res.json({ nextQuestions });
});

module.exports = router;
