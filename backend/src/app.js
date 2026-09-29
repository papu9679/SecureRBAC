import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import publicRoutes from './routes/publicRoutes.js';

const app = express();

app.use(express.json());
app.use(cookieParser());

// app.use(cors());

app.use(
	cors({
		origin: 'http://localhost:5173',
		credentials: true,
	}),
);

app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/public', publicRoutes);

export default app;
