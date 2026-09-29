import User from '../models/userModel.js';

// GET ALL USERS
export const getAllUsers = async (req, res) => {
	try {
		const users = await User.find().select('-password');

		return res.status(200).json({
			users,
		});
	} catch (error) {
		return res.status(500).json({
			message: 'Server error',
			error: error.message,
		});
	}
};

// GET SINGLE USER
export const getUserById = async (req, res) => {
	try {
		const { id } = req.params;

		const user = await User.findById(id).select('-password');

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

// DELETE USER
export const deleteUser = async (req, res) => {
	try {
		const { id } = req.params;

		const user = await User.findByIdAndDelete(id);

		if (!user) {
			return res.status(404).json({
				message: 'User not found',
			});
		}

		return res.status(200).json({
			message: 'User deleted successfully',
		});
	} catch (error) {
		return res.status(500).json({
			message: 'Server error',
			error: error.message,
		});
	}
};

// UPDATE USER ROLE
export const updateUserRole = async (req, res) => {
	try {
		const { id } = req.params;
		const { role } = req.body;

		if (!['USER', 'ADMIN'].includes(role)) {
			return res.status(400).json({
				message: 'Invalid role',
			});
		}

		const user = await User.findByIdAndUpdate(
			id,
			{ role },
			{ new: true },
		).select('-password');

		if (!user) {
			return res.status(404).json({
				message: 'User not found',
			});
		}

		return res.status(200).json({
			message: 'Role updated successfully',
			user,
		});
	} catch (error) {
		return res.status(500).json({
			message: 'Server error',
			error: error.message,
		});
	}
};

// ADMIN DASHBOARD STATS
export const getStats = async (req, res) => {
	try {
		const totalUsers = await User.countDocuments();

		const totalAdmins = await User.countDocuments({
			role: 'ADMIN',
		});

		const totalNormalUsers = await User.countDocuments({
			role: 'USER',
		});

		return res.status(200).json({
			totalUsers,
			totalAdmins,
			totalNormalUsers,
		});
	} catch (error) {
		return res.status(500).json({
			message: 'Server error',
			error: error.message,
		});
	}
};
