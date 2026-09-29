// src/routes/adminRoutes.js

import express from 'express';
import {
	getAllUsers,
	getUserById,
	deleteUser,
	updateUserRole,
	getStats,
} from '../controllers/adminController.js';

import verifyToken from '../middlewares/verifyToken.js';
import requireAdmin from '../middlewares/requireAdmin.js';

const router = express.Router();

router.get('/users', verifyToken, requireAdmin, getAllUsers);

router.get('/users/:id', verifyToken, requireAdmin, getUserById);

router.delete('/users/:id', verifyToken, requireAdmin, deleteUser);

router.patch('/users/:id/role', verifyToken, requireAdmin, updateUserRole);

router.get('/stats', verifyToken, requireAdmin, getStats);

export default router;
