import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  fname: String,
  lname: String,
  url: String,
  username: String,
  password: String,
  gender: String,
  budget: Number,
  age: Number,
  isActive: Boolean,
});

export const User = mongoose.model("user", userSchema);
