import mongoose, { Schema } from "mongoose";

const USER_RESPONSE_SCHEMA = new mongoose.Schema({
    documentId: {
        type: Object,
        required: true
    },
    documentName: {
        type: String,
        required: true
    },
    documentDescription: {
        type: String,
        required: true
    },
    userId: {
        type: Object,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    submittedOn: {
        type: String,
        required: true
    },
    answers: {}
});

module.exports = mongoose.model("UserResponse", USER_RESPONSE_SCHEMA);