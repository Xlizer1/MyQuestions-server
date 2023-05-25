const cors = require("cors");

require("dotenv").config();

const app = require("./src/config/setup");

const questions = require("./src/api/questions/Routes.js");

app.use(cors());

app.use("/questions", questions);

module.exports = app;
