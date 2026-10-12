import React, { useState } from 'react';
import {
  Award,
  CheckCircle2,
  Clock,
  Calendar,
  Download,
  FileCheck2,
  ShieldCheck,
  Building,
  ChevronRight,
  Sparkles,
  ExternalLink
} from 'lucide-react';
import { clientPortalData } from '../../data/mockData';

export default function ClientPortalMilestones() {
  const [selectedMilestone, setSelectedMilestone] = useState(clientPortalData.milestones[3]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="text-xs font-bold text-emerald-600 mb-1 flex items-center gap-1.5">
            <span>Skyline Realty Holdings Ltd • Investor & Owner Portal</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-[#172B4D] tracking-tight">
            Certified Milestones & Schedule Verification
          </h1>
          <p className="text-xs md:text-sm text-slate-500 mt-1">
            Official construction progress certified by Principal Structural Consultant & Chartered Quantity Surveyor.
          </p>
        </div>

        <button className="flex items-center gap-1.5 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl text-xs font-bold shadow-md shadow-emerald-600/20 transition">
          <Download className="w-3.5 h-3.5" /> Download Stage Certificates (PDF)
        </button>
      </div>

      {/* 3 Executive Milestone Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs">
          <span className="text-[11px] font-bold text-slate-400 uppercase">Certified Physical Progress</span>
          <div className="text-3xl font-black text-emerald-600 mt-1">{clientPortalData.certifiedProgress}</div>
          <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-lg mt-2 inline-block">
            Ahead of baseline by 5 days
          </span>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs">
          <span className="text-[11px] font-bold text-slate-400 uppercase">Current Stage</span>
          <div className="text-2xl font-black text-slate-900 mt-1">Superstructure Floor 6</div>
          <span className="text-xs text-slate-500 font-medium mt-1 block">
            Target Completion: June 15, 2025
          </span>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs">
          <span className="text-[11px] font-bold text-slate-400 uppercase">Independent Audits</span>
          <div className="text-2xl font-black text-blue-600 mt-1">19 Sign-offs</div>
          <span className="text-xs text-slate-500 font-medium mt-1 block">
            Third-party QA bureau verified
          </span>
        </div>
      </div>

      {/* Main Milestones Timeline Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Timeline Column */}
        <div className="lg:col-span-8 bg-white p-6 md:p-7 rounded-3xl border border-slate-200/80 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <h2 className="text-base font-extrabold text-slate-900">
              Contractual Milestones Timeline
            </h2>
            <span className="text-xs font-bold text-slate-400">FIDIC Red Book Standard</span>
          </div>

          <div className="space-y-3.5">
            {clientPortalData.milestones.map((m, idx) => {
              const isSelected = selectedMilestone?.name === m.name;
              return (
                <div
                  key={idx}
                  onClick={() => setSelectedMilestone(m)}
                  className={`p-4 rounded-2xl border transition cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                    isSelected
                      ? 'bg-emerald-50/50 border-emerald-300 shadow-xs'
                      : 'bg-slate-50/60 border-gray-200 hover:bg-slate-100/60'
                  }`}
                >
                  <div className="flex items-center gap-3.5">
                    <div className={`w-9 h-9 rounded-2xl flex items-center justify-center font-black text-xs shrink-0 ${
                      m.status === 'Completed'
                        ? 'bg-emerald-600 text-white shadow-xs'
                        : m.status.includes('Progress')
                        ? 'bg-blue-600 text-white shadow-xs'
                        : 'bg-slate-200 text-slate-600'
                    }`}>
                      {idx + 1}
                    </div>
                    <div>
                      <h4 className="font-extrabold text-slate-900 text-xs">{m.name}</h4>
                      <p className="text-[11px] text-slate-400 font-medium">Scheduled Target: {m.date}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold ${
                      m.status === 'Completed'
                        ? 'bg-emerald-100 text-emerald-800'
                        : m.status.includes('Progress')
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-slate-100 text-slate-600'
                    }`}>
                      {m.status}
                    </span>

                    {m.verified && (
                      <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-600">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Certified
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Milestone Detail Inspector */}
        <div className="lg:col-span-4 bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs flex flex-col justify-between">
          {selectedMilestone ? (
            <div className="space-y-4">
              <div className="pb-3 border-b border-slate-100">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
                  Inspected Milestone
                </span>
                <h3 className="font-extrabold text-base text-slate-900 mt-2">
                  {selectedMilestone.name}
                </h3>
                <p className="text-xs text-slate-500 mt-1">Target Date: {selectedMilestone.date}</p>
              </div>

              <div className="space-y-2.5 text-xs">
                <div className="p-3 bg-slate-50 rounded-2xl border border-gray-200">
                  <span className="text-slate-400 font-bold text-[10px] uppercase">Inspection Report</span>
                  <p className="font-bold text-slate-800 mt-0.5">QC-Report-Floor5-Signed.pdf</p>
                </div>
                <div className="p-3 bg-slate-50 rounded-2xl border border-gray-200">
                  <span className="text-slate-400 font-bold text-[10px] uppercase">Lead QC Engineer</span>
                  <p className="font-bold text-slate-800 mt-0.5">K. Rajagopal (Chief Structural Auditor)</p>
                </div>
                <div className="p-3 bg-slate-50 rounded-2xl border border-gray-200">
                  <span className="text-slate-400 font-bold text-[10px] uppercase">Concrete Cube Compressive Test</span>
                  <p className="font-bold text-emerald-600 mt-0.5">46.2 N/mm² (Exceeds M40 standard)</p>
                </div>
              </div>

              <button className="w-full py-2.5 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5">
                <Download className="w-3.5 h-3.5" /> View Signed Certificate
              </button>
            </div>
          ) : (
            <div className="text-center py-12 text-slate-400 text-xs">
              Select a milestone from the list to view its official quality sign-off.
            </div>
          )}

          <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200 text-xs text-emerald-900 space-y-1">
            <span className="font-extrabold flex items-center gap-1">
              <ShieldCheck className="w-4 h-4 text-emerald-700" /> Tamper-Proof Record
            </span>
            <p className="text-[11px] text-emerald-800">
              All milestone sign-offs are cryptographically logged for investor security.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
