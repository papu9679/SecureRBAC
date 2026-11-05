import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export default function ThemeToggle({ className = '' }) {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm text-slate-700 dark:text-slate-300 text-xs font-semibold hover:border-slate-300 dark:hover:border-slate-700 shadow-sm transition-all duration-200 cursor-pointer ${className}`}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      title={`Switch to ${isDark ? 'light' : 'dark'} mode`}
    >
      <span className="w-8 h-4.5 bg-slate-200 dark:bg-slate-700 rounded-full relative transition-colors duration-200 inline-block">
        <span
          className={`w-3.5 h-3.5 bg-white dark:bg-slate-900 rounded-full absolute top-0.5 left-0.5 flex items-center justify-center shadow-xs transition-transform duration-200 ${
            isDark ? 'translate-x-3.5' : 'translate-x-0'
          }`}
        >
          {isDark ? (
            <Moon size={10} className="text-indigo-400" />
          ) : (
            <Sun size={10} className="text-amber-500" />
          )}
        </span>
      </span>
      <span className="min-w-8 text-left">{isDark ? 'Dark' : 'Light'}</span>
    </button>
  );
}
