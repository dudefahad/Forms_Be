import express from 'express';
import { createNewDocument, getAllDocumentIds, getGoogleDocumentByIdController, updateDocument } from '../controllers/google-document';

const router = express.Router();

router.get('/document/:documentId', getGoogleDocumentByIdController);
router.post('/documents', getAllDocumentIds);
router.post('/create-document', createNewDocument);
router.put('/update-document', updateDocument);

export default router;