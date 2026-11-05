import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import { useAuth } from '../../context/AuthContext.jsx';
import {
	User,
	Mail,
	Shield,
	KeyRound,
	CheckCircle2,
	AlertCircle,
	Loader2,
	Save,
	IdCard,
} from 'lucide-react';

function Profile() {
	const { updateUser } = useAuth();

	const [profile, setProfile] = useState(null);
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');

	const [loading, setLoading] = useState(true);
	const [saving, setSaving] = useState(false);
	const [successMsg, setSuccessMsg] = useState('');
	const [errorMsg, setErrorMsg] = useState('');

	let link = import.meta.env.VITE_BACKEND_URI;

	useEffect(() => {
		let active = true;

		async function fetchProfile() {
			try {
				const res = await fetch(`${link}/api/user/profile`, {
					credentials: 'include',
				});

				const data = await res.json();

				if (!res.ok) {
					throw new Error(data.message || 'Failed to load profile');
				}

				if (active) {
					setProfile(data.user);
					setName(data.user.name || '');
					setEmail(data.user.email || '');
				}
			} catch (error) {
				console.error(error);
				if (active) {
					setErrorMsg(error.message || 'Could not retrieve profile');
				}
			} finally {
				if (active) {
					setLoading(false);
				}
			}
		}

		fetchProfile();

		return () => {
			active = false;
		};
	}, []);

	const handleUpdate = async (e) => {
		e.preventDefault();

		if (!name.trim() || !email.trim()) {
			setErrorMsg('Name and email cannot be empty');
			return;
		}

		try {
			setSaving(true);
			setErrorMsg('');
			setSuccessMsg('');

			const res = await fetch(`${link}/api/user/profile`, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
				},
				credentials: 'include',
				body: JSON.stringify({ name: name.trim(), email: email.trim() }),
			});

			const data = await res.json();

			if (!res.ok) {
				throw new Error(data.message || 'Failed to update profile');
			}

			setProfile(data.user);
			setName(data.user.name);
			setEmail(data.user.email);
			updateUser(data.user);
			setSuccessMsg('Profile updated successfully!');
		} catch (err) {
			setErrorMsg(err.message || 'Error updating profile');
		} finally {
			setSaving(false);
		}
	};

	const getInitials = (str) => {
		if (!str) return 'U';
		const parts = str.trim().split(' ');
		if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase();
		return str.slice(0, 2).toUpperCase();
	};

	if (loading) {
		return (
			<div className="flex-1 flex items-center justify-center p-8 min-h-[60vh]">
				<div className="w-full max-w-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-8 text-center shadow-lg flex flex-col items-center">
					<Loader2
						size={36}
						className="text-indigo-600 dark:text-indigo-400 animate-spin mb-4"
					/>
					<h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1">
						Loading Profile
					</h3>
					<p className="text-sm text-slate-500 dark:text-slate-400">
						Retrieving your account details...
					</p>
				</div>
			</div>
		);
	}

	const isAdmin = profile?.role === 'ADMIN';

	return (
		<div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
			{/* Header */}
			<div className="mb-8">
				<h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mb-1">
					Account Settings
				</h1>
				<p className="text-sm text-slate-500 dark:text-slate-400">
					Manage your personal profile and security preferences
				</p>
			</div>

			<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
				{/* Left Column: Profile Identity Card */}
				<div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 text-center shadow-sm flex flex-col items-center">
					<div className="relative mb-5">
						<div
							className={`w-24 h-24 rounded-full flex items-center justify-center text-3xl font-extrabold text-white shadow-lg ${
								isAdmin
									? 'bg-gradient-to-tr from-purple-600 via-purple-500 to-pink-500 shadow-purple-500/20'
									: 'bg-gradient-to-tr from-sky-500 to-indigo-600 shadow-indigo-500/20'
							}`}
						>
							{getInitials(profile?.name)}
						</div>
						<span
							className={`absolute bottom-0 right-0 text-[10px] font-bold uppercase px-2.5 py-0.5 rounded-full border shadow-xs ${
								isAdmin
									? 'bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300 border-purple-200 dark:border-purple-800'
									: 'bg-sky-100 dark:bg-sky-950 text-sky-700 dark:text-sky-300 border-sky-200 dark:border-sky-800'
							}`}
						>
							{profile?.role}
						</span>
					</div>

					<h2 className="text-xl font-bold text-slate-900 dark:text-white mb-1">
						{profile?.name}
					</h2>
					<p className="text-xs text-slate-500 dark:text-slate-400 mb-6">
						{profile?.email}
					</p>

					<div className="w-full space-y-3 pt-6 border-t border-slate-100 dark:border-slate-800 text-left mb-6">
						<div className="flex items-center gap-3">
							<Shield size={16} className="text-slate-400 shrink-0" />
							<div>
								<span className="text-[11px] font-bold uppercase text-slate-400 block">
									Clearance
								</span>
								<span className="text-xs font-semibold text-slate-800 dark:text-slate-200">
									{profile?.role}
								</span>
							</div>
						</div>

						<div className="flex items-center gap-3">
							<IdCard size={16} className="text-slate-400 shrink-0" />
							<div>
								<span className="text-[11px] font-bold uppercase text-slate-400 block">
									User Identifier
								</span>
								<span className="text-xs font-mono text-slate-600 dark:text-slate-400 break-all">
									{profile?._id}
								</span>
							</div>
						</div>
					</div>

					<Link
						to="/change-password"
						className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl font-semibold text-xs border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors shadow-xs"
					>
						<KeyRound size={14} />
						<span>Change Account Password</span>
					</Link>
				</div>

				{/* Right Column: Edit Form */}
				<div className="lg:col-span-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm">
					<div className="mb-6 pb-4 border-b border-slate-100 dark:border-slate-800">
						<h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1">
							Personal Information
						</h3>
						<p className="text-xs text-slate-500 dark:text-slate-400">
							Update your display name and email address
						</p>
					</div>

					{successMsg && (
						<div className="flex items-center gap-2.5 p-3.5 mb-6 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900 text-emerald-700 dark:text-emerald-300 text-sm animate-in fade-in">
							<CheckCircle2 size={18} className="shrink-0 text-emerald-500" />
							<span className="text-xs sm:text-sm">{successMsg}</span>
						</div>
					)}

					{errorMsg && (
						<div className="flex items-center gap-2.5 p-3.5 mb-6 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 text-rose-700 dark:text-rose-300 text-sm animate-in fade-in">
							<AlertCircle size={18} className="shrink-0 text-rose-500" />
							<span className="text-xs sm:text-sm">{errorMsg}</span>
						</div>
					)}

					<form onSubmit={handleUpdate} className="space-y-5">
						<div>
							<label
								htmlFor="profile-name"
								className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5"
							>
								Display Name
							</label>
							<div className="relative flex items-center">
								<User
									size={18}
									className="absolute left-3.5 text-slate-400 pointer-events-none"
								/>
								<input
									id="profile-name"
									type="text"
									value={name}
									onChange={(e) => setName(e.target.value)}
									placeholder="Enter your full name"
									required
									className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50/70 dark:bg-slate-800/60 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500 text-sm transition-all"
								/>
							</div>
						</div>

						<div>
							<label
								htmlFor="profile-email"
								className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5"
							>
								Email Address
							</label>
							<div className="relative flex items-center">
								<Mail
									size={18}
									className="absolute left-3.5 text-slate-400 pointer-events-none"
								/>
								<input
									id="profile-email"
									type="email"
									value={email}
									onChange={(e) => setEmail(e.target.value)}
									placeholder="Enter your email address"
									required
									className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50/70 dark:bg-slate-800/60 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500 text-sm transition-all"
								/>
							</div>
							<span className="block text-[11px] text-slate-400 mt-1">
								Updating your email changes the credential used for future
								logins.
							</span>
						</div>

						<div className="pt-2 flex justify-end">
							<button
								type="submit"
								disabled={saving}
								className="inline-flex items-center gap-2 py-2.5 px-5 rounded-xl font-semibold text-sm text-white bg-indigo-600 hover:bg-indigo-500 disabled:opacity-60 shadow-md shadow-indigo-600/30 transition-all cursor-pointer"
							>
								{saving ? (
									<>
										<Loader2 size={16} className="animate-spin" />
										<span>Saving Changes...</span>
									</>
								) : (
									<>
										<Save size={16} />
										<span>Save Changes</span>
									</>
								)}
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
}

export default Profile;
