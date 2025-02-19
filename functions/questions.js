const express = require("express");
const router = express.Router();
const questions = require("./../utils/questions");

router.get("/", (req, res) => {
  res.json(questions);
});

module.exports = router;
