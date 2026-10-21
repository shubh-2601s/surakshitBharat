import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Home, Activity, AlertTriangle, Bot, LayoutDashboard, User } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const MobileBottomBar: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  // If the user is currently on the full-screen report or assistant flow on small devices, we can keep it clean or keep it visible
  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <nav
      aria-label="Mobile Bottom Navigation"
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-paper/95 dark:bg-ink/95 backdrop-blur-xl border-t border-hairline border-paper-border dark:border-ink-border px-2 py-1 shadow-[0_-4px_20px_rgba(0,0,0,0.1)] transition-colors"
    >
      <div className="flex items-center justify-around max-w-md mx-auto">
        {/* 1. Home */}
        <NavLink
          to="/"
          className={`flex flex-col items-center justify-center py-1.5 px-2 rounded-xl transition-all ${
            isActive('/') && location.pathname === '/'
              ? 'text-saffron font-bold'
              : 'text-neutral-500 dark:text-neutral-400 hover:text-ink dark:hover:text-paper'
          }`}
        >
          <Home className="w-5 h-5" />
          <span className="text-[10px] font-mono mt-0.5">Home</span>
        </NavLink>

        {/* 2. Safety Grid */}
        <NavLink
          to="/safety-grid"
          className={`flex flex-col items-center justify-center py-1.5 px-2 rounded-xl transition-all ${
            isActive('/safety-grid')
              ? 'text-saffron font-bold'
              : 'text-neutral-500 dark:text-neutral-400 hover:text-ink dark:hover:text-paper'
          }`}
        >
          <Activity className="w-5 h-5" />
          <span className="text-[10px] font-mono mt-0.5">Grid</span>
        </NavLink>

        {/* 3. Center Elevated Action: Report Hazard */}
        <NavLink
          to="/report/new"
          aria-label="Report Safety Hazard"
          className="flex flex-col items-center -mt-5 group"
        >
          <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-saffron to-amber-500 text-ink flex items-center justify-center shadow-lg shadow-saffron/40 group-active:scale-95 transition-transform border-2 border-paper dark:border-ink">
            <AlertTriangle className="w-6 h-6 text-ink animate-pulse" />
          </div>
          <span className="text-[9px] font-mono font-bold text-saffron mt-0.5">Report</span>
        </NavLink>

        {/* 4. AI Assistant */}
        <NavLink
          to="/assistant"
          className={`flex flex-col items-center justify-center py-1.5 px-2 rounded-xl transition-all ${
            isActive('/assistant')
              ? 'text-saffron font-bold'
              : 'text-neutral-500 dark:text-neutral-400 hover:text-ink dark:hover:text-paper'
          }`}
        >
          <Bot className="w-5 h-5" />
          <span className="text-[10px] font-mono mt-0.5">Assistant</span>
        </NavLink>

        {/* 5. Dashboard or Sign In */}
        <NavLink
          to={isAuthenticated ? '/dashboard' : '/login'}
          className={`flex flex-col items-center justify-center py-1.5 px-2 rounded-xl transition-all ${
            isActive('/dashboard') || isActive('/login')
              ? 'text-saffron font-bold'
              : 'text-neutral-500 dark:text-neutral-400 hover:text-ink dark:hover:text-paper'
          }`}
        >
          {isAuthenticated ? (
            <LayoutDashboard className="w-5 h-5" />
          ) : (
            <User className="w-5 h-5" />
          )}
          <span className="text-[10px] font-mono mt-0.5">
            {isAuthenticated ? 'Console' : 'Sign In'}
          </span>
        </NavLink>
      </div>
    </nav>
  );
};
