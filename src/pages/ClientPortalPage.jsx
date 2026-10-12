import React, { useState } from 'react';
import {
  Users,
  CheckCircle2,
  Clock,
  FileText,
  DollarSign,
  Download,
  ExternalLink,
  ShieldCheck,
  Building,
  Calendar,
  Eye,
  Check,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { clientPortalData } from '../data/mockData';
import { Link } from 'react-router-dom';

export default function ClientPortalPage() {
  const [approvals, setApprovals] = useState([
    {
      id: "AP-201",
      title: "Change Order CO-013: Italian Marble upgrade for Main Lobby",
      amount: "$48,000",
      timeImpact: "0 days schedule impact",
      status: "Pending Your Approval",
      docRef: "CO-013-Spec-v2.pdf",
    },
    {
      id: "AP-202",
      title: "Architectural Drawing Revision A-204 (Balcony Railing Glass Spec)",
      amount: "Included in BOQ",
      timeImpact: "No variance",
      status: "Approved",
      docRef: "DWG-A204-Rev3.dwg",
    },
  ]);

  const handleApprove = (id) => {
    setApprovals(prev =>
      prev.map(item => item.id === id ? { ...item, status: 'Approved' } : item)
    );
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="p-7 md:p-8 rounded-3xl bg-gradient-to-r from-emerald-950 via-[#172B4D] to-slate-900 text-white shadow-xl relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-4 border border-gray-800">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-extrabold border border-emerald-500/30 mb-2">
            <ShieldCheck className="w-3.5 h-3.5" /> Certified External Client Portal
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">
            {clientPortalData.clientName}
          </h1>
          <p className="text-xs md:text-sm text-slate-300 mt-1 font-medium">
            Logged in as <span className="text-white font-bold">{clientPortalData.representative}</span> • Project: {clientPortalData.projectName} ({clientPortalData.projectCode})
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="bg-white/10 backdrop-blur-md px-5 py-3 rounded-2xl border border-white/15 text-center">
            <span className="text-[11px] text-slate-300 uppercase font-bold">Certified Completion</span>
            <div className="text-2xl font-black text-emerald-400 mt-0.5">
              {clientPortalData.certifiedProgress}
            </div>
          </div>
        </div>
      </div>

      {/* 3 Metric Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
            <Calendar className="w-6 h-6" />
          </div>
          <div>
            <div className="text-xs font-bold text-slate-400 uppercase">Upcoming Target Milestone</div>
            <div className="text-sm font-extrabold text-slate-900 mt-0.5">{clientPortalData.nextMilestone}</div>
            <div className="text-[11px] text-blue-600 font-semibold">{clientPortalData.targetMilestoneDate}</div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <div>
            <div className="text-xs font-bold text-slate-400 uppercase">Inspected Quality Stages</div>
            <div className="text-sm font-extrabold text-slate-900 mt-0.5">{clientPortalData.inspectedStagesCount} Verified Sign-offs</div>
            <div className="text-[11px] text-emerald-600 font-semibold">Zero Critical Defects</div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center font-bold">
            <FileText className="w-6 h-6" />
          </div>
          <div>
            <div className="text-xs font-bold text-slate-400 uppercase">Shared Drawings & Specs</div>
            <div className="text-sm font-extrabold text-slate-900 mt-0.5">{clientPortalData.approvedDrawingsCount} BIM Documents</div>
            <div className="text-[11px] text-purple-600 font-semibold">Revision A-201 active</div>
          </div>
        </div>
      </div>

      {/* Main Grid: Milestones Schedule + Pending Approvals */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Milestones Schedule */}
        <div className="lg:col-span-7 bg-white p-6 md:p-7 rounded-3xl border border-gray-200 shadow-xs">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="text-base font-extrabold text-slate-900">Official Project Milestones & Verification</h2>
              <p className="text-xs text-slate-400 font-medium">Timeline certified by Principal Structural Consultant</p>
            </div>
            <Link
              to="/client-portal/milestones"
              className="text-xs font-bold text-emerald-600 hover:text-emerald-700 flex items-center gap-1"
            >
              Full Timeline <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="space-y-3">
            {clientPortalData.milestones.map((m, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-2xl bg-white border border-gray-200 hover:border-gray-300 flex items-center justify-between text-xs transition shadow-2xs"
              >
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-xl flex items-center justify-center font-bold text-xs ${
                    m.status === 'Completed'
                      ? 'bg-emerald-100 text-emerald-700'
                      : m.status.includes('Progress')
                      ? 'bg-blue-100 text-blue-700'
                      : 'bg-slate-100 text-slate-500'
                  }`}>
                    {idx + 1}
                  </div>
                  <div>
                    <h4 className="font-extrabold text-slate-900 text-xs">{m.name}</h4>
                    <span className="text-[11px] text-slate-400 font-medium">Target: {m.date}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                    m.status === 'Completed'
                      ? 'bg-emerald-100 text-emerald-800'
                      : m.status.includes('Progress')
                      ? 'bg-blue-100 text-blue-800'
                      : 'bg-slate-100 text-slate-600'
                  }`}>
                    {m.status}
                  </span>
                  {m.verified && (
                    <span className="hidden sm:inline-flex items-center gap-1 text-[11px] font-bold text-emerald-600">
                      <CheckCircle2 className="w-3.5 h-3.5" /> QA Certified
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Client Approvals & Sign-off Card */}
        <div className="lg:col-span-5 bg-white p-6 md:p-7 rounded-3xl border border-gray-200 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-base font-extrabold text-slate-900">Owner Action Requests</h2>
                <p className="text-xs text-slate-400 font-medium">Items awaiting property owner authorization</p>
              </div>
              <span className="text-xs bg-amber-50 text-amber-700 px-2.5 py-0.5 rounded-full font-bold border border-amber-200">
                1 Pending
              </span>
            </div>

            <div className="space-y-3.5">
              {approvals.map((item) => (
                <div
                  key={item.id}
                  className="p-4 rounded-2xl bg-white border border-gray-200 text-xs space-y-2.5 shadow-2xs hover:border-gray-300 transition"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-100 text-blue-700">
                        {item.id}
                      </span>
                      <h4 className="font-extrabold text-slate-900 text-xs mt-1.5 leading-snug">
                        {item.title}
                      </h4>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1 border-t border-gray-100">
                    <span>Impact: <strong className="text-slate-900">{item.amount}</strong></span>
                    <span>{item.timeImpact}</span>
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <span className="text-[11px] text-slate-500 flex items-center gap-1">
                      <FileText className="w-3.5 h-3.5 text-blue-600" /> {item.docRef}
                    </span>

                    {item.status === 'Approved' ? (
                      <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-600">
                        <Check className="w-4 h-4" /> Approved
                      </span>
                    ) : (
                      <button
                        onClick={() => handleApprove(item.id)}
                        className="px-4 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-xs transition"
                      >
                        Approve Change
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Site Drone Video Banner */}
          <div className="mt-5 p-4 rounded-2xl bg-gradient-to-r from-blue-900 to-indigo-900 text-white flex items-center justify-between border border-blue-800">
            <div>
              <p className="text-xs font-bold">Bi-Weekly 4K Drone Flight Video</p>
              <p className="text-[10px] text-slate-300">Recorded May 18, 2025 • High Altitude Elevation</p>
            </div>
            <button className="px-3 py-1.5 bg-white/20 hover:bg-white/30 rounded-xl text-xs font-bold text-white transition flex items-center gap-1">
              <Eye className="w-3.5 h-3.5" /> Watch
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Section: Client Billing & Invoices */}
      <div className="bg-white p-6 md:p-7 rounded-3xl border border-gray-200 shadow-xs">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-base font-extrabold text-slate-900">Milestone Payment Applications</h2>
            <p className="text-xs text-slate-400 font-medium">Certified by Quantity Surveyor per FIDIC contract terms</p>
          </div>
          <Link
            to="/client-portal/finances"
            className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1"
          >
            All Statements & Invoices <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-gray-100 text-[11px] font-bold uppercase tracking-wider text-slate-400 bg-slate-50/50">
                <th className="py-3 px-4 rounded-l-xl">Invoice Ref</th>
                <th className="py-3 px-4">Milestone Description</th>
                <th className="py-3 px-4">Certified Amount</th>
                <th className="py-3 px-4">Due Date</th>
                <th className="py-3 px-4">Payment Status</th>
                <th className="py-3 px-4 text-right rounded-r-xl">Receipt</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 font-medium text-slate-700">
              {clientPortalData.billingMilestones.map((inv) => (
                <tr key={inv.invoiceNo} className="hover:bg-slate-50 transition">
                  <td className="py-3.5 px-4 font-bold text-blue-700">{inv.invoiceNo}</td>
                  <td className="py-3.5 px-4 font-bold text-slate-900">{inv.description}</td>
                  <td className="py-3.5 px-4 font-extrabold text-slate-900">{inv.amount}</td>
                  <td className="py-3.5 px-4 text-slate-500">{inv.date}</td>
                  <td className="py-3.5 px-4">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                      inv.status === 'Paid'
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-amber-100 text-amber-800'
                    }`}>
                      {inv.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <button className="text-xs font-bold text-slate-600 hover:text-blue-600 flex items-center gap-1 ml-auto">
                      <Download className="w-3.5 h-3.5" /> PDF
                    </button>
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
