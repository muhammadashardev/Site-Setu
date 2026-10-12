import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Building2,
  Users,
  DollarSign,
  Activity,
  Server,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  ArrowUpRight,
  ArrowDownRight,
  Search,
  Filter,
  ToggleLeft,
  ToggleRight,
  ExternalLink,
  ChevronRight,
  Clock,
  Sparkles,
  Lock,
  Cpu,
  Database,
  Cloud,
  Zap,
  Play,
  RotateCw,
  Sliders,
  Eye,
  Key,
  ShieldAlert,
  BarChart3,
  TrendingUp,
  Radio,
  Check,
  X
} from 'lucide-react';
import { superAdminMetrics } from '../data/mockData';

export default function SuperAdminPage() {
  const navigate = useNavigate();
  const [tenants, setTenants] = useState([
    {
      id: "TEN-001",
      name: "Apex InfraTech Solutions",
      plan: "Enterprise Scale",
      projects: 14,
      users: 142,
      maxUsers: 200,
      storageUsed: 780, // GB
      storageLimit: 1000,
      mrr: "$4,500/mo",
      status: "Active",
      renewal: "Dec 2025",
      logo: "🏢",
      region: "ap-south-1",
      health: "99.9%",
    },
    {
      id: "TEN-002",
      name: "BuildPro Developers Pvt Ltd",
      plan: "Enterprise Scale",
      projects: 22,
      users: 280,
      maxUsers: 300,
      storageUsed: 920,
      storageLimit: 1500,
      mrr: "$6,200/mo",
      status: "Active",
      renewal: "Nov 2025",
      logo: "🏗️",
      region: "ap-south-1",
      health: "100%",
    },
    {
      id: "TEN-003",
      name: "Skyline Global Constructions",
      plan: "Growth Tier",
      projects: 8,
      users: 65,
      maxUsers: 100,
      storageUsed: 410,
      storageLimit: 500,
      mrr: "$2,400/mo",
      status: "Active",
      renewal: "Aug 2025",
      logo: "🌆",
      region: "ap-southeast-1",
      health: "99.8%",
    },
    {
      id: "TEN-004",
      name: "Falcon Civil Contractors",
      plan: "Growth Tier",
      projects: 5,
      users: 38,
      maxUsers: 50,
      storageUsed: 490, // Near limit
      storageLimit: 500,
      mrr: "$1,800/mo",
      status: "Trial (5 days left)",
      renewal: "May 2025",
      logo: "🦅",
      region: "ap-south-1",
      health: "98.5%",
      warning: "Storage 98% full",
    },
    {
      id: "TEN-005",
      name: "Pinnacle Urban Infrastructure",
      plan: "Enterprise Scale",
      projects: 31,
      users: 410,
      maxUsers: 500,
      storageUsed: 1240,
      storageLimit: 2000,
      mrr: "$8,900/mo",
      status: "Active",
      renewal: "Jan 2026",
      logo: "⛰️",
      region: "me-central-1",
      health: "100%",
    },
    {
      id: "TEN-006",
      name: "MetroRail Infra Consortium",
      plan: "Enterprise Scale",
      projects: 18,
      users: 195,
      maxUsers: 250,
      storageUsed: 620,
      storageLimit: 1000,
      mrr: "$5,800/mo",
      status: "Active",
      renewal: "Feb 2026",
      logo: "🚇",
      region: "ap-south-1",
      health: "99.9%",
    },
  ]);

  const [activeTab, setActiveTab] = useState('All');
  const [search, setSearch] = useState('');
  const [selectedTenantModal, setSelectedTenantModal] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);
  const [chartRange, setChartRange] = useState('H1'); // 'H1' | 'H2'
  const [hoveredMonth, setHoveredMonth] = useState(null);
  const [pingRunning, setPingRunning] = useState(false);
  const [lastPingTime, setLastPingTime] = useState('14ms • Just now');

  // Interactive feature flags with rollout %
  const [featureFlags, setFeatureFlags] = useState([
    {
      id: 'ai-copilot',
      name: 'SiteSetu AI Copilot v2.4 (OpenAI/Anthropic RAG)',
      desc: 'Automatic RFI drafting, BOQ variance diagnosis & OCR',
      enabled: true,
      rollout: 100,
      tier: 'All Tiers',
    },
    {
      id: 'bim-viewer',
      name: 'Hardware-Accelerated 3D BIM IFC Viewer',
      desc: 'WebGL 3D architectural clash detection in browser',
      enabled: true,
      rollout: 85,
      tier: 'Enterprise Scale Only',
    },
    {
      id: 'drone-mapping',
      name: 'Drone Orthomosaic Geo-Sync (Beta)',
      desc: 'High-res aerial elevation overlays and point cloud maps',
      enabled: false,
      rollout: 25,
      tier: 'Beta Invite Only',
    },
    {
      id: 'automated-pay-apps',
      name: 'Automated AIA G702 / G703 Payment Applications',
      desc: 'One-click standard monthly progress certificate generator',
      enabled: true,
      rollout: 100,
      tier: 'Growth & Enterprise',
    },
  ]);

  // Live real-time event feed
  const [liveEvents, setLiveEvents] = useState([
    { id: 1, text: "Apex InfraTech added 4 new site engineer seats", time: "2 min ago", type: "user" },
    { id: 2, text: "Pinnacle Urban triggered automated monthly backup (1.2 TB)", time: "6 min ago", type: "system" },
    { id: 3, text: "Falcon Civil storage reached 98% threshold alert", time: "14 min ago", type: "alert" },
    { id: 4, text: "New enterprise subscription initiated by MetroRail ($5,800/mo)", time: "32 min ago", type: "billing" },
  ]);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const toggleFlag = (id) => {
    setFeatureFlags((prev) =>
      prev.map((f) => {
        if (f.id === id) {
          const newState = !f.enabled;
          showToast(`Feature flag "${f.name}" updated to ${newState ? 'ACTIVE' : 'DISABLED'}`);
          return { ...f, enabled: newState };
        }
        return f;
      })
    );
  };

  const handleRolloutChange = (id, val) => {
    setFeatureFlags((prev) =>
      prev.map((f) => (f.id === id ? { ...f, rollout: parseInt(val) } : f))
    );
  };

  const triggerPingTest = () => {
    setPingRunning(true);
    setTimeout(() => {
      setPingRunning(false);
      setLastPingTime(`12ms • All 5 Clusters Verified`);
      showToast("Global infrastructure ping completed: All database & edge nodes responding in <15ms!");
    }, 800);
  };

  const handleImpersonate = (tenant) => {
    showToast(`Launching workspace session for ${tenant.name}...`);
    setTimeout(() => {
      navigate('/');
    }, 700);
  };

  const filteredTenants = tenants.filter((t) => {
    const matchSearch = t.name.toLowerCase().includes(search.toLowerCase()) || t.id.toLowerCase().includes(search.toLowerCase());
    if (activeTab === 'All') return matchSearch;
    if (activeTab === 'Enterprise') return matchSearch && t.plan.includes('Enterprise');
    if (activeTab === 'Growth') return matchSearch && t.plan.includes('Growth');
    if (activeTab === 'At Risk') return matchSearch && (t.warning || t.status.includes('Trial'));
    return matchSearch;
  });

  // Revenue chart dataset
  const revenuePoints = [
    { month: 'Jan', mrr: 142000, arr: '1.70M', label: '$142k' },
    { month: 'Feb', mrr: 151000, arr: '1.81M', label: '$151k' },
    { month: 'Mar', mrr: 162000, arr: '1.94M', label: '$162k' },
    { month: 'Apr', mrr: 171500, arr: '2.05M', label: '$171k' },
    { month: 'May', mrr: 184500, arr: '2.21M', label: '$184.5k' },
    { month: 'Jun (Est)', mrr: 198000, arr: '2.37M', label: '$198k' },
  ];

  return (
    <div className="space-y-7">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 px-4 py-3 bg-slate-900 text-white text-xs font-bold rounded-2xl shadow-2xl border border-slate-700 flex items-center gap-2.5 animate-in slide-in-from-bottom duration-200">
          <Sparkles className="w-4 h-4 text-amber-400 animate-spin" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Super Admin Executive Command Hero */}
      <div className="p-7 md:p-8 rounded-3xl bg-gradient-to-r from-[#0F172A] via-[#1E293B] to-[#0A1128] text-white shadow-2xl relative overflow-hidden border border-slate-800">
        {/* Glow backdrop effects */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-600/15 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-extrabold border border-amber-500/30">
              <ShieldAlert className="w-3.5 h-3.5" /> SiteSetu Global SaaS Admin Plane • Multi-Tenant
            </div>
            <h1 className="text-3xl md:text-4xl font-black tracking-tight">
              Platform Executive Command Center
            </h1>
            <p className="text-xs md:text-sm text-slate-300 max-w-2xl font-medium">
              Real-time monitoring of 48 construction enterprise accounts, $184,500 monthly recurring revenue, cluster container health, and live feature flags.
            </p>
          </div>

          {/* Quick Action Control Bar */}
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={triggerPingTest}
              disabled={pingRunning}
              className="flex items-center gap-2 px-4 py-2.5 bg-white/10 hover:bg-white/15 text-white rounded-2xl text-xs font-bold border border-white/15 transition backdrop-blur-md"
            >
              <RotateCw className={`w-3.5 h-3.5 ${pingRunning ? 'animate-spin text-amber-400' : ''}`} />
              <span>Ping All Clusters ({lastPingTime})</span>
            </button>

            <button
              onClick={() => showToast("Database backup snapshot started across all active tenants.")}
              className="flex items-center gap-2 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-2xl text-xs font-bold shadow-lg shadow-emerald-600/30 transition transform active:scale-95"
            >
              <Database className="w-3.5 h-3.5" />
              <span>Snapshot DB</span>
            </button>

            <button
              onClick={() => navigate('/login')}
              className="flex items-center gap-2 px-4 py-2.5 bg-amber-500 hover:bg-amber-600 text-slate-950 rounded-2xl text-xs font-extrabold shadow-lg shadow-amber-500/25 transition transform active:scale-95"
            >
              <Key className="w-3.5 h-3.5" />
              <span>Switch Role</span>
            </button>
          </div>
        </div>

        {/* Real-time Ticker Bar */}
        <div className="mt-6 pt-5 border-t border-slate-800/80 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
          <div className="flex items-center gap-2 text-slate-300">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping"></span>
            <span>Uptime: <strong className="text-white">99.98%</strong></span>
          </div>
          <div className="flex items-center gap-2 text-slate-300">
            <Cpu className="w-4 h-4 text-blue-400" />
            <span>Avg Node Load: <strong className="text-white">32%</strong></span>
          </div>
          <div className="flex items-center gap-2 text-slate-300">
            <Cloud className="w-4 h-4 text-purple-400" />
            <span>Storage: <strong className="text-white">14.2 TB / 50 TB</strong></span>
          </div>
          <div className="flex items-center gap-2 text-slate-300">
            <Zap className="w-4 h-4 text-amber-400" />
            <span>API Gateway: <strong className="text-emerald-400">42ms Latency</strong></span>
          </div>
        </div>
      </div>

      {/* 4 Interactive KPI Cards with Sparkline Visuals */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Card 1: MRR */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs hover:shadow-lg transition-all duration-300 group">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-extrabold uppercase tracking-wider text-slate-400">
              Monthly Recurring (MRR)
            </span>
            <div className="w-11 h-11 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
              <DollarSign className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl font-black text-slate-900 tracking-tight">
            ${superAdminMetrics.monthlyRecurringRevenue.toLocaleString()}
          </div>
          <div className="flex items-center justify-between mt-3 pt-3 border-t border-slate-100">
            <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-lg">
              <TrendingUp className="w-3.5 h-3.5" /> +14.6% MoM
            </span>
            <span className="text-[11px] text-slate-400 font-medium">ARR: $2.21M</span>
          </div>
        </div>

        {/* Card 2: Total Tenants */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs hover:shadow-lg transition-all duration-300 group">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-extrabold uppercase tracking-wider text-slate-400">
              Active Enterprise Tenants
            </span>
            <div className="w-11 h-11 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
              <Building2 className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl font-black text-slate-900 tracking-tight">
            {tenants.length} Companies
          </div>
          <div className="flex items-center justify-between mt-3 pt-3 border-t border-slate-100">
            <span className="inline-flex items-center gap-1 text-xs font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-lg">
              <ArrowUpRight className="w-3.5 h-3.5" /> +3 This Month
            </span>
            <span className="text-[11px] text-slate-400 font-medium">184 active sites</span>
          </div>
        </div>

        {/* Card 3: Licensed Users */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs hover:shadow-lg transition-all duration-300 group">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-extrabold uppercase tracking-wider text-slate-400">
              Active Construction Seats
            </span>
            <div className="w-11 h-11 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center font-bold">
              <Users className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl font-black text-slate-900 tracking-tight">
            {superAdminMetrics.totalUsers.toLocaleString()} Users
          </div>
          <div className="flex items-center justify-between mt-3 pt-3 border-t border-slate-100">
            <span className="inline-flex items-center gap-1 text-xs font-bold text-purple-600 bg-purple-50 px-2 py-0.5 rounded-lg">
              <CheckCircle2 className="w-3.5 h-3.5" /> 92% Utilization
            </span>
            <span className="text-[11px] text-slate-400 font-medium">1,240 field engineers</span>
          </div>
        </div>

        {/* Card 4: Platform Security & Audits */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs hover:shadow-lg transition-all duration-300 group">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-extrabold uppercase tracking-wider text-slate-400">
              Security & Audit Rating
            </span>
            <div className="w-11 h-11 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
              <ShieldCheck className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl font-black text-slate-900 tracking-tight">
            SOC-2 Type II
          </div>
          <div className="flex items-center justify-between mt-3 pt-3 border-t border-slate-100">
            <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-lg">
              Zero Vulnerabilities
            </span>
            <span className="text-[11px] text-slate-400 font-medium">ISO 27001 verified</span>
          </div>
        </div>
      </div>

      {/* Row 2: Interactive MRR Growth Chart (Wide) + Live Activity Stream */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* MRR Revenue Chart with Hoverable Tooltips */}
        <div className="lg:col-span-8 bg-white p-6 md:p-7 rounded-3xl border border-slate-200/80 shadow-xs flex flex-col justify-between">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
            <div>
              <h2 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-blue-600" />
                Monthly Recurring Revenue (MRR) Growth Curve
              </h2>
              <p className="text-xs text-slate-400 font-medium">Trajectory of gross subscription billings across Enterprise & Growth tiers</p>
            </div>

            <div className="flex items-center bg-slate-100 p-1 rounded-2xl border border-slate-200 text-xs font-bold">
              <button
                onClick={() => setChartRange('H1')}
                className={`px-3 py-1 rounded-xl transition ${chartRange === 'H1' ? 'bg-white text-blue-600 shadow-xs' : 'text-slate-500'}`}
              >
                2025 H1 (Jan–Jun)
              </button>
              <button
                onClick={() => setChartRange('H2')}
                className={`px-3 py-1 rounded-xl transition ${chartRange === 'H2' ? 'bg-white text-blue-600 shadow-xs' : 'text-slate-500'}`}
              >
                Forecast H2
              </button>
            </div>
          </div>

          {/* Interactive Bar/Column Chart with Gradient fills */}
          <div className="h-60 flex items-end justify-between gap-4 pt-6 pb-2 px-4 border-b border-slate-100">
            {revenuePoints.map((pt, idx) => (
              <div
                key={idx}
                className="flex-1 flex flex-col items-center gap-2 h-full justify-end group cursor-pointer relative"
                onMouseEnter={() => setHoveredMonth(pt)}
                onMouseLeave={() => setHoveredMonth(null)}
              >
                {/* Floating tooltip */}
                {hoveredMonth?.month === pt.month && (
                  <div className="absolute -top-10 px-3 py-1 bg-slate-900 text-white text-[11px] font-bold rounded-xl shadow-xl whitespace-nowrap z-20 animate-in fade-in zoom-in-95">
                    {pt.month}: <span className="text-amber-400">{pt.label} MRR</span> (ARR: {pt.arr})
                  </div>
                )}

                <div className="w-full bg-slate-100 rounded-t-2xl h-48 flex items-end overflow-hidden group-hover:bg-slate-200 transition">
                  <div
                    style={{ height: `${(pt.mrr / 200000) * 100}%` }}
                    className="w-full rounded-t-2xl bg-gradient-to-t from-blue-700 via-blue-500 to-indigo-400 transition-all duration-500 group-hover:brightness-110"
                  ></div>
                </div>

                <span className="text-xs font-bold text-slate-500 group-hover:text-blue-600 transition">
                  {pt.month}
                </span>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between text-xs text-slate-500 pt-3 font-semibold">
            <span>Net Revenue Retention: <strong className="text-emerald-600">128%</strong></span>
            <span>Gross Churn Rate: <strong className="text-slate-800">0.4% (Industry lowest)</strong></span>
          </div>
        </div>

        {/* Live Platform Event Ticker */}
        <div className="lg:col-span-4 bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
                <Radio className="w-4 h-4 text-emerald-500 animate-pulse" /> Live Telemetry Feed
              </h3>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                Streaming
              </span>
            </div>

            <div className="space-y-3">
              {liveEvents.map((evt) => (
                <div
                  key={evt.id}
                  className="p-3.5 rounded-2xl bg-slate-50 border border-slate-150 text-xs space-y-1 hover:bg-blue-50/20 transition"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-slate-400">{evt.time}</span>
                    <span className={`w-2 h-2 rounded-full ${
                      evt.type === 'alert' ? 'bg-rose-500' : evt.type === 'billing' ? 'bg-emerald-500' : 'bg-blue-500'
                    }`}></span>
                  </div>
                  <p className="font-bold text-slate-800 leading-snug">{evt.text}</p>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={() => showToast("Telemetry log downloaded.")}
            className="w-full mt-4 py-2 text-center text-xs font-bold text-slate-600 hover:text-blue-600 border border-slate-200 rounded-xl transition"
          >
            Open Full Stream Logs →
          </button>
        </div>
      </div>

      {/* Row 3: Tenant Directory with Quick Impersonate & Inspector */}
      <div className="bg-white p-6 md:p-7 rounded-3xl border border-slate-200/80 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-base font-extrabold text-slate-900">
              Tenant & Organization Workspaces Directory
            </h2>
            <p className="text-xs text-slate-400 font-medium">
              Manage accounts, project allocations, storage thresholds, and direct session impersonation.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Filter Tabs */}
            <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-2xl border border-slate-200 text-xs font-bold">
              {['All', 'Enterprise', 'Growth', 'At Risk'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-3 py-1 rounded-xl transition ${
                    activeTab === tab
                      ? 'bg-white text-blue-700 shadow-xs font-extrabold'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Search */}
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search tenant..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9 pr-3.5 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:bg-white"
              />
            </div>
          </div>
        </div>

        {/* Tenant Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-100 text-[11px] font-bold uppercase tracking-wider text-slate-400 bg-slate-50/50">
                <th className="py-3.5 px-4 rounded-l-xl">Tenant Organization</th>
                <th className="py-3.5 px-4">Plan Tier</th>
                <th className="py-3.5 px-4 text-center">Projects</th>
                <th className="py-3.5 px-4">Seat Utilization</th>
                <th className="py-3.5 px-4">Storage Usage</th>
                <th className="py-3.5 px-4">MRR</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right rounded-r-xl">Quick Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
              {filteredTenants.map((t) => (
                <tr key={t.id} className="hover:bg-slate-50/90 transition">
                  <td className="py-4 px-4 font-bold text-slate-900">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-2xl bg-slate-100 flex items-center justify-center text-xl shrink-0">
                        {t.logo}
                      </div>
                      <div>
                        <div className="text-xs font-extrabold text-slate-900">{t.name}</div>
                        <div className="text-[10px] text-slate-400 font-normal">
                          {t.id} • Region: {t.region}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <span className="px-2.5 py-1 rounded-xl text-[10px] font-extrabold bg-blue-50 text-blue-700 border border-blue-200/60">
                      {t.plan}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-center font-extrabold text-slate-900">
                    {t.projects}
                  </td>
                  <td className="py-4 px-4">
                    <div className="w-28 space-y-1">
                      <div className="flex justify-between text-[10px] font-semibold text-slate-500">
                        <span>{t.users} / {t.maxUsers}</span>
                        <span>{Math.round((t.users / t.maxUsers) * 100)}%</span>
                      </div>
                      <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                        <div
                          style={{ width: `${(t.users / t.maxUsers) * 100}%` }}
                          className="bg-purple-600 h-full rounded-full"
                        ></div>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="w-28 space-y-1">
                      <div className="flex justify-between text-[10px] font-semibold text-slate-500">
                        <span>{t.storageUsed} GB</span>
                        <span className={t.storageUsed / t.storageLimit > 0.9 ? 'text-rose-600 font-bold' : ''}>
                          {Math.round((t.storageUsed / t.storageLimit) * 100)}%
                        </span>
                      </div>
                      <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                        <div
                          style={{ width: `${(t.storageUsed / t.storageLimit) * 100}%` }}
                          className={`h-full rounded-full ${
                            t.storageUsed / t.storageLimit > 0.9 ? 'bg-rose-500' : 'bg-blue-600'
                          }`}
                        ></div>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4 font-black text-emerald-700">
                    {t.mrr}
                  </td>
                  <td className="py-4 px-4">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-extrabold ${
                      t.status.includes('Active')
                        ? 'bg-emerald-50 text-emerald-700'
                        : 'bg-amber-50 text-amber-700'
                    }`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${
                        t.status.includes('Active') ? 'bg-emerald-500' : 'bg-amber-500'
                      }`}></span>
                      {t.status}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => handleImpersonate(t)}
                        className="px-2.5 py-1.5 bg-blue-50 hover:bg-blue-600 hover:text-white rounded-xl text-blue-700 font-bold text-[11px] transition flex items-center gap-1"
                        title="Impersonate Tenant Session"
                      >
                        <Eye className="w-3.5 h-3.5" /> View As
                      </button>
                      <button
                        onClick={() => setSelectedTenantModal(t)}
                        className="px-2.5 py-1.5 bg-slate-100 hover:bg-slate-200 rounded-xl text-slate-700 font-bold text-[11px] transition"
                      >
                        Inspect
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Row 4: Interactive Feature Flags Engine + Cluster Infrastructure Nodes */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Interactive Feature Flags Engine with Rollout Sliders */}
        <div className="bg-white p-6 md:p-7 rounded-3xl border border-slate-200/80 shadow-xs space-y-4">
          <div className="flex items-center justify-between mb-2">
            <div>
              <h3 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
                <Sliders className="w-4 h-4 text-amber-500" />
                Live Feature Flags & Canary Releases
              </h3>
              <p className="text-xs text-slate-400 font-medium">Instant runtime toggles & tenant percentage canary rollouts</p>
            </div>
            <span className="text-xs font-bold text-amber-800 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200">
              Live Control
            </span>
          </div>

          <div className="space-y-3.5">
            {featureFlags.map((flag) => (
              <div
                key={flag.id}
                className="p-4 rounded-2xl bg-slate-50 border border-slate-150 space-y-3 hover:border-blue-200 transition"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-extrabold text-slate-900 text-xs">{flag.name}</h4>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-200 text-slate-700">
                        {flag.tier}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500 mt-1">{flag.desc}</p>
                  </div>

                  <button
                    onClick={() => toggleFlag(flag.id)}
                    className={`transition transform active:scale-95 ${
                      flag.enabled ? 'text-blue-600' : 'text-slate-300'
                    }`}
                  >
                    {flag.enabled ? <ToggleRight className="w-8 h-8" /> : <ToggleLeft className="w-8 h-8" />}
                  </button>
                </div>

                {/* Rollout Slider */}
                {flag.enabled && (
                  <div className="pt-2 border-t border-slate-200 flex items-center justify-between gap-4 text-xs">
                    <span className="text-[11px] font-bold text-slate-500">
                      Canary Rollout: <strong className="text-blue-600">{flag.rollout}% of tenants</strong>
                    </span>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={flag.rollout}
                      onChange={(e) => handleRolloutChange(flag.id, e.target.value)}
                      className="w-32 accent-blue-600 cursor-pointer"
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Global Cluster Infrastructure Nodes */}
        <div className="bg-white p-6 md:p-7 rounded-3xl border border-slate-200/80 shadow-xs space-y-4">
          <div className="flex items-center justify-between mb-2">
            <div>
              <h3 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
                <Server className="w-4 h-4 text-blue-600" />
                Infrastructure Cluster Nodes
              </h3>
              <p className="text-xs text-slate-400 font-medium">Real-time CPU loads, latency ping, and active worker pools</p>
            </div>
            <button
              onClick={triggerPingTest}
              className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1"
            >
              <RotateCw className="w-3.5 h-3.5" /> Re-check
            </button>
          </div>

          <div className="space-y-3">
            {superAdminMetrics.systemNodes.map((node, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-2xl bg-slate-50 border border-slate-150 flex items-center justify-between text-xs"
              >
                <div>
                  <div className="font-extrabold text-slate-800">{node.node}</div>
                  <div className="text-[11px] text-slate-400 font-medium mt-0.5">
                    Latency: <strong className="text-slate-700">{node.ping}</strong> • Status: {node.status}
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-xs font-bold text-slate-700">Load: {node.load}</div>
                  <div className="w-24 bg-slate-200 h-2 rounded-full overflow-hidden mt-1">
                    <div
                      style={{ width: node.load }}
                      className="bg-blue-600 h-full rounded-full transition-all duration-500"
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Disaster Recovery & SOC-2 Status */}
          <div className="mt-4 p-4 rounded-2xl bg-gradient-to-r from-slate-900 to-[#172B4D] text-white flex items-center justify-between text-xs">
            <div>
              <p className="font-extrabold">PostgreSQL Multi-AZ Automated Replication</p>
              <p className="text-[10px] text-slate-400">RPO: 0 seconds • RTO: &lt; 30 seconds failover</p>
            </div>
            <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
              Synched
            </span>
          </div>
        </div>
      </div>

      {/* Tenant Inspector Modal */}
      {selectedTenantModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-200 p-6 space-y-4 animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <span className="text-3xl">{selectedTenantModal.logo}</span>
                <div>
                  <h3 className="font-extrabold text-base text-slate-900">{selectedTenantModal.name}</h3>
                  <p className="text-xs text-slate-400 font-semibold">{selectedTenantModal.id} • {selectedTenantModal.plan}</p>
                </div>
              </div>
              <button
                onClick={() => setSelectedTenantModal(null)}
                className="p-1.5 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs bg-slate-50 p-4 rounded-2xl">
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase">Monthly Billing</span>
                <p className="font-extrabold text-emerald-600 text-sm mt-0.5">{selectedTenantModal.mrr}</p>
              </div>
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase">Renewal Cycle</span>
                <p className="font-bold text-slate-800 mt-0.5">{selectedTenantModal.renewal}</p>
              </div>
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase">Storage Quota</span>
                <p className="font-bold text-slate-800 mt-0.5">{selectedTenantModal.storageUsed} GB / {selectedTenantModal.storageLimit} GB</p>
              </div>
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase">Primary Region</span>
                <p className="font-bold text-slate-800 mt-0.5">{selectedTenantModal.region}</p>
              </div>
            </div>

            <div className="pt-2 flex justify-end gap-3">
              <button
                onClick={() => setSelectedTenantModal(null)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition"
              >
                Close
              </button>
              <button
                onClick={() => {
                  setSelectedTenantModal(null);
                  handleImpersonate(selectedTenantModal);
                }}
                className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow transition flex items-center gap-1.5"
              >
                <Eye className="w-4 h-4" /> Impersonate Workspace
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
