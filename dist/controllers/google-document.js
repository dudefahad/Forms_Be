"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateDocument = exports.createNewDocument = exports.getAllDocumentIds = exports.getGoogleDocumentByIdController = void 0;
const pino_1 = require("../common/pino");
const Document = require('../models/google-document');
// retreives one the document
const getGoogleDocumentByIdController = (req, res) => {
    try {
        Document.find({ _id: req.params.documentId }).then((response) => {
            pino_1.logger.info(`User fetched data, ${response}`);
            res.status(200).send({
                document: response[0]
            });
        }).catch((error) => {
            pino_1.logger.error(`Error in fetching the documents, ${error.message}`);
            res.status(500).json(error);
        });
    }
    catch (err) {
    }
};
exports.getGoogleDocumentByIdController = getGoogleDocumentByIdController;
// retreives all the documents
const getAllDocumentIds = (req, res) => {
    try {
        Document.find({}, { documentName: true, _id: true, createdOn: true }).then((response) => {
            res.status(200).send({
                documents: response
            });
        }).catch((error) => {
            pino_1.logger.error(`Error in fetching the documents, ${error.message}`);
            res.status(500).json(error);
        });
    }
    catch (err) {
    }
};
exports.getAllDocumentIds = getAllDocumentIds;
// creates a new document
const createNewDocument = (req, res) => {
    try {
        let document = new Document(req.body);
        document.save().then((response) => {
            pino_1.logger.info(`Document ${response._id} created successfully...`);
            res.status(201).send({
                message: "Document created successfully..!",
                documentId: response._id
            });
        }).catch((error) => {
            pino_1.logger.error(`Error in saving the user data ${req.body.createdBy}, ${error.message}`);
            res.status(500).json(error);
        });
    }
    catch (err) {
    }
};
exports.createNewDocument = createNewDocument;
// update a new document
const updateDocument = (req, res) => {
    try {
        const document = {
            documentName: req.body.documentName,
            documentDescription: req.body.documentDescription,
            questions: req.body.questions,
            updatedOn: req.body.updatedOn
        };
        Document.findByIdAndUpdate((req.body._id).trim(), { $set: document }, { new: false }).then((response) => {
            pino_1.logger.info(`Document ${req.body._id} is updated successfully`);
            res.status(200).send({ code: 200, message: 'Updated successfully' });
        }).catch((error) => {
            console.log(error);
        });
    }
    catch (err) {
    }
};
exports.updateDocument = updateDocument;
