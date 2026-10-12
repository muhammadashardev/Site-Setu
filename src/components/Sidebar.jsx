import React from 'react';
import { NavLink, useLocation, Link } from 'react-router-dom';
import {
  LayoutDashboard,
  Building2,
  CalendarDays,
  CheckSquare,
  HardHat,
  FileCheck2,
  DollarSign,
  ShieldCheck,
  Bot,
  ShieldAlert,
  Users,
  ChevronLeft,
  ChevronRight,
  Layers,
  Sparkles,
  X,
  CreditCard,
  Server,
  FileText,
  Lock,
  ArrowLeft,
  ArrowRight
} from 'lucide-react';

export default function Sidebar({ collapsed, setCollapsed, mobileOpen, setMobileOpen }) {
  const location = useLocation();
  const isSuperAdmin = location.pathname.startsWith('/super-admin');

  // Company Operations Sidebar Menu
  const companyNav = [
    {
      group: "Operations",
      items: [
        { path: "/", label: "Dashboard", icon: LayoutDashboard },
        { path: "/projects", label: "Projects", icon: Building2 },
        { path: "/tasks", label: "Tasks & Workflows", icon: CheckSquare },
        { path: "/schedule", label: "Schedule & Gantt", icon: CalendarDays },
      ]
    },
    {
      group: "Site & Quality",
      items: [
        { path: "/field-ops", label: "Field Operations", icon: HardHat },
        { path: "/rfis-approvals", label: "RFIs & Approvals", icon: FileCheck2 },
        { path: "/safety", label: "Safety & Compliance", icon: ShieldCheck },
      ]
    },
    {
      group: "Commercial",
      items: [
        { path: "/finance", label: "Cost & Budget", icon: DollarSign },
      ]
    },
    {
      group: "Platform & Portals",
      items: [
        { path: "/client-portal", label: "Client Portal", icon: Users, badge: "External" },
        { path: "/super-admin", label: "Super Admin", icon: ShieldAlert, badge: "Admin", badgeColor: "bg-amber-100 text-amber-800" },
        { path: "/ai-assistant", label: "AI Copilot", icon: Bot, badge: "v2.4", badgeColor: "bg-blue-100 text-blue-800" },
      ]
    }
  ];

  // Super Admin Sidebar Menu
  const superAdminNav = [
    {
      group: "Platform Control",
      items: [
        { path: "/super-admin", label: "Platform Overview", icon: LayoutDashboard },
        { path: "/super-admin/tenants", label: "Tenant Companies", icon: Building2, badge: "48 orgs" },
      ]
    },
    {
      group: "Commercial & MRR",
      items: [
        { path: "/super-admin/subscriptions", label: "Subscriptions & Plans", icon: CreditCard, badge: "$184k" },
      ]
    },
    {
      group: "Infrastructure & Security",
      items: [
        { path: "/super-admin/system-health", label: "Cluster Nodes & Health", icon: Server, badge: "99.98%" },
        { path: "/super-admin/audit-logs", label: "Security Audit Logs", icon: ShieldCheck },
      ]
    }
  ];

  const currentNav = isSuperAdmin ? superAdminNav : companyNav;

  return (
    <>
      {/* Mobile Backdrop */}
      {mobileOpen && (
        <div
          onClick={() => setMobileOpen(false)}
          className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs z-40 md:hidden animate-in fade-in duration-200"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-40 bg-white border-r border-slate-200/90 flex flex-col transition-all duration-300 ease-in-out ${
          collapsed ? 'w-20' : 'w-64'
        } ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        {/* Brand Header */}
        <div className="h-[68px] px-4 flex items-center justify-between border-b border-slate-100 shrink-0">
          <div className="flex items-center gap-3 overflow-hidden">
            <div className={`w-10 h-10 rounded-2xl flex items-center justify-center text-white shadow-md shrink-0 ${
              isSuperAdmin ? 'bg-slate-900 shadow-slate-900/30' : 'bg-gradient-to-tr from-blue-700 to-blue-500 shadow-blue-500/20'
            }`}>
              {isSuperAdmin ? <ShieldAlert className="w-5 h-5 text-amber-400" /> : <Layers className="w-5 h-5" />}
            </div>
            {!collapsed && (
              <div className="flex flex-col">
                <span className="font-extrabold text-xl tracking-tight text-[#172B4D] flex items-center gap-1.5">
                  SiteSetu
                  <span className={`text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded border ${
                    isSuperAdmin
                      ? 'bg-amber-50 text-amber-800 border-amber-200'
                      : 'bg-blue-50 text-blue-700 border border-blue-200'
                  }`}>
                    {isSuperAdmin ? 'Admin' : 'SaaS'}
                  </span>
                </span>
                <span className="text-[11px] text-slate-400 font-medium leading-none">
                  {isSuperAdmin ? 'Platform Management' : 'Construction OS'}
                </span>
              </div>
            )}
          </div>

          {/* Desktop Collapse Toggle */}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-xl transition-colors hidden md:flex items-center justify-center"
            title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>

          {/* Mobile Close Button */}
          <button
            onClick={() => setMobileOpen(false)}
            className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-xl md:hidden"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Super Admin Switcher Notice */}
        {isSuperAdmin && !collapsed && (
          <div className="p-3 mx-3 mt-3 bg-amber-50 border border-amber-200/80 rounded-2xl flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <Lock className="w-4 h-4 text-amber-600" />
              <span className="font-bold text-amber-900">Admin Mode</span>
            </div>
            <Link
              to="/"
              className="text-[11px] font-extrabold text-blue-700 hover:text-blue-800 flex items-center gap-0.5"
            >
              Exit <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        )}

        {/* Nav List */}
        <div className="flex-1 overflow-y-auto px-3 py-4 space-y-6">
          {currentNav.map((section, idx) => (
            <div key={idx}>
              {!collapsed && (
                <h3 className="px-3 text-[11px] font-extrabold uppercase tracking-wider text-slate-400 mb-2">
                  {section.group}
                </h3>
              )}
              <div className="space-y-1">
                {section.items.map((item) => {
                  const Icon = item.icon;
                  // Exact match for dashboard roots, prefix match for others
                  const isActive =
                    item.path === '/' || item.path === '/super-admin'
                      ? location.pathname === item.path
                      : location.pathname.startsWith(item.path);

                  return (
                    <NavLink
                      key={item.path}
                      to={item.path}
                      onClick={() => setMobileOpen(false)}
                      className={`flex items-center gap-3 px-3 py-2.5 rounded-2xl font-bold text-xs transition-all duration-200 relative group ${
                        isActive
                          ? isSuperAdmin
                            ? 'bg-slate-900 text-white shadow-sm'
                            : 'bg-blue-600 text-white shadow-sm shadow-blue-500/25'
                          : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80'
                      }`}
                    >
                      <Icon className={`w-4 h-4 shrink-0 transition-transform group-hover:scale-105 ${
                        isActive
                          ? 'text-white'
                          : isSuperAdmin
                          ? 'text-slate-500 group-hover:text-amber-600'
                          : 'text-slate-500 group-hover:text-blue-600'
                      }`} />
                      
                      {!collapsed && (
                        <span className="truncate flex-1">{item.label}</span>
                      )}

                      {!collapsed && item.badge && (
                        <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full ${
                          isActive
                            ? 'bg-white/20 text-white'
                            : item.badgeColor || 'bg-slate-100 text-slate-600'
                        }`}>
                          {item.badge}
                        </span>
                      )}

                      {collapsed && (
                        <div className="absolute left-full ml-3 px-2.5 py-1.5 bg-slate-900 text-white text-xs rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity shadow-lg z-50">
                          {item.label}
                        </div>
                      )}
                    </NavLink>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Footer Card */}
        {!collapsed && (
          <div className="p-3.5 m-3 bg-gradient-to-br from-slate-900 to-[#172B4D] rounded-3xl text-white shadow-md shrink-0">
            {isSuperAdmin ? (
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[11px] font-extrabold text-amber-400 flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5" /> SiteSetu Master
                  </span>
                  <span className="text-[10px] text-emerald-400 font-bold">Live Cluster</span>
                </div>
                <div className="text-xs font-bold text-slate-200">
                  48 Tenants Isolated
                </div>
                <div className="text-[10px] text-slate-400 mt-1">
                  Database & API healthy • 42ms
                </div>
                <Link
                  to="/"
                  className="mt-2.5 w-full py-1.5 bg-white/10 hover:bg-white/20 rounded-xl text-center text-[11px] font-bold text-white block transition"
                >
                  ← Go to Company Operations
                </Link>
              </div>
            ) : (
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-extrabold text-amber-400 flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5" /> Pro Enterprise
                  </span>
                  <span className="text-[10px] text-slate-300 font-semibold">Skyline PRJ-1001</span>
                </div>
                <div className="text-xs font-bold text-slate-100 mb-1.5">
                  Site Health: 98% Optimal
                </div>
                <div className="w-full bg-slate-700/80 h-1.5 rounded-full overflow-hidden mb-2">
                  <div className="bg-amber-400 h-full rounded-full w-[62%]"></div>
                </div>
                <div className="flex justify-between items-center text-[10px] text-slate-300 font-medium">
                  <span>62% Finished</span>
                  <span className="text-emerald-400 font-bold">+5d ahead</span>
                </div>
              </div>
            )}
          </div>
        )}
      </aside>
    </>
  );
}
