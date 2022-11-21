import pkg from "mongoose";

const { Schema, model } = pkg;

const QuestionSchema = new Schema({
  title: String,
  answer: String,
  KeyWord: String
});

const QuestionsModel = new model("products", QuestionSchema);

export default QuestionsModel;