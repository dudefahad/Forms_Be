import mongoose from "mongoose";

const OPTION_SCHEMA = new mongoose.Schema({
  _id: { type: Object, auto: false },
  option: {
    type: String,
    required: true
  },
});

export const QUESTION_SCHEMA = new mongoose.Schema({
  _id: { type: Object, auto: false },
  question: {
    type: String
  },
  questionType: {
    type: String
  },
  options: [OPTION_SCHEMA],
  open: {
    type: Boolean,
  },
  required: {
    type: Boolean
  },
  answer: {
    type: Boolean
  },
  points: {
    type: Number
  }
});
