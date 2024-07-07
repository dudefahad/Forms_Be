import express from 'express';
import { getUserResponseController, saveUserResponseController } from '../controllers/user-responses';

const router = express.Router();

router.get('/user-response/:documentId', getUserResponseController);
router.post('/user-response/:documentId', saveUserResponseController);

export default router;