"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const google_document_1 = require("../controllers/google-document");
const router = express_1.default.Router();
router.get('/document/:documentId', google_document_1.getGoogleDocumentByIdController);
router.get('/documents', google_document_1.getAllDocumentIds);
router.post('/create-document', google_document_1.createNewDocument);
router.put('/update-document', google_document_1.updateDocument);
exports.default = router;
