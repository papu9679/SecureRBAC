import { useState } from 'react';
import { NavLink, Link, useNavigate } from 'react-router';
import { useAuth } from '../context/AuthContext.jsx';
import ThemeToggle from './ThemeToggle.jsx';
import {
  Shield,
  LayoutDashboard,
  User,
  Users,
  LogOut,
  LogIn,
  UserPlus,
  ShieldCheck,
  Menu,
  X,
  Home as HomeIcon,
} from 'lucide-react';

function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    setMobileMenuOpen(false);
    navigate('/login');
  };

  const closeMobileMenu = () => setMobileMenuOpen(false);

  const getInitials = (name) => {
    if (!name) return 'U';
    const parts = name.trim().split(' ');
    if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase();
    return name.slice(0, 2).toUpperCase();
  };

  const navLinkClass = ({ isActive }) =>
    `inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-150 ${
      isActive
        ? 'text-indigo-600 dark:text-indigo-400 bg-indigo-50/80 dark:bg-indigo-950/50 font-semibold'
        : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/70'
    }`;

  const adminNavLinkClass = ({ isActive }) =>
    `inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-150 ${
      isActive
        ? 'text-purple-600 dark:text-purple-400 bg-purple-50/80 dark:bg-purple-950/50 font-semibold'
        : 'text-purple-700/80 dark:text-purple-300/80 hover:text-purple-900 dark:hover:text-purple-200 hover:bg-purple-50/50 dark:hover:bg-purple-950/30'
    }`;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200/80 dark:border-slate-800/80 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Brand */}
        <Link to="/" onClick={closeMobileMenu} className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white">
            <Shield size={18} />
          </div>
          <span className="font-bold text-lg tracking-tight text-slate-900 dark:text-white">
            Secure<span className="text-indigo-600 dark:text-indigo-400">RBAC</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1">
          <NavLink to="/" end className={navLinkClass}>
            <HomeIcon size={16} />
            <span>Home</span>
          </NavLink>

          {user && (
            <>
              <NavLink to="/dashboard" className={navLinkClass}>
                <LayoutDashboard size={16} />
                <span>Dashboard</span>
              </NavLink>

              <NavLink to="/profile" className={navLinkClass}>
                <User size={16} />
                <span>Profile</span>
              </NavLink>

              {user.role === 'ADMIN' && (
                <>
                  <NavLink to="/admin" end className={adminNavLinkClass}>
                    <ShieldCheck size={16} />
                    <span>Admin</span>
                  </NavLink>

                  <NavLink to="/admin/users" className={adminNavLinkClass}>
                    <Users size={16} />
                    <span>Users</span>
                  </NavLink>
                </>
              )}
            </>
          )}
        </nav>

        {/* Right Section */}
        <div className="flex items-center gap-3">
          <ThemeToggle />

          {!user ? (
            <div className="hidden sm:flex items-center gap-2">
              <Link
                to="/login"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                <LogIn size={15} />
                <span>Log in</span>
              </Link>
              <Link
                to="/register"
                className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-500 transition-colors"
              >
                <UserPlus size={15} />
                <span>Register</span>
              </Link>
            </div>
          ) : (
            <div className="flex items-center gap-2.5">
              <div className="flex items-center gap-2 pl-2 pr-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white ${
                    user.role === 'ADMIN' ? 'bg-purple-600' : 'bg-indigo-600'
                  }`}
                >
                  {getInitials(user.name)}
                </div>
                <div className="hidden lg:flex flex-col">
                  <span className="text-xs font-semibold text-slate-900 dark:text-white max-w-[100px] truncate">
                    {user.name}
                  </span>
                  <span
                    className={`text-[10px] font-bold uppercase tracking-wider ${
                      user.role === 'ADMIN'
                        ? 'text-purple-600 dark:text-purple-400'
                        : 'text-indigo-600 dark:text-indigo-400'
                    }`}
                  >
                    {user.role}
                  </span>
                </div>
              </div>

              <button
                onClick={handleLogout}
                className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 border border-rose-200 dark:border-rose-900/50 transition-colors cursor-pointer"
                title="Log out"
              >
                <LogOut size={14} />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </div>
          )}

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
            aria-label="Toggle navigation"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-4 pt-2 pb-6 space-y-2 shadow-lg">
          <NavLink
            to="/"
            end
            onClick={closeMobileMenu}
            className="flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <HomeIcon size={18} />
            <span>Home</span>
          </NavLink>

          {user && (
            <>
              <NavLink
                to="/dashboard"
                onClick={closeMobileMenu}
                className="flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                <LayoutDashboard size={18} />
                <span>Dashboard</span>
              </NavLink>

              <NavLink
                to="/profile"
                onClick={closeMobileMenu}
                className="flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                <User size={18} />
                <span>Profile</span>
              </NavLink>

              {user.role === 'ADMIN' && (
                <>
                  <div className="pt-2 pb-1 px-3 text-[11px] font-bold uppercase tracking-wider text-purple-600 dark:text-purple-400">
                    Admin
                  </div>
                  <NavLink
                    to="/admin"
                    end
                    onClick={closeMobileMenu}
                    className="flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-medium text-purple-700 dark:text-purple-300 hover:bg-purple-50 dark:hover:bg-purple-950/40"
                  >
                    <ShieldCheck size={18} />
                    <span>Admin overview</span>
                  </NavLink>
                  <NavLink
                    to="/admin/users"
                    onClick={closeMobileMenu}
                    className="flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-medium text-purple-700 dark:text-purple-300 hover:bg-purple-50 dark:hover:bg-purple-950/40"
                  >
                    <Users size={18} />
                    <span>Manage users</span>
                  </NavLink>
                </>
              )}
            </>
          )}

          {!user && (
            <div className="pt-3 flex flex-col gap-2">
              <Link
                to="/login"
                onClick={closeMobileMenu}
                className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                <LogIn size={16} />
                <span>Log in</span>
              </Link>
              <Link
                to="/register"
                onClick={closeMobileMenu}
                className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold bg-indigo-600 hover:bg-indigo-500 text-white"
              >
                <UserPlus size={16} />
                <span>Register</span>
              </Link>
            </div>
          )}
        </div>
      )}
    </header>
  );
}

export default Navbar;
