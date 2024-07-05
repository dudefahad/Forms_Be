import mongoose, { Schema } from "mongoose";

const USER_SCHEMA = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  phone: {
    type: Number,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  createdOn: {
    type: String
  }
});

module.exports = mongoose.model("Users", USER_SCHEMA);