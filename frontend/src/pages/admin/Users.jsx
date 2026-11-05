import { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext.jsx';
import {
	Users as UsersIcon,
	Search,
	Filter,
	Shield,
	Trash2,
	UserCheck,
	RefreshCw,
	Loader2,
	AlertCircle,
	CheckCircle2,
	X,
	AlertTriangle,
	ArrowUpDown,
} from 'lucide-react';

function Users() {
	const { user: currentAdmin } = useAuth();

	const [users, setUsers] = useState([]);
	const [loading, setLoading] = useState(true);
	const [refreshing, setRefreshing] = useState(false);
	const [searchQuery, setSearchQuery] = useState('');
	const [roleFilter, setRoleFilter] = useState('ALL');

	const [actionLoadingId, setActionLoadingId] = useState(null);
	const [feedback, setFeedback] = useState({ type: '', message: '' });

	// Modal confirmation state for deletion
	const [deleteTarget, setDeleteTarget] = useState(null);
	let link = import.meta.env.VITE_BACKEND_URI;

	const fetchUsersList = async () => {
		try {
			setRefreshing(true);
			const res = await fetch(`${link}/api/admin/users`, {
				credentials: 'include',
			});

			const data = await res.json();

			if (!res.ok) {
				throw new Error(data.message || 'Failed to fetch users');
			}

			setUsers(data.users || []);
		} catch (error) {
			console.error(error);
			setFeedback({
				type: 'danger',
				message: error.message || 'Error loading users',
			});
		} finally {
			setRefreshing(false);
		}
	};

	useEffect(() => {
		let active = true;

		async function loadData() {
			try {
				const res = await fetch(`${link}/api/admin/users`, {
					credentials: 'include',
				});

				const data = await res.json();

				if (!res.ok) {
					throw new Error(data.message || 'Failed to fetch users');
				}

				if (active) {
					setUsers(data.users || []);
				}
			} catch (error) {
				console.error(error);
				if (active) {
					setFeedback({
						type: 'danger',
						message: error.message || 'Error loading users',
					});
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

	// Update role handler
	const handleRoleChange = async (userId, targetRole) => {
		try {
			setActionLoadingId(userId);
			setFeedback({ type: '', message: '' });

			const res = await fetch(`${link}/api/admin/users/${userId}/role`, {
				method: 'PATCH',
				headers: {
					'Content-Type': 'application/json',
				},
				credentials: 'include',
				body: JSON.stringify({ role: targetRole }),
			});

			const data = await res.json();

			if (!res.ok) {
				throw new Error(data.message || 'Failed to update role');
			}

			setUsers((prev) =>
				prev.map((u) => (u._id === userId ? { ...u, role: targetRole } : u)),
			);

			setFeedback({
				type: 'success',
				message: `Updated role to ${targetRole}.`,
			});
		} catch (err) {
			setFeedback({
				type: 'danger',
				message: err.message || 'Role update failed',
			});
		} finally {
			setActionLoadingId(null);
		}
	};

	// Delete user handler
	const confirmDelete = async () => {
		if (!deleteTarget) return;

		try {
			setActionLoadingId(deleteTarget._id);
			setFeedback({ type: '', message: '' });

			const res = await fetch(`${link}/api/admin/users/${deleteTarget._id}`, {
				method: 'DELETE',
				credentials: 'include',
			});

			const data = await res.json();

			if (!res.ok) {
				throw new Error(data.message || 'Failed to delete user');
			}

			setUsers((prev) => prev.filter((u) => u._id !== deleteTarget._id));
			setFeedback({
				type: 'success',
				message: `Deleted account for ${deleteTarget.name}.`,
			});
			setDeleteTarget(null);
		} catch (err) {
			setFeedback({
				type: 'danger',
				message: err.message || 'Failed to delete user',
			});
		} finally {
			setActionLoadingId(null);
		}
	};

	const getInitials = (name) => {
		if (!name) return 'U';
		const parts = name.trim().split(' ');
		if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase();
		return name.slice(0, 2).toUpperCase();
	};

	// Filtered users list
	const filteredUsers = users.filter((u) => {
		const matchesSearch =
			u.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
			u.email?.toLowerCase().includes(searchQuery.toLowerCase());

		const matchesRole = roleFilter === 'ALL' || u.role === roleFilter;

		return matchesSearch && matchesRole;
	});

	return (
		<div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
			{/* Header */}
			<div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
				<div>
					<span className="text-xs font-bold uppercase tracking-wider text-indigo-700 dark:text-indigo-300 block mb-1">
						Directory
					</span>
					<h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mb-1">
						Users
					</h1>
					<p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
						Search accounts, update roles between USER and ADMIN, or delete
						users.
					</p>
				</div>

				<button
					onClick={fetchUsersList}
					disabled={refreshing}
					className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors cursor-pointer"
					title="Reload users"
				>
					<RefreshCw size={13} className={refreshing ? 'animate-spin' : ''} />
					<span>Reload</span>
				</button>
			</div>

			{/* Feedback Banner */}
			{feedback.message && (
				<div
					className={`flex items-center justify-between gap-3 p-3.5 mb-6 rounded-xl border text-sm ${
						feedback.type === 'success'
							? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-900 text-emerald-700 dark:text-emerald-300'
							: 'bg-rose-50 dark:bg-rose-950/40 border-rose-200 dark:border-rose-900 text-rose-700 dark:text-rose-300'
					}`}
				>
					<div className="flex items-center gap-2">
						{feedback.type === 'success' ? (
							<CheckCircle2 size={16} className="shrink-0 text-emerald-500" />
						) : (
							<AlertCircle size={16} className="shrink-0 text-rose-500" />
						)}
						<span className="text-xs sm:text-sm">{feedback.message}</span>
					</div>
					<button
						onClick={() => setFeedback({ type: '', message: '' })}
						className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
					>
						<X size={14} />
					</button>
				</div>
			)}

			{/* Search and Filters Bar */}
			<div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
				<div className="relative w-full sm:w-80 flex items-center">
					<Search
						size={15}
						className="absolute left-3.5 text-slate-400 pointer-events-none"
					/>
					<input
						type="text"
						placeholder="Search by name or email..."
						value={searchQuery}
						onChange={(e) => setSearchQuery(e.target.value)}
						className="w-full pl-9 pr-8 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder-slate-400 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/40"
					/>
					{searchQuery && (
						<button
							onClick={() => setSearchQuery('')}
							className="absolute right-2.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
						>
							<X size={14} />
						</button>
					)}
				</div>

				<div className="w-full sm:w-auto relative flex items-center">
					<Filter
						size={13}
						className="absolute left-3.5 text-slate-400 pointer-events-none"
					/>
					<select
						value={roleFilter}
						onChange={(e) => setRoleFilter(e.target.value)}
						className="w-full sm:w-auto pl-9 pr-6 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-xs sm:text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-indigo-500/40 cursor-pointer"
					>
						<option value="ALL">All roles ({users.length})</option>
						<option value="USER">USER</option>
						<option value="ADMIN">ADMIN</option>
					</select>
				</div>
			</div>

			{/* Users Table */}
			<div className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xs overflow-hidden transition-colors">
				{loading ? (
					<div className="flex flex-col items-center justify-center p-12 text-slate-500 dark:text-slate-400 gap-2">
						<Loader2
							size={28}
							className="text-indigo-600 dark:text-indigo-400 animate-spin"
						/>
						<span className="text-xs">Loading users...</span>
					</div>
				) : filteredUsers.length === 0 ? (
					<div className="flex flex-col items-center justify-center p-12 text-slate-500 dark:text-slate-400 gap-2">
						<UsersIcon
							size={36}
							className="text-slate-300 dark:text-slate-600 mb-1"
						/>
						<h3 className="font-bold text-sm text-slate-800 dark:text-slate-200">
							No users found
						</h3>
						<p className="text-xs">
							{searchQuery || roleFilter !== 'ALL'
								? 'No user accounts match your search or filter.'
								: 'There are no registered users.'}
						</p>
					</div>
				) : (
					<div className="overflow-x-auto">
						<table className="w-full text-left border-collapse">
							<thead>
								<tr className="bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-800 text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
									<th className="px-6 py-3.5">User</th>
									<th className="px-6 py-3.5">Role</th>
									<th className="px-6 py-3.5 hidden md:table-cell">ID</th>
									<th className="px-6 py-3.5 text-right">Actions</th>
								</tr>
							</thead>
							<tbody className="divide-y divide-slate-100 dark:divide-slate-800/80 text-sm">
								{filteredUsers.map((u) => {
									const isCurrent =
										currentAdmin?._id === u._id ||
										currentAdmin?.email === u.email;
									const isActing = actionLoadingId === u._id;

									return (
										<tr
											key={u._id}
											className={`hover:bg-slate-50/70 dark:hover:bg-slate-800/40 transition-colors ${
												isCurrent ? 'bg-indigo-50/40 dark:bg-indigo-950/20' : ''
											}`}
										>
											{/* Name & Email */}
											<td className="px-6 py-4">
												<div className="flex items-center gap-3">
													<div
														className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0 ${
															u.role === 'ADMIN'
																? 'bg-purple-600'
																: 'bg-indigo-600'
														}`}
													>
														{getInitials(u.name)}
													</div>
													<div>
														<div className="flex items-center gap-2">
															<span className="font-semibold text-slate-900 dark:text-white">
																{u.name}
															</span>
															{isCurrent && (
																<span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800">
																	You
																</span>
															)}
														</div>
														<span className="text-xs text-slate-500 dark:text-slate-400">
															{u.email}
														</span>
													</div>
												</div>
											</td>

											{/* Role */}
											<td className="px-6 py-4 whitespace-nowrap">
												<span
													className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-xs font-bold uppercase tracking-wider border ${
														u.role === 'ADMIN'
															? 'bg-purple-50 dark:bg-purple-950/50 text-purple-700 dark:text-purple-300 border-purple-200 dark:border-purple-800/80'
															: 'bg-sky-50 dark:bg-sky-950/50 text-sky-700 dark:text-sky-300 border-sky-200 dark:border-sky-800/80'
													}`}
												>
													{u.role === 'ADMIN' ? (
														<Shield size={11} />
													) : (
														<UserCheck size={11} />
													)}
													<span>{u.role}</span>
												</span>
											</td>

											{/* ID */}
											<td className="px-6 py-4 hidden md:table-cell whitespace-nowrap">
												<span className="font-mono text-xs text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded">
													{u._id}
												</span>
											</td>

											{/* Actions */}
											<td className="px-6 py-4 whitespace-nowrap text-right">
												<div className="inline-flex items-center gap-2">
													<button
														onClick={() =>
															handleRoleChange(
																u._id,
																u.role === 'ADMIN' ? 'USER' : 'ADMIN',
															)
														}
														disabled={isActing || isCurrent}
														className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed ${
															u.role === 'ADMIN'
																? 'border-amber-300 dark:border-amber-800 text-amber-700 dark:text-amber-300 hover:bg-amber-50 dark:hover:bg-amber-950/40'
																: 'border-indigo-300 dark:border-indigo-800 text-indigo-700 dark:text-indigo-300 hover:bg-indigo-50 dark:hover:bg-indigo-950/40'
														}`}
														title={
															isCurrent
																? 'You cannot alter your own admin status'
																: u.role === 'ADMIN'
																	? 'Demote to USER'
																	: 'Promote to ADMIN'
														}
													>
														{isActing ? (
															<Loader2 size={12} className="animate-spin" />
														) : (
															<ArrowUpDown size={12} />
														)}
														<span>
															{u.role === 'ADMIN'
																? 'Demote to USER'
																: 'Promote to ADMIN'}
														</span>
													</button>

													<button
														onClick={() => setDeleteTarget(u)}
														disabled={isActing || isCurrent}
														className="p-1.5 rounded-lg text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 border border-rose-200 dark:border-rose-900/60 transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
														title={
															isCurrent
																? 'You cannot delete your logged-in account'
																: 'Delete user'
														}
													>
														<Trash2 size={14} />
													</button>
												</div>
											</td>
										</tr>
									);
								})}
							</tbody>
						</table>
					</div>
				)}

				<div className="px-6 py-3 bg-slate-50 dark:bg-slate-800/60 border-t border-slate-200 dark:border-slate-800 text-xs text-slate-500 dark:text-slate-400">
					Showing{' '}
					<strong className="text-slate-700 dark:text-slate-200">
						{filteredUsers.length}
					</strong>{' '}
					of{' '}
					<strong className="text-slate-700 dark:text-slate-200">
						{users.length}
					</strong>{' '}
					accounts
				</div>
			</div>

			{/* Delete Confirmation Modal */}
			{deleteTarget && (
				<div
					className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-150"
					onClick={() => setDeleteTarget(null)}
				>
					<div
						className="w-full max-w-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xl overflow-hidden"
						onClick={(e) => e.stopPropagation()}
					>
						<div className="p-6 bg-rose-50 dark:bg-rose-950/40 border-b border-rose-100 dark:border-rose-900/50 flex items-center gap-3.5">
							<div className="w-10 h-10 rounded-xl bg-rose-100 dark:bg-rose-900/60 text-rose-600 dark:text-rose-300 flex items-center justify-center shrink-0">
								<AlertTriangle size={20} />
							</div>
							<div>
								<h3 className="text-base font-bold text-slate-900 dark:text-white">
									Delete user account
								</h3>
								<p className="text-xs text-slate-500 dark:text-slate-400">
									This removes the user from the database.
								</p>
							</div>
						</div>

						<div className="p-6 text-xs text-slate-700 dark:text-slate-300">
							<p>
								Delete account for{' '}
								<strong className="text-slate-900 dark:text-white">
									{deleteTarget.name}
								</strong>{' '}
								({deleteTarget.email})?
							</p>
						</div>

						<div className="px-6 py-3.5 bg-slate-50 dark:bg-slate-800/60 border-t border-slate-200 dark:border-slate-800 flex justify-end gap-2.5">
							<button
								type="button"
								onClick={() => setDeleteTarget(null)}
								className="px-3.5 py-2 rounded-xl text-xs font-semibold border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
							>
								Cancel
							</button>
							<button
								type="button"
								onClick={confirmDelete}
								disabled={actionLoadingId === deleteTarget._id}
								className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold text-white bg-rose-600 hover:bg-rose-500 transition-colors cursor-pointer"
							>
								{actionLoadingId === deleteTarget._id ? (
									<>
										<Loader2 size={13} className="animate-spin" />
										<span>Deleting...</span>
									</>
								) : (
									<>
										<Trash2 size={13} />
										<span>Delete account</span>
									</>
								)}
							</button>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}

export default Users;
