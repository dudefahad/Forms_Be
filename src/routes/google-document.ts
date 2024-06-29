import express from 'express';
import { createNewDocument, getAllDocumentIds, getGoogleDocumentByIdController, updateDocument } from '../controllers/google-document';

const router = express.Router();

// type numOrString = number | string 
// const body = res.body as Todo 

// get all the questions of a particular document
router.get('/document/:documentId', getGoogleDocumentByIdController);
router.get('/documents', getAllDocumentIds);
router.post('/create-document', createNewDocument);
router.put('/update-document', updateDocument);

export default router;