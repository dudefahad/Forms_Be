import express from 'express';
import { createNewDocument, getAllDocumentIds, getGoogleDocumentByIdController, updateDocument } from '../controllers/google-document';
import { UserAuth } from '../common/user-authorisation';

const router = express.Router();

router.get('/document/:documentId', getGoogleDocumentByIdController);
router.get('/documents', getAllDocumentIds);
router.post('/create-document', createNewDocument);
router.put('/update-document', updateDocument);

export default router;