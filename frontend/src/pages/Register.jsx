import { useState } from 'react';
import { useNavigate, Link } from 'react-router';
import {
	UserPlus,
	User,
	Mail,
	Lock,
	Eye,
	EyeOff,
	ArrowRight,
	AlertCircle,
	Loader2,
	ShieldCheck,
} from 'lucide-react';

function Register() {
	const navigate = useNavigate();

	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [showPassword, setShowPassword] = useState(false);
	const [error, setError] = useState('');
	const [loading, setLoading] = useState(false);

	// Password strength calculation
	const getPasswordStrength = (pwd) => {
		if (!pwd) return { score: 0, label: '', barColor: '' };
		let score = 0;
		if (pwd.length >= 6) score++;
		if (pwd.length >= 10) score++;
		if (/[A-Z]/.test(pwd) && /[a-z]/.test(pwd)) score++;
		if (/\d/.test(pwd) || /[^A-Za-z0-9]/.test(pwd)) score++;

		if (score <= 1)
			return {
				score: 1,
				label: 'Weak',
				barColor: 'bg-rose-500',
				textColor: 'text-rose-500',
			};
		if (score === 2 || score === 3)
			return {
				score: 2,
				label: 'Moderate',
				barColor: 'bg-amber-500',
				textColor: 'text-amber-500',
			};
		return {
			score: 3,
			label: 'Strong',
			barColor: 'bg-emerald-500',
			textColor: 'text-emerald-500',
		};
	};

	const strength = getPasswordStrength(password);

	let link = import.meta.env.VITE_BACKEND_URI;

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (!name.trim() || !email.trim() || !password) {
			setError('Please fill out all required fields.');
			return;
		}

		if (password.length < 6) {
			setError('Password must be at least 6 characters long.');
			return;
		}

		try {
			setError('');
			setLoading(true);

			const res = await fetch(`${link}/api/auth/register`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					name: name.trim(),
					email: email.trim(),
					password,
				}),
			});

			const data = await res.json();

			if (!res.ok) {
				throw new Error(data.message || 'Registration failed');
			}

			navigate('/login?registered=true');
		} catch (err) {
			setError(err.message || 'Registration failed. Please try again.');
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
						<UserPlus size={26} />
					</div>
					<h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
						Create Account
					</h1>
					<p className="text-sm text-slate-500 dark:text-slate-400">
						Get started with a new account. By default, you receive standard
						USER role.
					</p>
				</div>

				{/* Error Alert */}
				{error && (
					<div className="flex items-center gap-2.5 p-3.5 mb-6 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 text-rose-700 dark:text-rose-300 text-sm animate-in fade-in duration-200">
						<AlertCircle size={18} className="shrink-0 text-rose-500" />
						<span className="flex-1 text-xs sm:text-sm">{error}</span>
					</div>
				)}

				{/* Form */}
				<form onSubmit={handleSubmit} className="space-y-4" noValidate>
					<div>
						<label
							htmlFor="reg-name"
							className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5"
						>
							Full Name
						</label>
						<div className="relative flex items-center">
							<User
								size={18}
								className="absolute left-3.5 text-slate-400 pointer-events-none"
							/>
							<input
								id="reg-name"
								type="text"
								placeholder="Jane Doe"
								value={name}
								onChange={(e) => setName(e.target.value)}
								autoComplete="name"
								required
								className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50/70 dark:bg-slate-800/60 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500 text-sm transition-all"
							/>
						</div>
					</div>

					<div>
						<label
							htmlFor="reg-email"
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
								id="reg-email"
								type="email"
								placeholder="jane@example.com"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								autoComplete="email"
								required
								className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50/70 dark:bg-slate-800/60 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500 text-sm transition-all"
							/>
						</div>
					</div>

					<div>
						<label
							htmlFor="reg-password"
							className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5"
						>
							Password
						</label>
						<div className="relative flex items-center">
							<Lock
								size={18}
								className="absolute left-3.5 text-slate-400 pointer-events-none"
							/>
							<input
								id="reg-password"
								type={showPassword ? 'text' : 'password'}
								placeholder="Minimum 6 characters"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								autoComplete="new-password"
								required
								className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50/70 dark:bg-slate-800/60 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500 text-sm transition-all"
							/>
							<button
								type="button"
								className="absolute right-3 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer p-1"
								onClick={() => setShowPassword(!showPassword)}
								aria-label={showPassword ? 'Hide password' : 'Show password'}
							>
								{showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
							</button>
						</div>

						{/* Password strength */}
						{password && (
							<div className="mt-2.5 flex items-center justify-between gap-3">
								<div className="flex gap-1 flex-1">
									<div
										className={`h-1 flex-1 rounded-full ${strength.score >= 1 ? strength.barColor : 'bg-slate-200 dark:bg-slate-700'}`}
									></div>
									<div
										className={`h-1 flex-1 rounded-full ${strength.score >= 2 ? strength.barColor : 'bg-slate-200 dark:bg-slate-700'}`}
									></div>
									<div
										className={`h-1 flex-1 rounded-full ${strength.score >= 3 ? strength.barColor : 'bg-slate-200 dark:bg-slate-700'}`}
									></div>
								</div>
								<span className={`text-[11px] font-bold ${strength.textColor}`}>
									{strength.label}
								</span>
							</div>
						)}
					</div>

					<button
						type="submit"
						disabled={loading}
						className="w-full mt-2 inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-semibold text-sm text-white bg-indigo-600 hover:bg-indigo-500 disabled:opacity-60 shadow-lg shadow-indigo-600/30 transition-all cursor-pointer"
					>
						{loading ? (
							<>
								<Loader2 size={18} className="animate-spin" />
								<span>Creating Account...</span>
							</>
						) : (
							<>
								<span>Complete Registration</span>
								<ArrowRight size={16} />
							</>
						)}
					</button>
				</form>

				{/* Footer */}
				<div className="mt-6 pt-5 border-t border-slate-200 dark:border-slate-800 text-center text-xs text-slate-500 dark:text-slate-400">
					<span>Already have an account? </span>
					<Link
						to="/login"
						className="font-semibold text-indigo-600 dark:text-indigo-400 hover:underline"
					>
						Sign in instead
					</Link>
				</div>

				{/* Security assurance */}
				<div className="mt-4 flex items-center justify-center gap-1.5 text-[11px] text-slate-400">
					<ShieldCheck size={13} />
					<span>Passwords securely salted and hashed with Bcrypt</span>
				</div>
			</div>
		</div>
	);
}

export default Register;
