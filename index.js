const express = require("express");
const uploadHandler = require("./routes/uploadHandler");
const questions = require("./routes/getQuestion");
const respQs = require("./routes/respQs");
const init = require("./middleware/init");
init();

const models = {
    deepseek: require("./models/deepseek"),
    chatgpt: require("./models/chatgpt"),
};
const ACTIVE_MODEL = "chatgpt";

const app = express();
app.use(express.json());
app.use("/upload", uploadHandler);
app.use("/questions", questions);
app.use("/generate-sap", respQs);

app.listen(3000, () => console.log(`Server running on port 3000 🚀 (Model: ${ACTIVE_MODEL})`));

