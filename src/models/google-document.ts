import mongoose, { Schema } from "mongoose";
import { QUESTION_SCHEMA } from "./question";

const DOCUMENT_SCHEMA = new mongoose.Schema({
    documentName: {
        type: String,
        required: true
    },
    documentDescription: {
        type: String,
        required: true
    },
    createdBy: {
        type: String,
        required: true
    },
    createdOn: {
        type: String,
        required: true
    },
    updatedOn: {
        type: String,
        required: true
    },
    questions: [QUESTION_SCHEMA]
});

module.exports = mongoose.model("Document", DOCUMENT_SCHEMA);