// src/routes/userRoutes.js

import express from 'express';
import {
	getProfile,
	updateProfile,
	updatePassword,
} from '../controllers/userController.js';

import verifyToken from '../middlewares/verifyToken.js';

const router = express.Router();

router.get('/profile', verifyToken, getProfile);

router.put('/profile', verifyToken, updateProfile);

router.put('/password', verifyToken, updatePassword);

export default router;
