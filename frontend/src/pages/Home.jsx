import { Link } from 'react-router';
import { useAuth } from '../context/AuthContext.jsx';
import {
	Shield,
	Lock,
	Users,
	KeyRound,
	CheckCircle2,
	ArrowRight,
	ShieldCheck,
	Eye,
	Sliders,
	Database,
} from 'lucide-react';

function Home() {
	const { user } = useAuth();

	return (
		<div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 flex flex-col items-center text-center">
			{/* Badge */}
			<div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800 text-indigo-700 dark:text-indigo-300 mb-6">
				<ShieldCheck
					size={14}
					className="text-indigo-600 dark:text-indigo-400"
				/>
				<span>Authentication and Role Control</span>
			</div>

			{/* Title */}
			<h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white max-w-3xl leading-tight mb-4">
				Role-based access control for React and Express
			</h1>

			{/* Subtitle */}
			<p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl leading-relaxed mb-8">
				Store authentication tokens in HTTP-only cookies, protect user and admin
				routes, and switch between light and dark themes.
			</p>

			{/* CTAs */}
			<div className="flex flex-wrap items-center justify-center gap-3.5 mb-16">
				{!user ? (
					<>
						<Link
							to="/register"
							className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm text-white bg-indigo-600 hover:bg-indigo-500 transition-colors shadow-sm"
						>
							<span>Create an account</span>
							<ArrowRight size={16} />
						</Link>
						<Link
							to="/login"
							className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors shadow-xs"
						>
							<Lock size={16} />
							<span>Log in</span>
						</Link>
					</>
				) : (
					<>
						<Link
							to={user.role === 'ADMIN' ? '/admin' : '/dashboard'}
							className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm text-white bg-indigo-600 hover:bg-indigo-500 transition-colors shadow-sm"
						>
							<span>
								Go to {user.role === 'ADMIN' ? 'Admin dashboard' : 'Dashboard'}
							</span>
							<ArrowRight size={16} />
						</Link>
						<Link
							to="/profile"
							className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors shadow-xs"
						>
							<Users size={16} />
							<span>Profile</span>
						</Link>
					</>
				)}
			</div>

			{/* Role Comparison */}
			<div className="w-full max-w-5xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm overflow-hidden text-left mb-20 transition-colors">
				<div className="px-5 py-3.5 bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
					<span className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300">
						Permission breakdown
					</span>
					<span className="text-xs text-slate-400">
						Public, User, and Admin tiers
					</span>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6 sm:p-8">
					{/* Public */}
					<div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/40 flex flex-col justify-between">
						<div>
							<div className="flex items-center gap-2 text-slate-700 dark:text-slate-300 font-bold text-sm mb-1">
								<Eye size={16} />
								<span>Public</span>
							</div>
							<p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
								Visitors without an account
							</p>
							<ul className="space-y-2 text-xs text-slate-700 dark:text-slate-300">
								<li className="flex items-center gap-2">
									<CheckCircle2
										size={14}
										className="text-emerald-500 shrink-0"
									/>
									<span>View public pages</span>
								</li>
								<li className="flex items-center gap-2">
									<CheckCircle2
										size={14}
										className="text-emerald-500 shrink-0"
									/>
									<span>Register a new account</span>
								</li>
								<li className="flex items-center gap-2">
									<CheckCircle2
										size={14}
										className="text-emerald-500 shrink-0"
									/>
									<span>Log in with existing credentials</span>
								</li>
							</ul>
						</div>
						<div className="mt-4 pt-3 border-t border-slate-200 dark:border-slate-800 text-[11px] font-semibold text-slate-400">
							Access: Open
						</div>
					</div>

					{/* User */}
					<div className="p-5 rounded-xl border border-sky-200 dark:border-sky-900/60 bg-sky-50/40 dark:bg-sky-950/20 flex flex-col justify-between">
						<div>
							<div className="flex items-center gap-2 text-sky-700 dark:text-sky-300 font-bold text-sm mb-1">
								<Users size={16} />
								<span>USER</span>
							</div>
							<p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
								Signed-in members
							</p>
							<ul className="space-y-2 text-xs text-slate-700 dark:text-slate-300">
								<li className="flex items-center gap-2">
									<CheckCircle2
										size={14}
										className="text-emerald-500 shrink-0"
									/>
									<span>View personal dashboard</span>
								</li>
								<li className="flex items-center gap-2">
									<CheckCircle2
										size={14}
										className="text-emerald-500 shrink-0"
									/>
									<span>Edit profile name and email</span>
								</li>
								<li className="flex items-center gap-2">
									<CheckCircle2
										size={14}
										className="text-emerald-500 shrink-0"
									/>
									<span>Update account password</span>
								</li>
							</ul>
						</div>
						<div className="mt-4 pt-3 border-t border-sky-200/80 dark:border-sky-900/40 text-[11px] font-semibold text-sky-700 dark:text-sky-300">
							Access: Authenticated
						</div>
					</div>

					{/* Admin */}
					<div className="p-5 rounded-xl border border-purple-200 dark:border-purple-800 bg-purple-50/40 dark:bg-purple-950/30 flex flex-col justify-between">
						<div>
							<div className="flex items-center gap-2 text-purple-700 dark:text-purple-300 font-bold text-sm mb-1">
								<Shield size={16} />
								<span>ADMIN</span>
							</div>
							<p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
								Administrators
							</p>
							<ul className="space-y-2 text-xs text-slate-700 dark:text-slate-300">
								<li className="flex items-center gap-2">
									<CheckCircle2
										size={14}
										className="text-emerald-500 shrink-0"
									/>
									<span>View total user statistics</span>
								</li>
								<li className="flex items-center gap-2">
									<CheckCircle2
										size={14}
										className="text-emerald-500 shrink-0"
									/>
									<span>Promote or demote user roles</span>
								</li>
								<li className="flex items-center gap-2">
									<CheckCircle2
										size={14}
										className="text-emerald-500 shrink-0"
									/>
									<span>Delete user accounts</span>
								</li>
							</ul>
						</div>
						<div className="mt-4 pt-3 border-t border-purple-200 dark:border-purple-900/40 text-[11px] font-semibold text-purple-700 dark:text-purple-300">
							Access: Role == ADMIN
						</div>
					</div>
				</div>
			</div>

			{/* Feature Grid */}
			<div className="w-full max-w-6xl mb-20 text-left">
				<div className="mb-8">
					<h2 className="text-2xl font-bold text-slate-900 dark:text-white">
						Architecture and features
					</h2>
					<p className="text-sm text-slate-500 dark:text-slate-400">
						Security controls implemented across the frontend and backend.
					</p>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
					<div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
						<div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mb-4">
							<Lock size={20} />
						</div>
						<h3 className="text-sm font-bold text-slate-900 dark:text-white mb-1.5">
							HTTP-only cookies
						</h3>
						<p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
							The browser stores JWT authentication tokens in HTTP-only cookies,
							preventing scripts from reading tokens directly.
						</p>
					</div>

					<div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
						<div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-4">
							<ShieldCheck size={20} />
						</div>
						<h3 className="text-sm font-bold text-slate-900 dark:text-white mb-1.5">
							Route protection
						</h3>
						<p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
							Express middleware verifies tokens and roles on each API request.
							React Router checks login state before rendering pages.
						</p>
					</div>

					<div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
						<div className="w-10 h-10 rounded-xl bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center mb-4">
							<Sliders size={20} />
						</div>
						<h3 className="text-sm font-bold text-slate-900 dark:text-white mb-1.5">
							Theme toggle
						</h3>
						<p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
							Tailwind CSS handles light and dark modes with local storage
							persistence and system preference detection.
						</p>
					</div>

					<div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
						<div className="w-10 h-10 rounded-xl bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 flex items-center justify-center mb-4">
							<KeyRound size={20} />
						</div>
						<h3 className="text-sm font-bold text-slate-900 dark:text-white mb-1.5">
							Password hashing
						</h3>
						<p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
							Bcrypt hashes passwords with random salts before saving them to
							the database.
						</p>
					</div>

					<div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
						<div className="w-10 h-10 rounded-xl bg-sky-50 dark:bg-sky-950/60 text-sky-600 dark:text-sky-400 flex items-center justify-center mb-4">
							<Database size={20} />
						</div>
						<h3 className="text-sm font-bold text-slate-900 dark:text-white mb-1.5">
							User management
						</h3>
						<p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
							Admins can search accounts, change roles between USER and ADMIN,
							and remove users.
						</p>
					</div>

					<div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
						<div className="w-10 h-10 rounded-xl bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 flex items-center justify-center mb-4">
							<Users size={20} />
						</div>
						<h3 className="text-sm font-bold text-slate-900 dark:text-white mb-1.5">
							Profile self-service
						</h3>
						<p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
							Users can view their role, update their name and email, and change
							passwords directly.
						</p>
					</div>
				</div>
			</div>

			{/* CTA Box */}
			<div className="w-full max-w-5xl rounded-2xl p-8 bg-slate-900 text-white dark:bg-slate-800/80 border border-slate-800 dark:border-slate-700 flex flex-col sm:flex-row items-center justify-between gap-6 text-left">
				<div>
					<h2 className="text-xl font-bold mb-1">Test the application</h2>
					<p className="text-xs text-slate-400">
						Sign up with a new account, or log in with the test admin account:{' '}
						<code>admin@example.com</code> / <code>admin123</code>.
					</p>
				</div>
				<div className="shrink-0">
					{!user ? (
						<Link
							to="/login"
							className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-xs bg-indigo-600 hover:bg-indigo-500 text-white transition-colors"
						>
							Sign in to test
						</Link>
					) : (
						<Link
							to="/dashboard"
							className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-xs bg-indigo-600 hover:bg-indigo-500 text-white transition-colors"
						>
							Open dashboard
						</Link>
					)}
				</div>
			</div>
		</div>
	);
}

export default Home;
