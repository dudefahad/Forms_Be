import express from 'express';
import {
    createNewDocument, deleteDcouemnt, getAllDocumentIds,
    getGoogleDocumentByIdController, updateDocument
} from '../controllers/google-document';

const router = express.Router();

router.get('/document/:documentId', getGoogleDocumentByIdController);
router.post('/documents', getAllDocumentIds);
router.post('/create-document', createNewDocument);
router.put('/update-document', updateDocument);
router.delete('/delete/:documentId', deleteDcouemnt);

export default router;