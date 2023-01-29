import pkg from "mongoose";

const { Schema, model } = pkg;

const QuestionSchema = new Schema({
  title: String,
  answer: String,
  material: String,
  year: String,
  turn: String,
  youtubeLink: String,
});

const QuestionModel = new model("question", QuestionSchema);

export default QuestionModel;
