import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import {
  Search,
  Calendar,
  Building,
  Bell,
  ChevronDown,
  Sparkles,
  ShieldAlert,
  Users,
  LayoutDashboard,
  Check,
  Shield,
  LogIn,
  Menu
} from 'lucide-react';
import { currentUser, allProjects, activeProject } from '../data/mockData';

export default function Navbar({
  onOpenAI,
  onOpenNotifications,
  onOpenSearch,
  selectedProject,
  setSelectedProject,
  onToggleMobile
}) {
  const navigate = useNavigate();
  const location = useLocation();
  const [projectDropdownOpen, setProjectDropdownOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const isSuperAdmin = location.pathname.startsWith('/super-admin');
  const isClientPortal = location.pathname.startsWith('/client-portal');
  const isCompany = !isSuperAdmin && !isClientPortal;

  return (
    <header className="sticky top-0 z-30 w-full h-[68px] bg-white/95 backdrop-blur-md border-b border-slate-200/80 px-4 md:px-8 flex items-center justify-between shadow-xs">
      {/* Left: Mobile hamburger + Project Selector & Breadcrumb */}
      <div className="flex items-center gap-3">
        {/* Mobile Hamburger Menu */}
        <button
          onClick={onToggleMobile}
          className="p-2 rounded-xl text-slate-500 hover:text-slate-800 hover:bg-slate-100 md:hidden"
          title="Open Menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Project Selector Dropdown */}
        <div className="relative">
          <button
            onClick={() => setProjectDropdownOpen(!projectDropdownOpen)}
            className="flex items-center gap-2.5 px-3 py-1.5 bg-slate-50 hover:bg-slate-100/90 border border-slate-200/90 rounded-2xl transition text-left group shadow-xs"
          >
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-blue-600 to-blue-500 text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-xs">
              <Building className="w-4 h-4" />
            </div>
            <div className="hidden sm:block">
              <div className="text-xs font-extrabold text-slate-900 leading-tight flex items-center gap-1">
                <span className="truncate max-w-[140px] lg:max-w-[200px]">
                  {selectedProject?.name || activeProject.name}
                </span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400 group-hover:text-slate-700 transition shrink-0" />
              </div>
              <div className="text-[10px] text-slate-500 font-semibold flex items-center gap-1 mt-0.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                <span>{selectedProject?.id || activeProject.code}</span>
                <span>•</span>
                <span>{selectedProject?.location?.split(',')[0] || "Pune"}</span>
              </div>
            </div>
          </button>

          {/* Project Dropdown Menu */}
          {projectDropdownOpen && (
            <div className="absolute top-full left-0 mt-2 w-80 bg-white rounded-2xl shadow-xl border border-slate-150 p-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
              <div className="px-3 py-2 text-[11px] font-bold uppercase tracking-wider text-slate-400 border-b border-slate-100 flex justify-between items-center">
                <span>Select Project</span>
                <span className="text-[10px] bg-slate-100 px-1.5 py-0.5 rounded text-slate-600 font-bold">{allProjects.length} Active</span>
              </div>
              <div className="max-h-72 overflow-y-auto py-1 space-y-1">
                {allProjects.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => {
                      setSelectedProject(p);
                      setProjectDropdownOpen(false);
                    }}
                    className={`w-full flex items-center justify-between p-2.5 rounded-xl text-left text-xs transition ${
                      selectedProject?.id === p.id
                        ? 'bg-blue-50 text-blue-700 font-bold border border-blue-200/60'
                        : 'hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    <div>
                      <div className="font-bold text-slate-900">{p.name}</div>
                      <div className="text-[11px] text-slate-500 font-medium">{p.id} • {p.category}</div>
                    </div>
                    {selectedProject?.id === p.id && (
                      <Check className="w-4 h-4 text-blue-600 shrink-0" />
                    )}
                  </button>
                ))}
              </div>
              <div className="p-2 border-t border-slate-100">
                <button
                  onClick={() => {
                    setProjectDropdownOpen(false);
                    navigate('/projects');
                  }}
                  className="w-full text-center py-2 text-xs font-bold text-blue-600 hover:text-blue-700 bg-blue-50/50 hover:bg-blue-50 rounded-xl transition"
                >
                  Manage All Projects Directory →
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Date Range Badge */}
        <div className="hidden 2xl:flex items-center gap-2 px-3 py-1.5 bg-slate-50 border border-slate-200/80 rounded-2xl text-xs font-semibold text-slate-600 shadow-xs">
          <Calendar className="w-3.5 h-3.5 text-blue-600" />
          <span>May 19 – May 25, 2025</span>
        </div>
      </div>

      {/* Middle: 3 Quick Portals Switcher */}
      <div className="hidden lg:flex items-center bg-slate-100/90 p-1 rounded-2xl border border-slate-200/70 text-xs font-bold shadow-inner">
        <button
          onClick={() => navigate('/')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl transition ${
            isCompany
              ? 'bg-white text-blue-700 shadow-xs font-extrabold'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <LayoutDashboard className="w-3.5 h-3.5 text-blue-600" />
          Company Ops
        </button>
        <button
          onClick={() => navigate('/super-admin')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl transition ${
            isSuperAdmin
              ? 'bg-slate-900 text-white shadow-xs font-extrabold'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <ShieldAlert className="w-3.5 h-3.5 text-amber-500" />
          Super Admin
        </button>
        <button
          onClick={() => navigate('/client-portal')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl transition ${
            isClientPortal
              ? 'bg-emerald-600 text-white shadow-xs font-extrabold'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Users className="w-3.5 h-3.5 text-white" />
          Client Portal
        </button>
      </div>

      {/* Right: Search, AI button, Notifications, Profile, Role Switcher */}
      <div className="flex items-center gap-2 sm:gap-2.5">
        {/* Search */}
        <button
          onClick={onOpenSearch}
          className="flex items-center gap-2 px-3 py-1.5 bg-slate-50 hover:bg-slate-100 border border-slate-200/90 rounded-2xl text-xs text-slate-500 transition shadow-xs group"
        >
          <Search className="w-3.5 h-3.5 text-slate-400 group-hover:text-slate-600" />
          <span className="hidden sm:inline">Search...</span>
          <kbd className="hidden md:inline-block px-1.5 py-0.5 text-[10px] font-semibold bg-white border border-slate-200 rounded text-slate-400">
            ⌘K
          </kbd>
        </button>

        {/* AI Assistant */}
        <button
          onClick={onOpenAI}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white rounded-2xl text-xs font-extrabold shadow-sm shadow-amber-500/20 transition transform active:scale-95"
          title="Open Construction AI Copilot"
        >
          <Sparkles className="w-3.5 h-3.5 animate-pulse" />
          <span className="hidden sm:inline">AI Copilot</span>
        </button>

        {/* Notifications */}
        <button
          onClick={onOpenNotifications}
          className="relative p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-2xl transition border border-transparent hover:border-slate-200"
          title="Notifications"
        >
          <Bell className="w-4 h-4" />
          <span className="absolute top-1 right-1 w-4 h-4 bg-rose-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center ring-2 ring-white">
            7
          </span>
        </button>

        {/* Quick Role Switcher Button */}
        <Link
          to="/login"
          className="hidden md:flex items-center gap-1 px-3 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200/80 rounded-2xl text-xs font-bold transition"
          title="Change Active Demo Role"
        >
          <LogIn className="w-3.5 h-3.5" />
          <span>Switch Role</span>
        </Link>

        {/* User Profile */}
        <div className="relative">
          <button
            onClick={() => setUserMenuOpen(!userMenuOpen)}
            className="flex items-center gap-2 pl-1.5 pr-1 py-1 hover:bg-slate-100 rounded-2xl transition"
          >
            <div className="relative">
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                className="w-8 h-8 rounded-full object-cover ring-2 ring-blue-500/30"
              />
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 border-2 border-white rounded-full"></span>
            </div>
            <div className="hidden xl:block text-left">
              <div className="text-xs font-bold text-slate-900 leading-tight">
                {currentUser.name}
              </div>
              <div className="text-[10px] text-slate-500 font-semibold">
                {currentUser.role}
              </div>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
          </button>

          {/* User Menu */}
          {userMenuOpen && (
            <div className="absolute top-full right-0 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-slate-150 p-2 z-50">
              <div className="p-3 border-b border-slate-100">
                <p className="text-xs font-extrabold text-slate-900">{currentUser.name}</p>
                <p className="text-[11px] text-slate-500">{currentUser.email}</p>
                <div className="mt-2 inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 text-[10px] font-bold">
                  <Shield className="w-3 h-3" /> {currentUser.company}
                </div>
              </div>
              <div className="py-1">
                <button
                  onClick={() => {
                    navigate('/super-admin');
                    setUserMenuOpen(false);
                  }}
                  className="w-full flex items-center gap-2 px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 rounded-xl"
                >
                  <ShieldAlert className="w-4 h-4 text-amber-500" /> Switch to Super Admin
                </button>
                <button
                  onClick={() => {
                    navigate('/client-portal');
                    setUserMenuOpen(false);
                  }}
                  className="w-full flex items-center gap-2 px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 rounded-xl"
                >
                  <Users className="w-4 h-4 text-emerald-500" /> Switch to Client Portal
                </button>
                <button
                  onClick={() => {
                    navigate('/login');
                    setUserMenuOpen(false);
                  }}
                  className="w-full flex items-center gap-2 px-3 py-2 text-xs font-semibold text-blue-700 hover:bg-blue-50 rounded-xl"
                >
                  <LogIn className="w-4 h-4" /> Role Selection Screen
                </button>
              </div>
              <div className="pt-1 border-t border-slate-100">
                <button
                  onClick={() => {
                    navigate('/login');
                    setUserMenuOpen(false);
                  }}
                  className="w-full text-left px-3 py-2 text-xs font-bold text-rose-600 hover:bg-rose-50 rounded-xl"
                >
                  Sign Out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
