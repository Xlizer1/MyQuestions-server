import pkg from "mongoose";
// import { hashPassword } from "../helper/helper.js";
// import shortId from "shortid";

const { Schema, model } = pkg;

const UserSchema = new Schema({
  username: String,
  password: String,
  salt: String,
});

// UserSchema.pre('save', function(next) {
//   if(!this.salt) {
//       this.salt = shortId.generate();
//   }

//   if(this.password){
//       this.password = hashPassword(this.password, this.salt)
//   }

// next();
// });

const UserModel = new model("user", UserSchema);

export default UserModel;