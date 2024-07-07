import express from 'express';
import { getUserResponseController, userResponseController } from '../controllers/user-responses';

const router = express.Router();

router.get('/user-response/:documentId', getUserResponseController);
router.post('/user-response/:documentId', userResponseController);

export default router;