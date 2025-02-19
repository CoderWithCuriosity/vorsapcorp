const express = require("express");
const router = express.Router();
const questions = require("./../utils/questions");

// Function to get the next questions based on the user's response
const getNextQuestions = (currentQuestion, answer) => {
  const questionObj = questions.find(q => q.question === currentQuestion);

  if (!questionObj) {
    return { error: "Question not found" };
  }

  // Check if follow-up questions exist for the given answer
  if (questionObj.followUp && questionObj.followUp[answer]) {
    const nextQuestions = questionObj.followUp[answer].map(q => {
      const nextQuestionObj = questions.find(qObj => qObj.question === q);
      return nextQuestionObj
        ? { question: nextQuestionObj.question, text: nextQuestionObj.text, options: nextQuestionObj.options }
        : { question: q, text: "Follow-up question not found", options: [] };
    });

    return { nextQuestions };
  }

  // No follow-up means it's the last step
  return { message: "End of questionnaire", nextQuestions: [] };
};

// POST route to get next question(s)
router.post("/", (req, res) => {
  const { currentQuestion, answer } = req.body;

  if (!currentQuestion || !answer) {
    return res.status(400).json({ error: "Current question and answer are required." });
  }

  const result = getNextQuestions(currentQuestion, answer);

  if (result.error) {
    return res.status(404).json(result);
  }

  res.json(result);
});

module.exports = router;
