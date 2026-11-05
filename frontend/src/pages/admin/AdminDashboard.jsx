import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import {
	Users,
	UserCheck,
	Shield,
	ArrowRight,
	Loader2,
	RefreshCw,
	Activity,
	CheckCircle2,
} from 'lucide-react';

function AdminDashboard() {
	const [stats, setStats] = useState(null);
	const [loading, setLoading] = useState(true);
	const [refreshing, setRefreshing] = useState(false);
	const [error, setError] = useState('');

	let link = import.meta.env.VITE_BACKEND_URI;
	const refreshStats = async () => {
		try {
			setRefreshing(true);
			setError('');

			const res = await fetch(`${link}/api/admin/stats`, {
				credentials: 'include',
			});

			const data = await res.json();

			if (!res.ok) {
				throw new Error(data.message || 'Failed to fetch admin stats');
			}

			setStats(data);
		} catch (err) {
			console.error(err);
			setError(err.message || 'Error fetching stats');
		} finally {
			setRefreshing(false);
		}
	};

	useEffect(() => {
		let active = true;

		async function loadData() {
			try {
				setError('');
				const res = await fetch(`${link}/api/admin/stats`, {
					credentials: 'include',
				});

				const data = await res.json();

				if (!res.ok) {
					throw new Error(data.message || 'Failed to fetch admin stats');
				}

				if (active) {
					setStats(data);
				}
			} catch (err) {
				if (active) {
					setError(err.message || 'Error fetching stats');
				}
			} finally {
				if (active) {
					setLoading(false);
				}
			}
		}

		loadData();

		return () => {
			active = false;
		};
	}, []);

	if (loading) {
		return (
			<div className="flex-1 flex items-center justify-center p-8 min-h-[60vh]">
				<div className="w-full max-w-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-8 text-center shadow-sm flex flex-col items-center">
					<Loader2
						size={32}
						className="text-indigo-600 dark:text-indigo-400 animate-spin mb-3"
					/>
					<h3 className="text-base font-bold text-slate-900 dark:text-white mb-1">
						Loading statistics
					</h3>
					<p className="text-xs text-slate-500 dark:text-slate-400">
						Fetching user counts from the database...
					</p>
				</div>
			</div>
		);
	}

	const total = stats?.totalUsers || 0;
	const admins = stats?.totalAdmins || 0;
	const normal = stats?.totalNormalUsers || 0;
	const adminPercentage = total > 0 ? Math.round((admins / total) * 100) : 0;
	const userPercentage = total > 0 ? Math.round((normal / total) * 100) : 0;

	return (
		<div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
			{/* Header */}
			<div className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-xs mb-8 transition-colors">
				<div>
					<span className="text-xs font-bold uppercase tracking-wider text-purple-700 dark:text-purple-300 block mb-1">
						Admin
					</span>
					<h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mb-1">
						Admin Dashboard
					</h1>
					<p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
						Account counts, role breakdown, and user management.
					</p>
				</div>

				<div className="flex items-center gap-2.5">
					<button
						onClick={refreshStats}
						disabled={refreshing}
						className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors cursor-pointer"
					>
						<RefreshCw size={13} className={refreshing ? 'animate-spin' : ''} />
						<span>Refresh</span>
					</button>
					<Link
						to="/admin/users"
						className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 transition-colors"
					>
						<Users size={14} />
						<span>Manage users</span>
					</Link>
				</div>
			</div>

			{error && (
				<div className="p-4 mb-6 rounded-xl bg-rose-50 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-900 text-rose-700 dark:text-rose-300 text-sm">
					{error}
				</div>
			)}

			{/* 3 Metric Cards */}
			<div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
				<div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-xs">
					<div className="flex items-center justify-between mb-3">
						<span className="text-xs font-bold uppercase tracking-wider text-slate-400">
							Total accounts
						</span>
						<div className="w-9 h-9 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
							<Users size={18} />
						</div>
					</div>
					<div className="text-3xl font-extrabold text-slate-900 dark:text-white mb-1">
						{total}
					</div>
					<p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
						Registered accounts in the database
					</p>
					<div className="w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
						<div className="h-full bg-indigo-600 rounded-full w-full"></div>
					</div>
				</div>

				<div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-xs">
					<div className="flex items-center justify-between mb-3">
						<span className="text-xs font-bold uppercase tracking-wider text-slate-400">
							Standard users
						</span>
						<div className="w-9 h-9 rounded-lg bg-sky-50 dark:bg-sky-950/60 text-sky-600 dark:text-sky-400 flex items-center justify-center">
							<UserCheck size={18} />
						</div>
					</div>
					<div className="text-3xl font-extrabold text-slate-900 dark:text-white mb-1">
						{normal}
					</div>
					<p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
						{userPercentage}% of total (USER role)
					</p>
					<div className="w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
						<div
							className="h-full bg-sky-500 rounded-full"
							style={{ width: `${userPercentage}%` }}
						></div>
					</div>
				</div>

				<div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-xs">
					<div className="flex items-center justify-between mb-3">
						<span className="text-xs font-bold uppercase tracking-wider text-slate-400">
							Administrators
						</span>
						<div className="w-9 h-9 rounded-lg bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 flex items-center justify-center">
							<Shield size={18} />
						</div>
					</div>
					<div className="text-3xl font-extrabold text-slate-900 dark:text-white mb-1">
						{admins}
					</div>
					<p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
						{adminPercentage}% of total (ADMIN role)
					</p>
					<div className="w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
						<div
							className="h-full bg-purple-600 rounded-full"
							style={{ width: `${adminPercentage}%` }}
						></div>
					</div>
				</div>
			</div>

			{/* Two Column Grid */}
			<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
				{/* User Directory Card */}
				<div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-7 shadow-xs flex flex-col justify-between">
					<div>
						<div className="flex items-center gap-2.5 mb-3">
							<div className="w-9 h-9 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
								<Users size={18} />
							</div>
							<h3 className="text-base font-bold text-slate-900 dark:text-white">
								User management
							</h3>
						</div>
						<p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mb-6">
							Search registered users, promote standard accounts to ADMIN, or
							remove accounts.
						</p>

						{/* Ratio visualizer */}
						<div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950/50 border border-slate-200 dark:border-slate-800">
							<div className="flex justify-between text-xs font-semibold text-slate-600 dark:text-slate-300 mb-2">
								<span>Role distribution</span>
								<span>
									{admins} Admin / {normal} User
								</span>
							</div>
							<div className="w-full h-2 bg-slate-200 dark:bg-slate-800 rounded-full flex overflow-hidden mb-3">
								<div
									className="bg-purple-600 h-full"
									style={{ width: `${adminPercentage}%` }}
								></div>
								<div
									className="bg-sky-500 h-full"
									style={{ width: `${userPercentage}%` }}
								></div>
							</div>
							<div className="flex gap-4 text-xs text-slate-600 dark:text-slate-400">
								<div className="flex items-center gap-1.5">
									<span className="w-2 h-2 rounded-full bg-purple-600"></span>
									<span>ADMIN ({adminPercentage}%)</span>
								</div>
								<div className="flex items-center gap-1.5">
									<span className="w-2 h-2 rounded-full bg-sky-500"></span>
									<span>USER ({userPercentage}%)</span>
								</div>
							</div>
						</div>
					</div>

					<div className="pt-6 mt-6 border-t border-slate-100 dark:border-slate-800">
						<Link
							to="/admin/users"
							className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl font-semibold text-xs text-white bg-indigo-600 hover:bg-indigo-500 transition-colors"
						>
							<span>Open user directory</span>
							<ArrowRight size={14} />
						</Link>
					</div>
				</div>

				{/* System Health */}
				<div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-7 shadow-xs flex flex-col justify-between">
					<div>
						<div className="flex items-center gap-2.5 mb-3">
							<div className="w-9 h-9 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
								<Activity size={18} />
							</div>
							<h3 className="text-base font-bold text-slate-900 dark:text-white">
								System checks
							</h3>
						</div>
						<p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mb-6">
							Status of backend services and route middleware.
						</p>

						<div className="space-y-2.5">
							<div className="flex items-center justify-between p-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/40">
								<div className="flex items-center gap-2.5">
									<CheckCircle2
										size={16}
										className="text-emerald-500 shrink-0"
									/>
									<div>
										<strong className="text-xs text-slate-900 dark:text-white block">
											Admin middleware
										</strong>
										<span className="text-[11px] text-slate-400">
											Guards /api/admin/* endpoints
										</span>
									</div>
								</div>
								<span className="text-[10px] font-bold text-emerald-700 dark:text-emerald-300 bg-emerald-100 dark:bg-emerald-950 px-2 py-0.5 rounded">
									Active
								</span>
							</div>

							<div className="flex items-center justify-between p-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/40">
								<div className="flex items-center gap-2.5">
									<CheckCircle2
										size={16}
										className="text-emerald-500 shrink-0"
									/>
									<div>
										<strong className="text-xs text-slate-900 dark:text-white block">
											Cookie authentication
										</strong>
										<span className="text-[11px] text-slate-400">
											Validates HTTP-only JWTs
										</span>
									</div>
								</div>
								<span className="text-[10px] font-bold text-emerald-700 dark:text-emerald-300 bg-emerald-100 dark:bg-emerald-950 px-2 py-0.5 rounded">
									Active
								</span>
							</div>

							<div className="flex items-center justify-between p-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/40">
								<div className="flex items-center gap-2.5">
									<CheckCircle2
										size={16}
										className="text-emerald-500 shrink-0"
									/>
									<div>
										<strong className="text-xs text-slate-900 dark:text-white block">
											Database
										</strong>
										<span className="text-[11px] text-slate-400">
											Connected to MongoDB
										</span>
									</div>
								</div>
								<span className="text-[10px] font-bold text-emerald-700 dark:text-emerald-300 bg-emerald-100 dark:bg-emerald-950 px-2 py-0.5 rounded">
									Connected
								</span>
							</div>

							<div className="flex items-center justify-between p-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/40">
								<div className="flex items-center gap-2.5">
									<CheckCircle2
										size={16}
										className="text-emerald-500 shrink-0"
									/>
									<div>
										<strong className="text-xs text-slate-900 dark:text-white block">
											Client route guards
										</strong>
										<span className="text-[11px] text-slate-400">
											React Router checks user state
										</span>
									</div>
								</div>
								<span className="text-[10px] font-bold text-emerald-700 dark:text-emerald-300 bg-emerald-100 dark:bg-emerald-950 px-2 py-0.5 rounded">
									Active
								</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default AdminDashboard;
