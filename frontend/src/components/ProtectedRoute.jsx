import { Navigate, Outlet } from 'react-router';
import { useAuth } from '../context/AuthContext.jsx';
import { Loader2 } from 'lucide-react';

function ProtectedRoute() {
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
            Validating authentication token...
          </p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}

export default ProtectedRoute;
