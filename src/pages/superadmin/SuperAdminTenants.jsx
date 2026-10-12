import React, { useState } from 'react';
import {
  Building2,
  Plus,
  Search,
  Filter,
  Users,
  HardHat,
  DollarSign,
  Calendar,
  MoreVertical,
  CheckCircle2,
  AlertTriangle,
  ExternalLink,
  ShieldCheck,
  ChevronRight,
  X
} from 'lucide-react';
import { superAdminMetrics } from '../../data/mockData';

export default function SuperAdminTenants() {
  const [tenants, setTenants] = useState(superAdminMetrics.tenants);
  const [search, setSearch] = useState('');
  const [filterPlan, setFilterPlan] = useState('All');
  const [selectedTenant, setSelectedTenant] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newOrgName, setNewOrgName] = useState('');

  const filtered = tenants.filter((t) => {
    const matchSearch = t.name.toLowerCase().includes(search.toLowerCase());
    const matchPlan = filterPlan === 'All' || t.plan.includes(filterPlan);
    return matchSearch && matchPlan;
  });

  const handleCreateTenant = (e) => {
    e.preventDefault();
    if (!newOrgName) return;
    const newT = {
      id: `TEN-00${tenants.length + 1}`,
      name: newOrgName,
      plan: 'Growth Tier',
      projects: 1,
      users: 12,
      mrr: '$1,800/mo',
      status: 'Active',
      renewal: 'May 2026',
      logo: '🏗️',
    };
    setTenants([newT, ...tenants]);
    setNewOrgName('');
    setShowCreateModal(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="text-xs font-bold text-amber-600 mb-1 flex items-center gap-1.5">
            <span>Platform Administration • Multi-Tenancy</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-[#172B4D] tracking-tight">
            Company & Tenant Workspaces
          </h1>
          <p className="text-xs md:text-sm text-slate-500 mt-1">
            Provision new construction enterprise accounts, manage storage limits, and audit isolated databases.
          </p>
        </div>

        <button
          onClick={() => setShowCreateModal(true)}
          className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl text-xs font-bold shadow-md shadow-blue-500/20 transition"
        >
          <Plus className="w-4 h-4" /> Provision New Company Tenant
        </button>
      </div>

      {/* Top Filter & Metric Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
          <span className="text-[11px] font-bold text-slate-400 uppercase">Active Organizations</span>
          <div className="text-2xl font-extrabold text-slate-900 mt-1">{tenants.length} Companies</div>
          <span className="text-[11px] text-emerald-600 font-bold">100% Data Isolation Active</span>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
          <span className="text-[11px] font-bold text-slate-400 uppercase">Total Tenant Projects</span>
          <div className="text-2xl font-extrabold text-blue-600 mt-1">184 Live Sites</div>
          <span className="text-[11px] text-slate-500 font-medium">Across India & SE Asia</span>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
          <span className="text-[11px] font-bold text-slate-400 uppercase">Average License Size</span>
          <div className="text-2xl font-extrabold text-purple-600 mt-1">98 Users / Tenant</div>
          <span className="text-[11px] text-slate-500 font-medium">Enterprise Pro Standard</span>
        </div>
      </div>

      {/* Tenants Table View */}
      <div className="bg-white p-6 md:p-7 rounded-3xl border border-slate-200/80 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-2">
            {['All', 'Enterprise', 'Growth', 'Trial'].map((p) => (
              <button
                key={p}
                onClick={() => setFilterPlan(p)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                  filterPlan === p
                    ? 'bg-slate-900 text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {p}
              </button>
            ))}
          </div>

          <div className="relative">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search companies..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 pr-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:bg-white"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-100 text-[11px] font-bold uppercase tracking-wider text-slate-400 bg-slate-50/50">
                <th className="py-3.5 px-4 rounded-l-xl">Tenant Organization</th>
                <th className="py-3.5 px-4">Subscription Plan</th>
                <th className="py-3.5 px-4 text-center">Active Projects</th>
                <th className="py-3.5 px-4 text-center">Licensed Seats</th>
                <th className="py-3.5 px-4">MRR Billed</th>
                <th className="py-3.5 px-4">Workspace Status</th>
                <th className="py-3.5 px-4 text-right rounded-r-xl">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
              {filtered.map((tenant) => (
                <tr key={tenant.id} className="hover:bg-slate-50 transition">
                  <td className="py-4 px-4 font-bold text-slate-900">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-2xl bg-slate-100 flex items-center justify-center text-xl shrink-0">
                        {tenant.logo}
                      </div>
                      <div>
                        <div className="text-xs font-extrabold text-slate-900">{tenant.name}</div>
                        <div className="text-[10px] text-slate-400 font-normal">{tenant.id} • Auto-renews {tenant.renewal}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <span className="px-2.5 py-1 rounded-xl text-[11px] font-bold bg-blue-50 text-blue-700 border border-blue-200/60">
                      {tenant.plan}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-center font-extrabold text-slate-900">
                    {tenant.projects}
                  </td>
                  <td className="py-4 px-4 text-center font-extrabold text-slate-900">
                    {tenant.users}
                  </td>
                  <td className="py-4 px-4 font-extrabold text-emerald-700">
                    {tenant.mrr}
                  </td>
                  <td className="py-4 px-4">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold ${
                      tenant.status.includes('Active')
                        ? 'bg-emerald-50 text-emerald-700'
                        : 'bg-amber-50 text-amber-700'
                    }`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${
                        tenant.status.includes('Active') ? 'bg-emerald-500' : 'bg-amber-500'
                      }`}></span>
                      {tenant.status}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-right">
                    <button
                      onClick={() => setSelectedTenant(tenant)}
                      className="px-3.5 py-1.5 bg-slate-100 hover:bg-slate-900 hover:text-white rounded-xl text-slate-700 font-bold text-[11px] transition"
                    >
                      Inspect Tenant
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Tenant Details Modal */}
      {selectedTenant && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-200 p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <span className="text-2xl">{selectedTenant.logo}</span>
                <div>
                  <h3 className="font-extrabold text-sm text-slate-900">{selectedTenant.name}</h3>
                  <p className="text-[11px] text-slate-400">{selectedTenant.id} • {selectedTenant.plan}</p>
                </div>
              </div>
              <button onClick={() => setSelectedTenant(null)} className="p-1 text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs bg-slate-50 p-4 rounded-2xl">
              <div>
                <span className="text-slate-400 font-bold text-[10px] uppercase">Database Container</span>
                <p className="font-bold text-slate-800">PostgreSQL Tenant_Cluster_#48</p>
              </div>
              <div>
                <span className="text-slate-400 font-bold text-[10px] uppercase">Monthly Revenue</span>
                <p className="font-bold text-emerald-600">{selectedTenant.mrr}</p>
              </div>
              <div>
                <span className="text-slate-400 font-bold text-[10px] uppercase">Storage Consumed</span>
                <p className="font-bold text-slate-800">420 GB / 2,000 GB</p>
              </div>
              <div>
                <span className="text-slate-400 font-bold text-[10px] uppercase">Primary Admin Contact</span>
                <p className="font-bold text-slate-800">admin@{selectedTenant.name.toLowerCase().replace(/[^a-z]/g, '')}.com</p>
              </div>
            </div>

            <div className="pt-2 flex justify-end gap-3">
              <button
                onClick={() => setSelectedTenant(null)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 rounded-xl text-xs font-bold text-slate-700 transition"
              >
                Close Inspector
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Provision New Tenant Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl border border-slate-200 p-6 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <h3 className="font-extrabold text-sm text-slate-900">Provision Company Tenant</h3>
              <button onClick={() => setShowCreateModal(false)} className="p-1 text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateTenant} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Company / Organization Legal Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Larsen & Mega Infrastructure Ltd"
                  value={newOrgName}
                  onChange={(e) => setNewOrgName(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:bg-white"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Plan Tier</label>
                <select className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl">
                  <option>Enterprise Scale ($1,299/mo)</option>
                  <option>Growth Tier ($599/mo)</option>
                  <option>Starter Construction ($199/mo)</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Database Region</label>
                <select className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl">
                  <option>Asia Pacific — Mumbai (ap-south-1)</option>
                  <option>Asia Pacific — Singapore (ap-southeast-1)</option>
                  <option>Middle East — Dubai (me-central-1)</option>
                </select>
              </div>

              <div className="pt-2 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2 bg-slate-100 rounded-xl text-xs font-semibold text-slate-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow"
                >
                  Initialize Tenant Workspace
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
