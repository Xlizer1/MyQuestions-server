import pkg from "mongoose";

const { Schema, model } = pkg;

const QuestionSchema = new Schema({
  title: String,
  answer: String,
  unit: String,
  material: String,
  year: Array,
  turn: String,
  youtubeLink: String,
});

const QuestionModel = new model("question", QuestionSchema);

export default QuestionModel;
