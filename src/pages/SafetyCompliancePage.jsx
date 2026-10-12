import React from 'react';
import { useOutletContext } from 'react-router-dom';
import {
  ShieldCheck,
  ShieldAlert,
  AlertTriangle,
  CheckCircle2,
  Calendar,
  FileCheck2,
  HardHat,
  Award,
  Plus
} from 'lucide-react';

export default function SafetyCompliancePage() {
  const { openQuickAction } = useOutletContext();

  const observations = [
    { id: 'SAFE-101', type: 'Unsafe Condition', desc: 'Temporary edge barricade detached at 4th floor balcony', location: 'Tower A, Floor 4', status: 'Rectified', severity: 'High' },
    { id: 'SAFE-102', type: 'PPE Compliance', desc: '2 helper workers without chin straps on safety helmets', location: 'Basement Excavation', status: 'Warned & Corrected', severity: 'Minor' },
    { id: 'SAFE-103', type: 'Electrical', desc: 'Extension cord junction box exposed to water curing spray', location: 'Floor 5 Slab', status: 'Immediate Stop', severity: 'Critical' },
  ];

  const certificates = [
    { name: 'Potain Tower Crane #1 Load Test Certificate', authority: 'Bureau Veritas', expiry: 'Nov 2025', status: 'Valid' },
    { name: 'Site Scaffolding Structural Stability Sign-off', authority: 'Apex Civil Audits', expiry: 'Aug 2025', status: 'Valid' },
    { name: 'Fire Safety NOC & Extinguisher Hydrotest', authority: 'State Fire Dept', expiry: 'Jan 2026', status: 'Valid' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-[#172B4D] tracking-tight">
            Safety, HSE & Regulatory Compliance
          </h1>
          <p className="text-xs md:text-sm text-slate-500 mt-1">
            Zero-accident safety streak, field observations, tool-box talk records, and heavy equipment certifications.
          </p>
        </div>

        <button
          onClick={() => openQuickAction('safety')}
          className="flex items-center gap-1.5 px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-bold shadow-md shadow-rose-500/20 transition"
        >
          <Plus className="w-4 h-4" /> Log Safety Observation
        </button>
      </div>

      {/* 4 HSE Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
          <span className="text-[11px] font-bold text-slate-400 uppercase">Accident-Free Streak</span>
          <div className="text-2xl font-extrabold text-emerald-600 mt-1">184 Days</div>
          <span className="text-[11px] text-slate-500 font-medium">Safe site hours: 248,000</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
          <span className="text-[11px] font-bold text-slate-400 uppercase">HSE Compliance Rating</span>
          <div className="text-2xl font-extrabold text-blue-600 mt-1">A+ (98.4%)</div>
          <span className="text-[11px] text-emerald-600 font-semibold">Tier 1 Contractor Standard</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
          <span className="text-[11px] font-bold text-slate-400 uppercase">Toolbox Talks This Month</span>
          <div className="text-2xl font-extrabold text-purple-600 mt-1">26 Sessions</div>
          <span className="text-[11px] text-slate-500 font-medium">100% Worker Attendance</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
          <span className="text-[11px] font-bold text-slate-400 uppercase">Active First Aid Officers</span>
          <div className="text-2xl font-extrabold text-slate-900 mt-1">4 Certified</div>
          <span className="text-[11px] text-slate-500 font-medium">On-duty across all shifts</span>
        </div>
      </div>

      {/* Grid: Observations + Certifications */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-7 bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs">
          <h2 className="text-base font-extrabold text-slate-900 mb-4">
            Recent HSE Safety Observations & Corrective Actions
          </h2>

          <div className="space-y-3">
            {observations.map((obs) => (
              <div key={obs.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-150 space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-extrabold text-slate-900">{obs.id} • {obs.type}</span>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                    obs.severity === 'Critical'
                      ? 'bg-rose-100 text-rose-700'
                      : 'bg-amber-100 text-amber-700'
                  }`}>
                    {obs.severity}
                  </span>
                </div>
                <p className="text-slate-700">{obs.desc}</p>
                <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1 border-t border-slate-200">
                  <span>{obs.location}</span>
                  <span className="font-bold text-emerald-600 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> {obs.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-5 bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs">
          <h2 className="text-base font-extrabold text-slate-900 mb-4">
            Equipment & Plant Statutory Certifications
          </h2>

          <div className="space-y-3">
            {certificates.map((cert, idx) => (
              <div key={idx} className="p-4 rounded-2xl bg-slate-50 border border-slate-150 text-xs space-y-1.5">
                <div className="flex items-start justify-between">
                  <h4 className="font-bold text-slate-900 leading-snug">{cert.name}</h4>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800 shrink-0 ml-2">
                    {cert.status}
                  </span>
                </div>
                <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1 border-t border-slate-200">
                  <span>Auditor: {cert.authority}</span>
                  <span className="font-semibold text-slate-700">Exp: {cert.expiry}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
