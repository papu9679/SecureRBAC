import { Link } from 'react-router';
import { useAuth } from '../../context/AuthContext.jsx';
import {
	Shield,
	User,
	KeyRound,
	CheckCircle2,
	XCircle,
	ExternalLink,
	ShieldCheck,
	Fingerprint,
} from 'lucide-react';

function Dashboard() {
	const { user } = useAuth();

	const getInitials = (name) => {
		if (!name) return 'U';
		const parts = name.trim().split(' ');
		if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase();
		return name.slice(0, 2).toUpperCase();
	};

	const isAdmin = user?.role === 'ADMIN';

	return (
		<div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
			{/* Welcome Banner */}
			<div className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-xs mb-8 transition-colors">
				<div className="flex items-center gap-4">
					<div
						className={`w-14 h-14 rounded-xl flex items-center justify-center text-lg font-bold text-white ${
							isAdmin ? 'bg-purple-600' : 'bg-indigo-600'
						}`}
					>
						{getInitials(user?.name)}
					</div>
					<div>
						<h1 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
							Welcome, {user?.name || 'User'}
						</h1>
						<p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
							{user?.email}
						</p>
					</div>
				</div>

				<div className="flex flex-col sm:items-end">
					<span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1">
						Role
					</span>
					<div
						className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-wide border ${
							isAdmin
								? 'bg-purple-50 dark:bg-purple-950/50 text-purple-700 dark:text-purple-300 border-purple-200 dark:border-purple-800/80'
								: 'bg-sky-50 dark:bg-sky-950/50 text-sky-700 dark:text-sky-300 border-sky-200 dark:border-sky-800/80'
						}`}
					>
						<Shield size={13} />
						<span>{user?.role}</span>
					</div>
				</div>
			</div>

			{/* 3 Metric / Status Cards */}
			<div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
				{/* Card 1 */}
				<div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-xs flex flex-col justify-between">
					<div>
						<div className="flex items-center justify-between mb-3">
							<div className="w-9 h-9 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
								<ShieldCheck size={18} />
							</div>
							<span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/60">
								Active
							</span>
						</div>
						<span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-1">
							Account role
						</span>
						<div className="text-xl font-bold text-slate-900 dark:text-white mb-1.5">
							{user?.role}
						</div>
						<p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mb-4">
							{isAdmin
								? 'You have admin permissions to manage users and view statistics.'
								: 'You have standard permissions to view your dashboard and edit your profile.'}
						</p>
					</div>
					{isAdmin && (
						<div className="pt-3 border-t border-slate-100 dark:border-slate-800">
							<Link
								to="/admin"
								className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline"
							>
								<span>Admin dashboard</span>
								<ExternalLink size={12} />
							</Link>
						</div>
					)}
				</div>

				{/* Card 2 */}
				<div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-xs flex flex-col justify-between">
					<div>
						<div className="flex items-center justify-between mb-3">
							<div className="w-9 h-9 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
								<Fingerprint size={18} />
							</div>
							<span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-indigo-50 dark:bg-indigo-950/50 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800/60">
								JWT
							</span>
						</div>
						<span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-1">
							Session
						</span>
						<div className="text-xl font-bold text-slate-900 dark:text-white mb-1.5">
							HTTP-only cookie
						</div>
						<p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mb-4">
							Your browser sends your session token in an HTTP-only cookie on
							each request.
						</p>
					</div>
					<div className="pt-3 border-t border-slate-100 dark:border-slate-800">
						<Link
							to="/change-password"
							className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline"
						>
							<span>Change password</span>
							<KeyRound size={12} />
						</Link>
					</div>
				</div>

				{/* Card 3 */}
				<div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-xs flex flex-col justify-between">
					<div>
						<div className="flex items-center justify-between mb-3">
							<div className="w-9 h-9 rounded-lg bg-sky-50 dark:bg-sky-950/60 text-sky-600 dark:text-sky-400 flex items-center justify-center">
								<User size={18} />
							</div>
							<span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-sky-50 dark:bg-sky-950/50 text-sky-700 dark:text-sky-300 border border-sky-200 dark:border-sky-800/60">
								Profile
							</span>
						</div>
						<span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-1">
							Name
						</span>
						<div className="text-xl font-bold text-slate-900 dark:text-white mb-1.5 truncate">
							{user?.name}
						</div>
						<p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mb-4">
							Update your display name and email address.
						</p>
					</div>
					<div className="pt-3 border-t border-slate-100 dark:border-slate-800">
						<Link
							to="/profile"
							className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline"
						>
							<span>Edit profile</span>
							<ExternalLink size={12} />
						</Link>
					</div>
				</div>
			</div>

			{/* Permissions Matrix */}
			<div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xs transition-colors">
				<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-100 dark:border-slate-800">
					<div>
						<h2 className="text-base font-bold text-slate-900 dark:text-white">
							Your permissions
						</h2>
						<p className="text-xs text-slate-500 dark:text-slate-400">
							Actions permitted under the {user?.role} role.
						</p>
					</div>
					<span
						className={`inline-block px-2.5 py-0.5 rounded text-xs font-bold uppercase tracking-wider border self-start sm:self-auto ${
							isAdmin
								? 'bg-purple-50 dark:bg-purple-950/50 text-purple-700 dark:text-purple-300 border-purple-200 dark:border-purple-800'
								: 'bg-sky-50 dark:bg-sky-950/50 text-sky-700 dark:text-sky-300 border-sky-200 dark:border-sky-800'
						}`}
					>
						{user?.role}
					</span>
				</div>

				<div className="space-y-2.5">
					<div className="flex items-center justify-between p-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/40">
						<div className="flex items-center gap-2.5">
							<CheckCircle2 size={16} className="text-emerald-500 shrink-0" />
							<div>
								<strong className="text-xs text-slate-900 dark:text-white block">
									Public and user routes
								</strong>
								<span className="text-[11px] text-slate-500 dark:text-slate-400">
									Access /dashboard and public pages
								</span>
							</div>
						</div>
						<span className="text-xs font-semibold text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/50 px-2 py-0.5 rounded">
							Allowed
						</span>
					</div>

					<div className="flex items-center justify-between p-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/40">
						<div className="flex items-center gap-2.5">
							<CheckCircle2 size={16} className="text-emerald-500 shrink-0" />
							<div>
								<strong className="text-xs text-slate-900 dark:text-white block">
									Update profile and password
								</strong>
								<span className="text-[11px] text-slate-500 dark:text-slate-400">
									Modify your name, email, and password
								</span>
							</div>
						</div>
						<span className="text-xs font-semibold text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/50 px-2 py-0.5 rounded">
							Allowed
						</span>
					</div>

					<div className="flex items-center justify-between p-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/40">
						<div className="flex items-center gap-2.5">
							{isAdmin ? (
								<CheckCircle2 size={16} className="text-emerald-500 shrink-0" />
							) : (
								<XCircle size={16} className="text-slate-400 shrink-0" />
							)}
							<div>
								<strong className="text-xs text-slate-900 dark:text-white block">
									Admin stats and user directory
								</strong>
								<span className="text-[11px] text-slate-500 dark:text-slate-400">
									Access /admin and /admin/users
								</span>
							</div>
						</div>
						<span
							className={`text-xs font-semibold px-2 py-0.5 rounded ${
								isAdmin
									? 'text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/50'
									: 'text-slate-500 bg-slate-100 dark:bg-slate-800'
							}`}
						>
							{isAdmin ? 'Allowed' : 'Admin only'}
						</span>
					</div>

					<div className="flex items-center justify-between p-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/40">
						<div className="flex items-center gap-2.5">
							{isAdmin ? (
								<CheckCircle2 size={16} className="text-emerald-500 shrink-0" />
							) : (
								<XCircle size={16} className="text-slate-400 shrink-0" />
							)}
							<div>
								<strong className="text-xs text-slate-900 dark:text-white block">
									Role updates and account deletion
								</strong>
								<span className="text-[11px] text-slate-500 dark:text-slate-400">
									Change member roles or delete accounts
								</span>
							</div>
						</div>
						<span
							className={`text-xs font-semibold px-2 py-0.5 rounded ${
								isAdmin
									? 'text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/50'
									: 'text-slate-500 bg-slate-100 dark:bg-slate-800'
							}`}
						>
							{isAdmin ? 'Allowed' : 'Admin only'}
						</span>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Dashboard;
