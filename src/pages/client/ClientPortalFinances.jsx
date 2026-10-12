import React from 'react';
import {
  DollarSign,
  FileText,
  Download,
  CheckCircle2,
  Clock,
  TrendingDown,
  Building,
  Receipt,
  ShieldCheck,
  CreditCard
} from 'lucide-react';
import { clientPortalData } from '../../data/mockData';

export default function ClientPortalFinances() {
  const financialCards = [
    { label: "Total Agreed Contract Value", value: "$3,800,000", sub: "Lump Sum BOQ Fixed Price", color: "text-slate-900" },
    { label: "Certified & Billed to Date", value: "$2,356,000", sub: "62% Physical Work Billed", color: "text-blue-600" },
    { label: "Disbursed / Paid Amount", value: "$2,046,000", sub: "All Invoices Cleared by Escrow", color: "text-emerald-600" },
    { label: "Current Balance Due", value: "$310,000", sub: "INV-2025-002 Due May 28, 2025", color: "text-amber-600" },
  ];

  const payApplications = [
    {
      id: "INV-2025-002",
      milestone: "Level 5 Slab & Column Mobilization Certificate",
      certifiedAmount: "$310,000.00",
      retainage: "$15,500.00 (5%)",
      netPayable: "$294,500.00",
      submittedDate: "May 18, 2025",
      dueDate: "May 28, 2025",
      status: "Payment Due in 10 Days",
      qsCert: "QS-Cert-L5-Signed.pdf",
    },
    {
      id: "INV-2025-001",
      milestone: "4th Floor Structural Slab Completion Sign-off",
      certifiedAmount: "$290,000.00",
      retainage: "$14,500.00 (5%)",
      netPayable: "$275,500.00",
      submittedDate: "Apr 25, 2025",
      dueDate: "May 02, 2025",
      status: "Paid",
      qsCert: "Receipt-Cleared-001.pdf",
    },
    {
      id: "INV-2024-004",
      milestone: "Raft Foundation & Basement Retaining Walls",
      certifiedAmount: "$380,000.00",
      retainage: "$19,000.00 (5%)",
      netPayable: "$361,000.00",
      submittedDate: "Apr 05, 2024",
      dueDate: "Apr 20, 2024",
      status: "Paid",
      qsCert: "Receipt-Cleared-004.pdf",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="text-xs font-bold text-emerald-600 mb-1 flex items-center gap-1.5">
            <span>Skyline Residences (PRJ-1001) • Commercial Ledger</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-[#172B4D] tracking-tight">
            Financial Transparency & Milestone Billing
          </h1>
          <p className="text-xs md:text-sm text-slate-500 mt-1">
            Track certified quantity surveyor payment applications, escrow disbursements, retainage withholdings, and receipts.
          </p>
        </div>

        <button className="flex items-center gap-1.5 px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-2xl text-xs font-bold transition shadow">
          <Download className="w-3.5 h-3.5" /> Download Tax Invoice Statement
        </button>
      </div>

      {/* 4 Financial Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {financialCards.map((c, idx) => (
          <div key={idx} className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wide">{c.label}</span>
            <div className={`text-2xl font-black mt-1 ${c.color}`}>{c.value}</div>
            <span className="text-[11px] text-slate-500 font-medium mt-1 block">{c.sub}</span>
          </div>
        ))}
      </div>

      {/* Payment Applications Table Card */}
      <div className="bg-white p-6 md:p-7 rounded-3xl border border-slate-200/80 shadow-xs space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-slate-100">
          <div>
            <h2 className="text-base font-extrabold text-slate-900">
              Contractor Payment Applications (AIA G702 / G703 Standard)
            </h2>
            <p className="text-xs text-slate-400 font-medium">All progress payments certified against physical stage completions</p>
          </div>
          <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
            Escrow Account Synced
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-100 text-[11px] font-bold uppercase tracking-wider text-slate-400 bg-slate-50/50">
                <th className="py-3.5 px-4 rounded-l-xl">Application Ref</th>
                <th className="py-3.5 px-4">Milestone Description</th>
                <th className="py-3.5 px-4">Gross Certified</th>
                <th className="py-3.5 px-4">5% Retainage</th>
                <th className="py-3.5 px-4">Net Payable</th>
                <th className="py-3.5 px-4">Due Date</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right rounded-r-xl">Receipt</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
              {payApplications.map((inv) => (
                <tr key={inv.id} className="hover:bg-slate-50/80 transition">
                  <td className="py-4 px-4 font-bold text-blue-700">{inv.id}</td>
                  <td className="py-4 px-4 font-bold text-slate-900">
                    <div>
                      <span>{inv.milestone}</span>
                      <span className="text-[10px] text-slate-400 block font-normal">QS Cert: {inv.qsCert}</span>
                    </div>
                  </td>
                  <td className="py-4 px-4 font-extrabold text-slate-900">{inv.certifiedAmount}</td>
                  <td className="py-4 px-4 text-slate-500">{inv.retainage}</td>
                  <td className="py-4 px-4 font-black text-emerald-700">{inv.netPayable}</td>
                  <td className="py-4 px-4 text-slate-600 font-medium">{inv.dueDate}</td>
                  <td className="py-4 px-4">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold ${
                      inv.status === 'Paid'
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-amber-100 text-amber-800 animate-pulse'
                    }`}>
                      {inv.status}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-right">
                    <button
                      onClick={() => alert(`Downloading signed certificate for ${inv.id}`)}
                      className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-[11px] font-bold transition flex items-center gap-1 ml-auto"
                    >
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
