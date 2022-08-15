import pkg from "mongoose";
import shortid from "shortid";
import { hashPassword } from "../helper/helper.js";

const { Schema, model } = pkg;

const UserSchema = new Schema({
  username: String,
  password: String,
  salt: String,
});

const UserModel = new model("user", UserSchema);

export default UserModel;