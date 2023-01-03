import pkg from "mongoose";
import { hashPassword } from "../helper/helper.js";
import shortId from "shortid";

const { Schema, model } = pkg;

const UserSchema = new Schema({
  firstName: String,
  lastName: String,
  password: String,
  email: String,
  salt: String,
  admin: String
});

UserSchema.pre('save', function(next) {
  if(!this.salt) {
      this.salt = shortId.generate();
  }

  if(this.password){
      this.password = hashPassword(this.password, this.salt)
  }

next();
});

const UserModel = new model("user", UserSchema);

export default UserModel;
