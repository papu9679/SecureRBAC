import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';

// REGISTER
export const register = async (req, res) => {
	try {
		const { name, email, password, role } = req.body;
		// admin@123

		// 1. Check required fields
		if (!name || !email || !password) {
			return res.status(400).json({
				message: 'All fields are required',
			});
		}

		// 2. Check if user already exists
		const existingUser = await User.findOne({ email });

		if (existingUser) {
			return res.status(409).json({
				message: 'User already exists',
			});
		}

		// 3. Hash password
		const hashedPassword = await bcrypt.hash(password, 10);

		// 4. Create user
		const user = await User.create({
			name,
			email,
			password: hashedPassword,
			role: role || 'USER',
		});

		return res.status(201).json({
			message: 'User registered successfully',
			user: {
				id: user._id,
				name: user.name,
				email: user.email,
				role: user.role,
			},
		});
	} catch (error) {
		return res.status(500).json({
			message: 'Server error',
			error: error.message,
		});
	}
};

// LOGIN
export const login = async (req, res) => {
	try {
		const { email, password } = req.body;

		// 1. Check fields
		if (!email || !password) {
			return res.status(400).json({
				message: 'Email and password are required',
			});
		}

		// 2. Find user
		const user = await User.findOne({ email: email });

		// console.log(user);

		if (!user) {
			return res.status(401).json({
				message: 'Invalid email or password',
			});
		}

		// 3. Compare password
		const isPasswordCorrect = await bcrypt.compare(password, user.password);

		if (!isPasswordCorrect) {
			return res.status(401).json({
				message: 'Invalid email or password',
			});
		}

		// 4. Create JWT
		const token = jwt.sign(
			{
				userId: user._id,
				role: user.role,
			},
			process.env.JWT_SECRET,
			{
				expiresIn: '1d',
			},
		);

		console.log(token);

		// 5. Send token inside cookie
		res.cookie('token', token, {
			httpOnly: true,
			//   sameSite: "lax",
			//   secure: false,
			maxAge: 24 * 60 * 60 * 1000,
		});

		// 6. Send user data
		return res.status(200).json({
			message: 'Login successful',
			user: {
				id: user._id,
				name: user.name,
				email: user.email,
				role: user.role,
				token,
			},
		});
	} catch (error) {
		return res.status(500).json({
			message: 'Server error',
			error: error.message,
		});
	}
};

// LOGOUT
export const logout = async (req, res) => {
	try {
		res.clearCookie('token');

		return res.status(200).json({
			message: 'Logout successful',
		});
	} catch (error) {
		return res.status(500).json({
			message: 'Server error',
			error: error.message,
		});
	}
};

// GET CURRENT LOGGED-IN USER
export const getMe = async (req, res) => {
	try {
		const user = await User.findById(req.user.userId).select('-password');

		if (!user) {
			return res.status(404).json({
				message: 'User not found',
			});
		}

		return res.status(200).json({
			user,
		});
	} catch (error) {
		return res.status(500).json({
			message: 'Server error',
			error: error.message,
		});
	}
};
