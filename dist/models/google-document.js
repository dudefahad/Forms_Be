"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const question_1 = require("./question");
const DOCUMENT_SCHEMA = new mongoose_1.default.Schema({
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
    questions: [question_1.QUESTION_SCHEMA]
});
module.exports = mongoose_1.default.model("Document", DOCUMENT_SCHEMA);
