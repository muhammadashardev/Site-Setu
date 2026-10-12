import React, { useState } from 'react';
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
  Search,
  Filter,
  ToggleLeft,
  ToggleRight,
  ExternalLink,
  ChevronRight,
  Clock,
  Sparkles,
  Lock
} from 'lucide-react';
import { superAdminMetrics } from '../data/mockData';

export default function SuperAdminPage() {
  const [tenants, setTenants] = useState(superAdminMetrics.tenants);
  const [filterPlan, setFilterPlan] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [featureFlags, setFeatureFlags] = useState({
    aiCopilot: true,
    bim3dViewer: true,
    droneOrthomosaic: false,
    automatedPayApps: true,
    multiLanguageOCR: true,
  });

  const toggleFlag = (key) => {
    setFeatureFlags((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const filteredTenants = tenants.filter((t) => {
    const matchesPlan = filterPlan === 'All' || t.plan.includes(filterPlan);
    const matchesSearch = t.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesPlan && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Super Admin Top Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-3xl bg-gradient-to-r from-slate-900 via-[#172B4D] to-blue-950 text-white shadow-xl relative overflow-hidden">
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold border border-amber-500/30 mb-2">
            <Lock className="w-3.5 h-3.5" /> SiteSetu Multi-Tenant Engine
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">
            Super Admin Control Center
          </h1>
          <p className="text-xs md:text-sm text-slate-300 mt-1 max-w-xl">
            Global management of construction enterprise tenants, subscription MRR, server clusters, feature flags, and security audits.
          </p>
        </div>

        <div className="flex items-center gap-3 relative z-10">
          <div className="px-4 py-2.5 bg-white/10 backdrop-blur-md rounded-2xl border border-white/10 text-right">
            <div className="text-[11px] text-slate-300 font-medium">Cluster Health</div>
            <div className="text-sm font-bold text-emerald-400 flex items-center justify-end gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
              99.98% Uptime
            </div>
          </div>
        </div>
      </div>

      {/* 4 Super Admin KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Total Tenants</p>
            <p className="text-2xl font-extrabold text-slate-900 mt-1">{superAdminMetrics.totalTenants} Companies</p>
            <span className="text-[11px] font-semibold text-emerald-600 flex items-center gap-1 mt-1">
              <ArrowUpRight className="w-3.5 h-3.5" /> +4 this month
            </span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
            <Building2 className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Monthly Recurring (MRR)</p>
            <p className="text-2xl font-extrabold text-slate-900 mt-1">${superAdminMetrics.monthlyRecurringRevenue.toLocaleString()}</p>
            <span className="text-[11px] font-semibold text-emerald-600 flex items-center gap-1 mt-1">
              <ArrowUpRight className="w-3.5 h-3.5" /> {superAdminMetrics.mrrGrowth} MoM
            </span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <DollarSign className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Active Construction Users</p>
            <p className="text-2xl font-extrabold text-slate-900 mt-1">{superAdminMetrics.totalUsers.toLocaleString()}</p>
            <span className="text-[11px] font-semibold text-blue-600 mt-1 block">
              184 active jobsites
            </span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center">
            <Users className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">API Average Latency</p>
            <p className="text-2xl font-extrabold text-slate-900 mt-1">{superAdminMetrics.apiHealth}</p>
            <span className="text-[11px] font-semibold text-slate-500 mt-1 block">
              Global CDN edge synced
            </span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center">
            <Activity className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Main Tenant Table Section */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <h2 className="text-base font-extrabold text-slate-900">
              Tenant & Company Workspaces Directory
            </h2>
            <p className="text-xs text-slate-500">
              Manage accounts, project capacity, subscription tiers, and isolated data containers.
            </p>
          </div>

          <div className="flex items-center gap-3">
            {/* Search */}
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search tenant name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 pr-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              />
            </div>

            {/* Filter */}
            <select
              value={filterPlan}
              onChange={(e) => setFilterPlan(e.target.value)}
              className="px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl text-slate-700 font-semibold focus:outline-none"
            >
              <option value="All">All Plans</option>
              <option value="Enterprise">Enterprise</option>
              <option value="Growth">Growth</option>
            </select>
          </div>
        </div>

        {/* Tenant List Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-100 text-[11px] font-bold uppercase tracking-wider text-slate-400 bg-slate-50/50">
                <th className="py-3 px-4 rounded-l-xl">Tenant Organization</th>
                <th className="py-3 px-4">Plan Tier</th>
                <th className="py-3 px-4 text-center">Active Projects</th>
                <th className="py-3 px-4 text-center">Licensed Users</th>
                <th className="py-3 px-4">MRR</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right rounded-r-xl">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
              {filteredTenants.map((tenant) => (
                <tr key={tenant.id} className="hover:bg-slate-50/80 transition">
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-slate-100 flex items-center justify-center text-lg">
                        {tenant.logo}
                      </div>
                      <div>
                        <div className="font-bold text-slate-900 text-xs">{tenant.name}</div>
                        <div className="text-[10px] text-slate-400">{tenant.id} • Renew: {tenant.renewal}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="font-semibold text-slate-800 px-2.5 py-1 rounded-lg bg-blue-50 text-blue-700 border border-blue-200/60">
                      {tenant.plan}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-center font-bold text-slate-900">
                    {tenant.projects}
                  </td>
                  <td className="py-3.5 px-4 text-center font-bold text-slate-900">
                    {tenant.users}
                  </td>
                  <td className="py-3.5 px-4 font-bold text-emerald-700">
                    {tenant.mrr}
                  </td>
                  <td className="py-3.5 px-4">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold ${
                      tenant.status.includes('Active')
                        ? 'bg-emerald-50 text-emerald-700'
                        : 'bg-amber-50 text-amber-700'
                    }`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${
                        tenant.status.includes('Active') ? 'bg-emerald-600' : 'bg-amber-500'
                      }`}></span>
                      {tenant.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <button className="px-3 py-1.5 bg-slate-100 hover:bg-blue-600 hover:text-white rounded-xl text-slate-700 font-semibold text-[11px] transition">
                      Manage Tenant
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Two Columns: Server Infrastructure Nodes + Feature Flags */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Server Nodes Health */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Server className="w-4 h-4 text-blue-600" /> Infrastructure Node Status
            </h3>
            <span className="text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
              All Operational
            </span>
          </div>

          <div className="space-y-3">
            {superAdminMetrics.systemNodes.map((n, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-2xl bg-slate-50 border border-slate-150 flex items-center justify-between text-xs"
              >
                <div>
                  <div className="font-bold text-slate-800">{n.node}</div>
                  <div className="text-[10px] text-slate-400 mt-0.5">Ping: {n.ping} • Status: {n.status}</div>
                </div>
                <div className="text-right">
                  <div className="text-[11px] font-bold text-slate-700">Load: {n.load}</div>
                  <div className="w-20 bg-slate-200 h-1.5 rounded-full overflow-hidden mt-1">
                    <div
                      style={{ width: n.load }}
                      className="bg-blue-600 h-full rounded-full"
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Global SaaS Feature Flags */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-500" /> Global Feature Flags & Beta Gates
            </h3>
            <span className="text-[11px] text-slate-400">Release Controls</span>
          </div>

          <div className="space-y-3">
            {[
              { key: 'aiCopilot', name: 'SiteSetu AI Copilot v2.4 (OpenAI/Anthropic RAG)', desc: 'Automatic RFI drafting and BOQ analysis across all tenants' },
              { key: 'bim3dViewer', name: 'Web-based 3D BIM IFC Viewer', desc: 'Hardware-accelerated 3D architectural model inspection' },
              { key: 'droneOrthomosaic', name: 'Drone Orthomosaic Geo-Sync (Beta)', desc: 'High-res aerial elevation overlays and point cloud maps' },
              { key: 'automatedPayApps', name: 'Automated AIA G702 / G703 Billing Export', desc: 'Standardized monthly progress payment applications' },
            ].map((f) => (
              <div
                key={f.key}
                className="p-3.5 rounded-2xl bg-slate-50 border border-slate-150 flex items-center justify-between text-xs"
              >
                <div>
                  <div className="font-bold text-slate-800">{f.name}</div>
                  <div className="text-[11px] text-slate-500 mt-0.5">{f.desc}</div>
                </div>
                <button
                  onClick={() => toggleFlag(f.key)}
                  className={`text-2xl transition ${
                    featureFlags[f.key] ? 'text-blue-600' : 'text-slate-300'
                  }`}
                >
                  {featureFlags[f.key] ? <ToggleRight className="w-7 h-7" /> : <ToggleLeft className="w-7 h-7" />}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
