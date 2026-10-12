import React, { useState } from 'react';
import {
  ShieldCheck,
  Search,
  Filter,
  Download,
  AlertTriangle,
  Lock,
  User,
  Clock,
  CheckCircle2
} from 'lucide-react';

export default function SuperAdminAuditLogs() {
  const [filterType, setFilterType] = useState('All');
  const [search, setSearch] = useState('');

  const logs = [
    { id: 'EVT-9021', actor: 'superadmin@sitesetu.com', action: 'Enabled 3D BIM Viewer Feature Flag', target: 'Global SaaS Config', ip: '103.24.11.89', time: '12m ago', severity: 'Info' },
    { id: 'EVT-9020', actor: 'rohit.sharma@apexinfra.com', action: 'Exported Financial BOQ Ledger', target: 'PRJ-1001 (Skyline Residences)', ip: '49.36.128.4', time: '45m ago', severity: 'Security' },
    { id: 'EVT-9019', actor: 'billing-daemon@sitesetu.com', action: 'Auto-Billed Enterprise Subscription', target: 'Apex InfraTech ($4,500)', ip: 'Internal Worker', time: '2h ago', severity: 'Info' },
    { id: 'EVT-9018', actor: 'admin@falconcontractors.com', action: 'Provisioned New Site Supervisor Account', target: 'Falcon Civil Workspace', ip: '157.34.80.12', time: '5h ago', severity: 'Info' },
    { id: 'EVT-9017', actor: 'unknown-agent@185.220.101.5', action: 'Failed MFA Challenge (3 Attempts Blocked)', target: 'Super Admin Login Gateway', ip: '185.220.101.5', time: '8h ago', severity: 'Critical' },
  ];

  const filtered = logs.filter(
    (l) => (filterType === 'All' || l.severity === filterType) &&
           (l.action.toLowerCase().includes(search.toLowerCase()) || l.actor.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="text-xs font-bold text-amber-600 mb-1 flex items-center gap-1.5">
            <span>Platform Administration • SOC-2 Compliance</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-[#172B4D] tracking-tight">
            Security & Administrative Audit Logs
          </h1>
          <p className="text-xs md:text-sm text-slate-500 mt-1">
            Immutable audit record of all tenant modifications, permission adjustments, authentication attempts, and financial exports.
          </p>
        </div>

        <button className="flex items-center gap-1.5 px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-2xl text-xs font-bold transition shadow">
          <Download className="w-3.5 h-3.5" /> Download Immutable Log (JSON/CSV)
        </button>
      </div>

      {/* Audit Log Table Card */}
      <div className="bg-white p-6 md:p-7 rounded-3xl border border-slate-200/80 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-2">
            {['All', 'Info', 'Security', 'Critical'].map((s) => (
              <button
                key={s}
                onClick={() => setFilterType(s)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                  filterType === s
                    ? 'bg-slate-900 text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {s}
              </button>
            ))}
          </div>

          <div className="relative">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search actors, events or IPs..."
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
                <th className="py-3 px-4">Event Ref</th>
                <th className="py-3 px-4">Actor</th>
                <th className="py-3 px-4">Action Event</th>
                <th className="py-3 px-4">Target Resource</th>
                <th className="py-3 px-4">Source IP</th>
                <th className="py-3 px-4">Timestamp</th>
                <th className="py-3 px-4 text-right">Severity</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
              {filtered.map((log) => (
                <tr key={log.id} className="hover:bg-slate-50 transition">
                  <td className="py-3.5 px-4 font-bold text-blue-700">{log.id}</td>
                  <td className="py-3.5 px-4 font-bold text-slate-900">{log.actor}</td>
                  <td className="py-3.5 px-4 text-slate-800">{log.action}</td>
                  <td className="py-3.5 px-4 text-slate-500 font-medium">{log.target}</td>
                  <td className="py-3.5 px-4 font-mono text-slate-500 text-[11px]">{log.ip}</td>
                  <td className="py-3.5 px-4 text-slate-400">{log.time}</td>
                  <td className="py-3.5 px-4 text-right">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                      log.severity === 'Critical'
                        ? 'bg-rose-100 text-rose-800 animate-pulse'
                        : log.severity === 'Security'
                        ? 'bg-amber-100 text-amber-800'
                        : 'bg-blue-100 text-blue-800'
                    }`}>
                      {log.severity}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
