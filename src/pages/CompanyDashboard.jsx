import React, { useState } from 'react';
import { useOutletContext, Link } from 'react-router-dom';
import {
  CalendarCheck,
  FileCheck2,
  Activity,
  AlertTriangle,
  ClipboardCheck,
  Receipt,
  Boxes,
  Truck,
  UserCheck,
  ShieldAlert,
  ArrowUpRight,
  ChevronRight,
  TrendingUp,
  MapPin,
  Clock,
  Sparkles,
  CheckCircle2,
  ChevronDown,
  Building,
  Check,
  ShieldCheck,
  HardHat,
  Filter
} from 'lucide-react';
import {
  currentUser,
  activeProject,
  weeklyProjectPulse,
  upcomingDeadlines,
  recentActivities,
  dailySiteLogs
} from '../data/mockData';

export default function CompanyDashboard() {
  const { openCreateTask, openQuickAction, openAI } = useOutletContext();
  const [pulseFilter, setPulseFilter] = useState('This Week');
  const [hoveredBar, setHoveredBar] = useState(null);

  const kpis = [
    {
      title: "Tasks Due Today",
      value: "18",
      sub: "24% of weekly tasks",
      icon: CalendarCheck,
      color: "bg-blue-50 text-blue-600",
      indicatorColor: "bg-blue-600",
      borderAccent: "border-blue-500",
      trend: "+3 from yesterday",
      trendPositive: true,
    },
    {
      title: "Pending Approvals",
      value: "12",
      sub: "Requires your action",
      icon: FileCheck2,
      color: "bg-amber-50 text-amber-600",
      indicatorColor: "bg-amber-500",
      borderAccent: "border-amber-500",
      trend: "4 Urgent / Critical",
      trendPositive: false,
    },
    {
      title: "Recent Activity",
      value: "32",
      sub: "Updates this week",
      icon: Activity,
      color: "bg-emerald-50 text-emerald-600",
      indicatorColor: "bg-emerald-500",
      borderAccent: "border-emerald-500",
      trend: "+14% vs last week",
      trendPositive: true,
    },
    {
      title: "Open Issues",
      value: "7",
      sub: "Need attention",
      icon: AlertTriangle,
      color: "bg-rose-50 text-rose-600",
      indicatorColor: "bg-rose-500",
      borderAccent: "border-rose-500",
      trend: "2 Safety Hazards",
      trendPositive: false,
    },
  ];

  const quickActions = [
    { id: 'task', title: 'Create Task', desc: 'Assign and track tasks', icon: ClipboardCheck, color: 'bg-blue-50 text-blue-600', action: openCreateTask },
    { id: 'expense', title: 'Log Expense', desc: 'Record project expense', icon: Receipt, color: 'bg-emerald-50 text-emerald-600', action: () => openQuickAction('log-expense') },
    { id: 'inventory', title: 'Add Inventory', desc: 'Add materials to site', icon: Boxes, color: 'bg-purple-50 text-purple-600', action: () => openQuickAction('add-inventory') },
    { id: 'equipment', title: 'Add Equipment', desc: 'Register site equipment', icon: Truck, color: 'bg-amber-50 text-amber-600', action: () => openQuickAction('add-equipment') },
    { id: 'approvals', title: 'Approvals', desc: 'Review approvals', icon: UserCheck, color: 'bg-cyan-50 text-cyan-600', action: () => openQuickAction('approvals') },
    { id: 'safety', title: 'Safety', desc: 'Log safety observation', icon: ShieldAlert, color: 'bg-rose-50 text-rose-600', action: () => openQuickAction('safety') },
  ];

  return (
    <div className="space-y-7">
      {/* Welcome Banner */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 bg-white p-6 md:p-7 rounded-3xl border border-slate-200/80 shadow-xs">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold border border-blue-200 mb-2">
            <Building className="w-3.5 h-3.5" /> Project Workspace: {activeProject.name} ({activeProject.code})
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-[#172B4D] tracking-tight">
            Welcome back, {currentUser.name}
          </h1>
          <p className="text-sm text-slate-500 mt-1 font-medium">
            Here's what's happening across your construction projects and active job sites today.
          </p>
        </div>

        {/* Quick Shortcut Buttons */}
        <div className="flex items-center gap-3">
          <button
            onClick={openAI}
            className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white rounded-2xl text-xs font-bold shadow-md shadow-amber-500/20 transition transform active:scale-95"
          >
            <Sparkles className="w-4 h-4 animate-pulse" />
            AI Project Insights
          </button>
          <button
            onClick={openCreateTask}
            className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl text-xs font-bold shadow-md shadow-blue-500/20 transition transform active:scale-95"
          >
            <ClipboardCheck className="w-4 h-4" />
            + Create Task
          </button>
        </div>
      </div>

      {/* Row 1: 4 Wide, Prominent KPI Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {kpis.map((kpi, idx) => {
          const Icon = kpi.icon;
          return (
            <div
              key={idx}
              className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs flex flex-col justify-between hover:shadow-md transition-all duration-200"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  {kpi.title}
                </span>
                <div className={`w-11 h-11 rounded-2xl flex items-center justify-center ${kpi.color}`}>
                  <Icon className="w-5 h-5" />
                </div>
              </div>

              <div className="my-4">
                <div className="text-3xl font-extrabold text-slate-900 tracking-tight">
                  {kpi.value}
                </div>
                <div className="text-xs font-bold text-slate-600 mt-1">
                  {kpi.sub}
                </div>
              </div>

              {/* Bottom trend & accent line */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <span className={`text-[11px] font-bold ${
                  kpi.trendPositive ? 'text-emerald-600' : 'text-amber-600'
                }`}>
                  {kpi.trend}
                </span>
                <div className="w-16 bg-slate-100 h-1.5 rounded-full overflow-hidden">
                  <div className={`h-full rounded-full w-3/4 ${kpi.indicatorColor}`}></div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Row 2: Weekly Pulse Chart (Wide) + Project Progress (Wide) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Weekly Project Pulse Chart */}
        <div className="lg:col-span-7 bg-white p-6 md:p-7 rounded-3xl border border-slate-200/80 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-base font-extrabold text-slate-900">Weekly Project Pulse</h2>
              <p className="text-xs text-slate-400 font-medium">Daily construction task output & milestone completions</p>
            </div>
            <select
              value={pulseFilter}
              onChange={(e) => setPulseFilter(e.target.value)}
              className="text-xs bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 text-slate-700 font-bold focus:outline-none"
            >
              <option value="This Week">This Week</option>
              <option value="Last Week">Last Week</option>
              <option value="Month">This Month</option>
            </select>
          </div>

          {/* Bar Chart Graphic */}
          <div className="h-56 flex items-end justify-between gap-4 pt-6 pb-2 px-3 border-b border-slate-100">
            {weeklyProjectPulse.map((item, idx) => (
              <div
                key={idx}
                className="flex-1 flex flex-col items-center gap-2.5 h-full justify-end group cursor-pointer relative"
                onMouseEnter={() => setHoveredBar(item)}
                onMouseLeave={() => setHoveredBar(null)}
              >
                {/* Floating Tooltip */}
                {hoveredBar?.day === item.day && (
                  <div className="absolute -top-8 px-2.5 py-1 bg-slate-900 text-white text-[11px] font-bold rounded-lg shadow-lg whitespace-nowrap z-10 animate-in fade-in zoom-in-95">
                    {item.label} tasks finished
                  </div>
                )}
                
                <div className="w-full bg-slate-100 rounded-t-xl h-44 flex items-end overflow-hidden group-hover:bg-slate-200 transition">
                  <div
                    style={{ height: `${item.percent}%` }}
                    className={`w-full rounded-t-xl transition-all duration-500 ${
                      item.percent >= 70
                        ? 'bg-blue-600'
                        : item.percent >= 50
                        ? 'bg-blue-500'
                        : 'bg-blue-400'
                    } group-hover:brightness-110`}
                  ></div>
                </div>
                <span className="text-xs font-bold text-slate-500 group-hover:text-blue-600 transition">
                  {item.day}
                </span>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between text-xs text-slate-500 pt-3 font-medium">
            <span>Average Output: <strong>52% completion rate</strong></span>
            <span className="text-emerald-600 font-bold flex items-center gap-1">
              <TrendingUp className="w-4 h-4" /> +12% Ahead of baseline schedule
            </span>
          </div>
        </div>

        {/* Project Progress Card (Skyline Residences) */}
        <div className="lg:col-span-5 bg-white p-6 md:p-7 rounded-3xl border border-slate-200/80 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base font-extrabold text-slate-900">Project Progress</h2>
              <span className="text-xs bg-slate-100 text-slate-700 px-3 py-1 rounded-xl font-bold">
                Overall ▾
              </span>
            </div>

            {/* Project Image & Name */}
            <div className="flex items-center gap-4 mb-5 p-3 bg-slate-50 rounded-2xl border border-slate-150">
              <img
                src={activeProject.image}
                alt={activeProject.name}
                className="w-20 h-20 rounded-2xl object-cover ring-1 ring-slate-200 shrink-0"
              />
              <div className="min-w-0 flex-1">
                <h3 className="text-sm font-extrabold text-slate-900 truncate">{activeProject.name}</h3>
                <p className="text-xs font-bold text-blue-600">{activeProject.code}</p>
                <p className="text-[11px] text-slate-500 font-medium flex items-center gap-1 mt-1 truncate">
                  <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  {activeProject.location}
                </p>
              </div>
            </div>

            {/* Overall Progress Meter */}
            <div className="mb-5">
              <div className="flex justify-between items-baseline mb-2">
                <span className="text-xs font-bold text-slate-700">Overall Progress</span>
                <span className="text-2xl font-black text-blue-600">{activeProject.overallProgress}%</span>
              </div>
              <div className="w-full bg-slate-100 h-3.5 rounded-full overflow-hidden">
                <div
                  style={{ width: `${activeProject.overallProgress}%` }}
                  className="bg-blue-600 h-full rounded-full transition-all duration-700"
                ></div>
              </div>
              <div className="mt-2 text-xs font-bold text-emerald-600 flex items-center gap-1">
                <TrendingUp className="w-4 h-4" />
                {activeProject.scheduleVariance}
              </div>
            </div>

            {/* 3 Metric Pills */}
            <div className="grid grid-cols-3 gap-3 text-center mb-4">
              <div className="p-3 rounded-2xl bg-emerald-50 border border-emerald-100">
                <div className="text-[10px] font-bold text-emerald-800 uppercase tracking-wide">Completed</div>
                <div className="text-base font-extrabold text-emerald-700 mt-0.5">{activeProject.completedPercent}%</div>
                <div className="text-[10px] text-emerald-600 font-medium">Work finished</div>
              </div>
              <div className="p-3 rounded-2xl bg-blue-50 border border-blue-100">
                <div className="text-[10px] font-bold text-blue-800 uppercase tracking-wide">In Progress</div>
                <div className="text-base font-extrabold text-blue-700 mt-0.5">{activeProject.inProgressPercent}%</div>
                <div className="text-[10px] text-blue-600 font-medium">Work ongoing</div>
              </div>
              <div className="p-3 rounded-2xl bg-rose-50 border border-rose-100">
                <div className="text-[10px] font-bold text-rose-800 uppercase tracking-wide">Delayed</div>
                <div className="text-base font-extrabold text-rose-700 mt-0.5">{activeProject.delayedPercent}%</div>
                <div className="text-[10px] text-rose-600 font-medium">Behind plan</div>
              </div>
            </div>
          </div>

          <Link
            to="/projects"
            className="w-full py-3 text-center text-xs font-extrabold text-blue-600 hover:text-blue-700 bg-blue-50 hover:bg-blue-100 rounded-2xl transition flex items-center justify-center gap-1.5"
          >
            View Project Details & BIM <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* Row 3: Quick Actions (Wide 6 Grid) + Upcoming Deadlines + Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Quick Actions (6 Cards) */}
        <div className="lg:col-span-5 bg-white p-6 md:p-7 rounded-3xl border border-slate-200/80 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base font-extrabold text-slate-900">Quick Actions</h2>
              <span className="text-xs text-slate-400 font-semibold">1-Click Field Entry</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3.5">
              {quickActions.map((action) => {
                const Icon = action.icon;
                return (
                  <button
                    key={action.id}
                    onClick={action.action}
                    className="flex flex-col items-center text-center p-4 rounded-2xl border border-slate-150 hover:border-blue-300 bg-slate-50/60 hover:bg-blue-50/40 transition group shadow-xs"
                  >
                    <div className={`w-11 h-11 rounded-2xl flex items-center justify-center mb-2.5 transition-transform group-hover:scale-110 ${action.color}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-xs font-extrabold text-slate-800 leading-tight">
                      {action.title}
                    </span>
                    <span className="text-[10px] text-slate-500 font-medium mt-1 leading-tight line-clamp-1">
                      {action.desc}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Manpower & Live Status Footer */}
          <div className="mt-5 p-3.5 rounded-2xl bg-slate-50 border border-slate-150 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <HardHat className="w-4 h-4 text-amber-600" />
              <span className="font-bold text-slate-800">142 Workers Active</span>
            </div>
            <span className="text-xs font-semibold text-slate-500">Sunny • 33°C</span>
          </div>
        </div>

        {/* Upcoming Deadlines */}
        <div className="lg:col-span-3 bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-extrabold text-slate-900">Upcoming Deadlines</h3>
              <Link to="/schedule" className="text-xs font-bold text-blue-600 hover:text-blue-700">
                View all
              </Link>
            </div>
            <div className="space-y-3">
              {upcomingDeadlines.map((dl) => (
                <div
                  key={dl.id}
                  className="p-3 rounded-2xl bg-slate-50 border border-slate-150 flex items-center justify-between text-xs"
                >
                  <div className="flex items-center gap-2.5 truncate">
                    <span className="w-2 h-2 rounded-full bg-blue-600 shrink-0"></span>
                    <div className="truncate">
                      <p className="font-bold text-slate-900 truncate">{dl.title}</p>
                      <p className="text-[10px] text-slate-400 font-semibold">{dl.department}</p>
                    </div>
                  </div>
                  <div className="flex flex-col items-end shrink-0 ml-2">
                    <span className="text-[10px] text-slate-500 font-medium">{dl.date}</span>
                    <span className={`text-[9px] font-extrabold px-1.5 py-0.5 rounded mt-0.5 ${
                      dl.priority === 'High'
                        ? 'bg-rose-100 text-rose-700'
                        : dl.priority === 'Medium'
                        ? 'bg-amber-100 text-amber-700'
                        : 'bg-emerald-100 text-emerald-700'
                    }`}>
                      {dl.priority}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Activity Stream */}
        <div className="lg:col-span-4 bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base font-extrabold text-slate-900">Recent Activity</h2>
              <Link to="/field-ops" className="text-xs font-bold text-blue-600 hover:text-blue-700">
                View all
              </Link>
            </div>

            <div className="space-y-3.5">
              {recentActivities.map((act) => (
                <div key={act.id} className="flex items-start gap-3">
                  <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 mt-0.5 ${act.color}`}>
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-bold text-slate-800 leading-tight">
                      {act.title}
                    </p>
                    <p className="text-[11px] text-slate-500 mt-0.5 truncate">
                      by {act.author}
                    </p>
                  </div>
                  <span className="text-[10px] font-medium text-slate-400 shrink-0">
                    {act.time}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <Link
            to="/tasks"
            className="w-full mt-4 py-2 text-center text-xs font-bold text-slate-600 hover:text-blue-600 border border-slate-200 rounded-xl transition"
          >
            Review Project Action Items →
          </Link>
        </div>
      </div>

      {/* Row 4: Daily Activity Photo Inspection Log (from Biswas & Acme references) */}
      <div className="bg-white p-6 md:p-7 rounded-3xl border border-slate-200/80 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-5">
          <div>
            <h2 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
              Daily Site Activity & Concrete Inspection Logs
              <span className="px-2.5 py-0.5 text-[10px] font-bold rounded-full bg-emerald-100 text-emerald-800">
                Verified
              </span>
            </h2>
            <p className="text-xs text-slate-400">High-resolution photographic field records uploaded by site engineers</p>
          </div>
          <Link
            to="/field-ops"
            className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1"
          >
            Explore All Site Logs →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {dailySiteLogs[0].photos.slice(0, 2).map((photo, i) => (
            <div
              key={i}
              className="flex flex-col sm:flex-row items-center gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-150 hover:bg-blue-50/20 transition group shadow-xs"
            >
              <img
                src={photo.url}
                alt={photo.title}
                className="w-full sm:w-36 h-28 rounded-xl object-cover ring-1 ring-slate-200 group-hover:scale-102 transition-transform"
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-100 text-blue-700">
                    {photo.tag}
                  </span>
                  <span className="text-xs text-slate-400 font-semibold">Skyline PRJ-1001</span>
                </div>
                <h4 className="text-xs font-extrabold text-slate-900 leading-snug">
                  {photo.title}
                </h4>
                <p className="text-[11px] text-slate-500 mt-1 line-clamp-2">
                  {dailySiteLogs[0].summary}
                </p>
                <div className="mt-2.5 text-[10px] font-semibold text-slate-400">
                  Logged by Amit Verma • Today 02:45 PM
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
