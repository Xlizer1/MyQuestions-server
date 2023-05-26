const cors = require("cors");

require("dotenv").config();

const app = require("./src/config/setup");

const questions = require("./src/api/questions/Routes.js");
const subjects = require("./src/api/subjects/Routes.js");
const units = require("./src/api/units/Routes.js");
const turns = require("./src/api/turns/Routes.js");

app.use(cors());

app.use("/questions", questions);
app.use("/subjects", subjects);
app.use("/units", units);
app.use("/turns", turns);

module.exports = app;
