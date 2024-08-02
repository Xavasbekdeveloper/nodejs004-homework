import mongoose from "mongoose";
import Joi from "joi";

const userSchema = new mongoose.Schema({
  fname: {
    type: String,
    required: true,
  },
  lname: {
    type: String,
    default: " ",
  },
  url: {
    type: String,
    default: " ",
  },
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  budget: {
    type: Number,
    required: true,
  },
  age: {
    type: Number,
    default: 0,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
});

export const User = mongoose.model("user", userSchema);

export const validationUser = (body) => {
  const schema = Joi.object({
    fname: Joi.string().required(),
    lname: Joi.string().allow(""),
    url: Joi.string().allow(""),
    username: Joi.string().min(4).max(32).required(),
    password: Joi.string().min(8).max(32).required(),
    gender: Joi.string().required(),
    budget: Joi.number().required(),
    age: Joi.number().allow(0),
    isActive: Joi.boolean().allow(true),
  });
  return schema.validate(body);
};
