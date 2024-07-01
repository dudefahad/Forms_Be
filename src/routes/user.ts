import express from 'express';
import { getUserByIdController, signInUserController, signUpUserController } from '../controllers/user';
import { UserAuth } from '../common/user-authorisation';

const router = express.Router();

// search user by id
router.get('/:id', getUserByIdController);

// login the user
router.post('/login', signInUserController);

// create new user
router.post('/register', signUpUserController);

export default router;