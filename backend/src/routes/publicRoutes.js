// src/routes/publicRoutes.js

import express from 'express';

const router = express.Router();

router.get('/home', (req, res) => {
	res.status(200).json({
		message: 'Public home page',
	});
});

router.get('/posts', (req, res) => {
	res.status(200).json({
		posts: [],
	});
});

router.get('/posts/:id', (req, res) => {
	res.status(200).json({
		id: req.params.id,
	});
});

export default router;
