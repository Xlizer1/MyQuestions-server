import pkg from "mongoose";

const { Schema, model } = pkg;

const NewsSchema = new Schema({
  title: String,
  image: String
});

const NewsModel = new model("products", NewsSchema);

export default NewsModel;