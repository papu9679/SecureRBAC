import bcrypt from 'bcrypt';
import User from '../models/userModel.js';

// GET OWN PROFILE
export const getProfile = async (req, res) => {
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

// UPDATE OWN PROFILE
export const updateProfile = async (req, res) => {
	try {
		const { name, email } = req.body;

		const user = await User.findByIdAndUpdate(
			req.user.userId,
			{
				name,
				email,
			},
			{
				new: true,
			},
		).select('-password');

		if (!user) {
			return res.status(404).json({
				message: 'User not found',
			});
		}

		return res.status(200).json({
			message: 'Profile updated successfully',
			user,
		});
	} catch (error) {
		return res.status(500).json({
			message: 'Server error',
			error: error.message,
		});
	}
};

// CHANGE OWN PASSWORD
export const updatePassword = async (req, res) => {
	try {
		const { currentPassword, newPassword } = req.body;

		if (!currentPassword || !newPassword) {
			return res.status(400).json({
				message: 'Current password and new password are required',
			});
		}

		// We need password here, so DON'T use .select("-password")
		const user = await User.findById(req.user.userId);

		if (!user) {
			return res.status(404).json({
				message: 'User not found',
			});
		}

		// Check old/current password
		const isPasswordCorrect = await bcrypt.compare(
			currentPassword,
			user.password,
		);

		if (!isPasswordCorrect) {
			return res.status(401).json({
				message: 'Current password is incorrect',
			});
		}

		// Hash new password
		const hashedPassword = await bcrypt.hash(newPassword, 10);

		user.password = hashedPassword;

		await user.save();

		return res.status(200).json({
			message: 'Password updated successfully',
		});
	} catch (error) {
		return res.status(500).json({
			message: 'Server error',
			error: error.message,
		});
	}
};
