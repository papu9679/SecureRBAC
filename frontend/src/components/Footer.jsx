import { Shield } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-slate-200 dark:border-slate-800 bg-white/60 dark:bg-slate-900/60 backdrop-blur-md py-6 text-sm text-slate-500 dark:text-slate-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Left */}
        <div className="flex items-center gap-2 font-semibold text-slate-900 dark:text-white">
          <div className="w-6 h-6 rounded-md bg-indigo-600 flex items-center justify-center text-white">
            <Shield size={14} />
          </div>
          <span>SecureRBAC</span>
          <span className="text-slate-300 dark:text-slate-700">&bull;</span>
          <span className="text-xs text-slate-500 font-normal">React and Express role-based access control</span>
        </div>

        {/* Right */}
        <div className="flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400">
          <span>JWT HTTP-only cookies</span>
          <span className="text-slate-300 dark:text-slate-700">&bull;</span>
          <span>&copy; {new Date().getFullYear()}</span>
        </div>
      </div>
    </footer>
  );
}
