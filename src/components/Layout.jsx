import { useState } from 'react';
import { motion } from 'framer-motion';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Receipt, Users, Coffee, Settings, LogOut, Search, Bell } from 'lucide-react';

export default function Layout() {
  const navigate = useNavigate();

  const navItems = [
    { path: '/app/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/app/sales', label: 'Sales Tracking', icon: Receipt },
    { path: '/app/staff', label: 'Staff Performance', icon: Users },
    { path: '/app/menu', label: 'Menu & Products', icon: Coffee },
  ];

  return (
    <div className="flex h-screen w-full bg-background overflow-hidden relative">
      {/* Sidebar */}
      <motion.aside 
        initial={{ x: -280 }}
        animate={{ x: 0 }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className="w-64 glass-panel border-r border-white/5 flex flex-col z-20 flex-shrink-0 shadow-xl"
      >
        <div className="p-6 flex items-center space-x-3 mb-6">
          <div className="w-8 h-8 rounded-lg bg-accent1 flex items-center justify-center text-background font-bold shadow-[0_0_12px_rgba(200,178,125,0.4)]">
            N
          </div>
          <h1 className="text-xl font-bold tracking-tight">Nova <span className="text-accent1">POS</span></h1>
        </div>

        <nav className="flex-1 px-4 space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => `
                relative flex items-center px-4 py-3 rounded-xl transition-colors duration-200 text-sm font-medium
                ${isActive ? 'text-primary' : 'text-secondary hover:text-primary hover:bg-white/5'}
              `}
            >
              {({ isActive }) => (
                <>
                  {isActive && (
                    <motion.div
                      layoutId="activeNavIndicator"
                      className="absolute inset-0 bg-surface rounded-xl border border-white/5 shadow-sm"
                      initial={false}
                      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    />
                  )}
                  <item.icon size={18} className="mr-3 relative z-10" />
                  <span className="relative z-10">{item.label}</span>
                </>
              )}
            </NavLink>
          ))}
        </nav>

        <div className="p-4 border-t border-white/5">
          <button 
            className="w-full flex items-center px-4 py-3 text-sm font-medium text-secondary hover:text-primary transition-colors rounded-xl hover:bg-white/5"
            onClick={() => navigate('/login')}
          >
            <LogOut size={18} className="mr-3" />
            Sign Out
          </button>
        </div>
      </motion.aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col h-full overflow-hidden relative z-10">
        {/* Top Header */}
        <header className="h-20 flex items-center justify-between px-8 bg-background/80 backdrop-blur-md border-b border-white/5 flex-shrink-0 z-20">
          <div className="flex items-center bg-surface/50 border border-white/5 rounded-full px-4 py-2 w-64 focus-within:w-80 transition-all duration-300">
            <Search size={16} className="text-secondary mr-2" />
            <input 
              type="text" 
              placeholder="Search orders, items..."
              className="bg-transparent border-none outline-none text-sm w-full text-primary placeholder:text-secondary"
            />
          </div>

          <div className="flex items-center space-x-6">
            <button className="relative text-secondary hover:text-primary transition-colors">
              <Bell size={20} />
              <span className="absolute top-0 right-0 w-2 h-2 rounded-full bg-accent1"></span>
            </button>
            <div className="flex items-center space-x-3 border-l border-white/10 pl-6 cursor-pointer">
              <div className="text-right hidden md:block">
                <p className="text-sm font-medium">Javier</p>
                <p className="text-xs text-secondary">Owner</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-accent2 text-white flex items-center justify-center font-bold shadow-md hover-lift">
                J
              </div>
            </div>
          </div>
        </header>

        {/* Page Content Area */}
        <main className="flex-1 overflow-y-auto overflow-x-hidden p-8 scroll-smooth">
          {/* Framer Motion Outlet Wrapper for Page Transitions */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-7xl mx-auto h-full"
          >
            <Outlet />
          </motion.div>
        </main>
      </div>
    </div>
  );
}
