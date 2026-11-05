import { useState } from 'react';
import { Link } from 'react-router';
import {
	KeyRound,
	Lock,
	Eye,
	EyeOff,
	CheckCircle2,
	AlertCircle,
	Loader2,
	ArrowLeft,
} from 'lucide-react';

function ChangePassword() {
	const [currentPassword, setCurrentPassword] = useState('');
	const [newPassword, setNewPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');

	const [showCurrent, setShowCurrent] = useState(false);
	const [showNew, setShowNew] = useState(false);
	const [showConfirm, setShowConfirm] = useState(false);

	const [loading, setLoading] = useState(false);
	const [message, setMessage] = useState('');
	const [error, setError] = useState('');

	let link = import.meta.env.VITE_BACKEND_URI;

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (!currentPassword || !newPassword) {
			setError('Please provide both current and new password.');
			return;
		}

		if (newPassword.length < 6) {
			setError('New password must be at least 6 characters long.');
			return;
		}

		if (newPassword !== confirmPassword) {
			setError('New passwords do not match.');
			return;
		}

		try {
			setLoading(true);
			setError('');
			setMessage('');

			const res = await fetch(`${Link}/api/user/password`, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
				},
				credentials: 'include',
				body: JSON.stringify({
					currentPassword,
					newPassword,
				}),
			});

			const data = await res.json();

			if (!res.ok) {
				throw new Error(data.message || 'Failed to update password');
			}

			setMessage(data.message || 'Password updated successfully!');
			setCurrentPassword('');
			setNewPassword('');
			setConfirmPassword('');
		} catch (err) {
			setError(err.message || 'Failed to update password');
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="flex-1 flex items-center justify-center p-4 sm:p-8 min-h-[calc(100vh-140px)]">
			<div className="w-full max-w-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 sm:p-10 shadow-xl relative overflow-hidden transition-colors">
				{/* Top Gradient Bar */}
				<div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></div>

				{/* Header */}
				<div className="text-center mb-8">
					<div className="w-13 h-13 rounded-2xl bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800/80 text-indigo-600 dark:text-indigo-400 inline-flex items-center justify-center mb-4 shadow-xs">
						<KeyRound size={26} />
					</div>
					<h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
						Update Password
					</h1>
					<p className="text-sm text-slate-500 dark:text-slate-400">
						Enter your current password and choose a secure new one.
					</p>
				</div>

				{message && (
					<div className="flex items-center gap-2.5 p-3.5 mb-6 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900 text-emerald-700 dark:text-emerald-300 text-sm animate-in fade-in">
						<CheckCircle2 size={18} className="shrink-0 text-emerald-500" />
						<span className="text-xs sm:text-sm">{message}</span>
					</div>
				)}

				{error && (
					<div className="flex items-center gap-2.5 p-3.5 mb-6 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 text-rose-700 dark:text-rose-300 text-sm animate-in fade-in">
						<AlertCircle size={18} className="shrink-0 text-rose-500" />
						<span className="text-xs sm:text-sm">{error}</span>
					</div>
				)}

				<form onSubmit={handleSubmit} className="space-y-4" noValidate>
					<div>
						<label
							htmlFor="current-pwd"
							className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5"
						>
							Current Password
						</label>
						<div className="relative flex items-center">
							<Lock
								size={18}
								className="absolute left-3.5 text-slate-400 pointer-events-none"
							/>
							<input
								id="current-pwd"
								type={showCurrent ? 'text' : 'password'}
								placeholder="Enter current password"
								value={currentPassword}
								onChange={(e) => setCurrentPassword(e.target.value)}
								required
								className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50/70 dark:bg-slate-800/60 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500 text-sm transition-all"
							/>
							<button
								type="button"
								className="absolute right-3 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer p-1"
								onClick={() => setShowCurrent(!showCurrent)}
								aria-label={showCurrent ? 'Hide password' : 'Show password'}
							>
								{showCurrent ? <EyeOff size={18} /> : <Eye size={18} />}
							</button>
						</div>
					</div>

					<div>
						<label
							htmlFor="new-pwd"
							className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5"
						>
							New Password
						</label>
						<div className="relative flex items-center">
							<Lock
								size={18}
								className="absolute left-3.5 text-slate-400 pointer-events-none"
							/>
							<input
								id="new-pwd"
								type={showNew ? 'text' : 'password'}
								placeholder="Minimum 6 characters"
								value={newPassword}
								onChange={(e) => setNewPassword(e.target.value)}
								required
								className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50/70 dark:bg-slate-800/60 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500 text-sm transition-all"
							/>
							<button
								type="button"
								className="absolute right-3 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer p-1"
								onClick={() => setShowNew(!showNew)}
								aria-label={showNew ? 'Hide password' : 'Show password'}
							>
								{showNew ? <EyeOff size={18} /> : <Eye size={18} />}
							</button>
						</div>
					</div>

					<div>
						<label
							htmlFor="confirm-pwd"
							className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5"
						>
							Confirm New Password
						</label>
						<div className="relative flex items-center">
							<Lock
								size={18}
								className="absolute left-3.5 text-slate-400 pointer-events-none"
							/>
							<input
								id="confirm-pwd"
								type={showConfirm ? 'text' : 'password'}
								placeholder="Re-type new password"
								value={confirmPassword}
								onChange={(e) => setConfirmPassword(e.target.value)}
								required
								className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50/70 dark:bg-slate-800/60 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500 text-sm transition-all"
							/>
							<button
								type="button"
								className="absolute right-3 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer p-1"
								onClick={() => setShowConfirm(!showConfirm)}
								aria-label={showConfirm ? 'Hide password' : 'Show password'}
							>
								{showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
							</button>
						</div>
					</div>

					<button
						type="submit"
						disabled={loading}
						className="w-full mt-2 inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-semibold text-sm text-white bg-indigo-600 hover:bg-indigo-500 disabled:opacity-60 shadow-lg shadow-indigo-600/30 transition-all cursor-pointer"
					>
						{loading ? (
							<>
								<Loader2 size={18} className="animate-spin" />
								<span>Encrypting & Updating...</span>
							</>
						) : (
							<span>Save New Password</span>
						)}
					</button>
				</form>

				<div className="mt-6 pt-5 border-t border-slate-200 dark:border-slate-800 text-center">
					<Link
						to="/profile"
						className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline"
					>
						<ArrowLeft size={14} />
						<span>Back to Profile Settings</span>
					</Link>
				</div>
			</div>
		</div>
	);
}

export default ChangePassword;
