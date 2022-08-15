import pkg from "mongoose";

const { Schema, model } = pkg;

const UserSchema = new Schema({
  username: String,
  password: String,
  salt: String,
});

const UserModel = new model("user", UserSchema);

export default UserModel;