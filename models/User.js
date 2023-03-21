const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const Joi = require("joi");
const { isEmail } = require("validator");
import { Schema, model, models } from "mongoose";

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: [true, "Please enter email."],
    lowercase: true,
    validate: [isEmail, "Please enter valid email"],
  },
  password: {
    type: String,
    required: [true, "Please enter a password"],
    minlength: [8, "Minimum password length is 8 characters"],
  },
});

UserSchema.pre("save", async function () {
  const salt = await bcryptjs.genSalt(10);
  this.password = await bcryptjs.hash(this.password, salt);
});

UserSchema.methods.createJWT = function () {
  return jwt.sign({ userId: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_LIFETIME,
  });
};

UserSchema.methods.comparePassword = async function (candidatePassword) {
  const isMatch = await bcryptjs.compare(candidatePassword, this.password);
  return isMatch;
};

function validateUser(user) {
  const schema = {
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required().max(255),
  };
  const result = Joi.validate(user, schema, { abortEarly: false });
  return result;
}
module.exports.User = models.User || model("User", UserSchema);
module.exports.validate = validateUser;

// const User = models.User || model("User", UserSchema);
// export default User;
