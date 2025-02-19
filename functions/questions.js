const express = require("express");
const router = express.Router();

const questions = require("../utils/questions");

router.get("/questions", (req, res) => {
  res.json(questions);
});

module.exports = router;
