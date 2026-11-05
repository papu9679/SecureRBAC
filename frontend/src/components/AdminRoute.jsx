import { Navigate, Outlet, Link } from 'react-router';
import { useAuth } from '../context/AuthContext.jsx';
import { ShieldAlert, Loader2, ArrowLeft } from 'lucide-react';

function AdminRoute() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center p-8 min-h-[60vh]">
        <div className="w-full max-w-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-8 text-center shadow-sm flex flex-col items-center">
          <Loader2 size={32} className="text-indigo-600 dark:text-indigo-400 animate-spin mb-3" />
          <h3 className="text-base font-bold text-slate-900 dark:text-white mb-1">
            Checking session
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Verifying your admin permissions...
          </p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (user.role !== 'ADMIN') {
    return (
      <div className="flex-1 flex items-center justify-center p-8 min-h-[60vh]">
        <div className="w-full max-w-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-8 text-center shadow-sm flex flex-col items-center">
          <div className="w-12 h-12 rounded-full bg-rose-100 dark:bg-rose-950/50 text-rose-600 dark:text-rose-400 flex items-center justify-center mb-4">
            <ShieldAlert size={28} />
          </div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
            Access restricted
          </h2>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
            You need an admin account to view this page. Your account role is <span className="font-semibold text-slate-800 dark:text-slate-200">{user.role}</span>.
          </p>
          <Link
            to="/dashboard"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl font-semibold text-xs text-white bg-indigo-600 hover:bg-indigo-500 transition-colors"
          >
            <ArrowLeft size={14} />
            <span>Back to dashboard</span>
          </Link>
        </div>
      </div>
    );
  }

  return <Outlet />;
}

export default AdminRoute;
