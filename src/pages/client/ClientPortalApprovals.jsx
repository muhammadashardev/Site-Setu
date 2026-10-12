import React, { useState } from 'react';
import {
  FileCheck2,
  Check,
  X,
  Clock,
  DollarSign,
  AlertTriangle,
  FileText,
  ShieldCheck,
  Sparkles,
  Download
} from 'lucide-react';

export default function ClientPortalApprovals() {
  const [approvals, setApprovals] = useState([
    {
      id: "CO-013",
      title: "Italian Statuario Marble Upgrade for Entrance Lobby & Club House",
      contractor: "Apex InfraTech Solutions",
      costImpact: "+$48,000",
      timeImpact: "0 Days (No schedule delay)",
      requestedDate: "May 15, 2025",
      status: "Pending Action",
      priority: "Urgent",
      reason: "Client design team requested premium natural vein marble upgrade over standard imported vitrified tiles.",
      docRef: "CO-013-Marble-Spec.pdf",
    },
    {
      id: "SUB-091",
      title: "Balcony Glass Balustrade 12mm Toughened Laminated Tint Selection",
      contractor: "Saint-Gobain / BarBenders",
      costImpact: "$0 (Within BOQ allowance)",
      timeImpact: "0 Days",
      requestedDate: "May 12, 2025",
      status: "Pending Action",
      priority: "Medium",
      reason: "Selection between Clear Frosted vs Euro-Bronze Tinted laminated glass panels.",
      docRef: "SUB-091-Glass-Samples.pdf",
    },
    {
      id: "CO-012",
      title: "Additional High-Density Podium Waterproofing Membrane Layer",
      contractor: "Apex InfraTech Solutions",
      costImpact: "+$24,500",
      timeImpact: "+3 Days",
      requestedDate: "May 02, 2025",
      status: "Approved",
      priority: "High",
      reason: "Recommended by waterproofing consultant for landscape podium drainage.",
      docRef: "CO-012-Signed.pdf",
    },
  ]);

  const [signModal, setSignModal] = useState(null);
  const [signedName, setSignedName] = useState('Rajiv Mehta');

  const handleSignApprove = (e) => {
    e.preventDefault();
    if (!signModal) return;
    setApprovals((prev) =>
      prev.map((item) =>
        item.id === signModal.id ? { ...item, status: 'Approved' } : item
      )
    );
    setSignModal(null);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="text-xs font-bold text-emerald-600 mb-1 flex items-center gap-1.5">
            <span>Skyline Residences (PRJ-1001) • Owner Decisions</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-[#172B4D] tracking-tight">
            Pending Owner Approvals & Change Orders
          </h1>
          <p className="text-xs md:text-sm text-slate-500 mt-1">
            Review design finish selections, material upgrades, and commercial change requests requiring owner authorization.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-bold px-3 py-1.5 rounded-xl bg-amber-50 text-amber-800 border border-amber-200">
            2 Items Requiring Your Signature
          </span>
        </div>
      </div>

      {/* Main Approvals Grid */}
      <div className="grid grid-cols-1 gap-5">
        {approvals.map((item) => (
          <div
            key={item.id}
            className={`bg-white rounded-3xl p-6 md:p-7 border-2 transition-all shadow-xs space-y-4 ${
              item.status === 'Pending Action'
                ? 'border-amber-300 hover:shadow-md'
                : 'border-slate-200/80'
            }`}
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <span className="text-xs font-black px-2.5 py-1 rounded-xl bg-blue-100 text-blue-800">
                  {item.id}
                </span>
                <h3 className="font-extrabold text-base text-slate-900 leading-snug">
                  {item.title}
                </h3>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <span className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold ${
                  item.status === 'Approved'
                    ? 'bg-emerald-100 text-emerald-800'
                    : 'bg-amber-100 text-amber-800 animate-pulse'
                }`}>
                  {item.status}
                </span>
                <span className="text-[11px] text-slate-400 font-medium">Req: {item.requestedDate}</span>
              </div>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed bg-slate-50 p-4 rounded-2xl border border-gray-200">
              {item.reason}
            </p>

            {/* Impact specs & doc ref */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div className="p-3 bg-slate-50 rounded-2xl">
                <span className="text-slate-400 font-bold text-[10px] uppercase">Cost Impact</span>
                <p className="font-extrabold text-emerald-700 text-sm mt-0.5">{item.costImpact}</p>
              </div>
              <div className="p-3 bg-slate-50 rounded-2xl">
                <span className="text-slate-400 font-bold text-[10px] uppercase">Schedule Impact</span>
                <p className="font-bold text-slate-800 text-sm mt-0.5">{item.timeImpact}</p>
              </div>
              <div className="p-3 bg-slate-50 rounded-2xl flex items-center justify-between">
                <div>
                  <span className="text-slate-400 font-bold text-[10px] uppercase">Attached Spec</span>
                  <p className="font-bold text-blue-600 mt-0.5">{item.docRef}</p>
                </div>
                <Download className="w-4 h-4 text-slate-400" />
              </div>
            </div>

            {/* Actions footer */}
            <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <span className="text-[11px] text-slate-400 font-medium">
                Contractor: {item.contractor}
              </span>

              {item.status === 'Approved' ? (
                <div className="flex items-center gap-1.5 text-xs font-extrabold text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200">
                  <Check className="w-4 h-4" /> Electronically Signed by Rajiv Mehta
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => alert("Revision feedback sent to contractor.")}
                    className="px-4 py-2 bg-slate-100 hover:bg-slate-200 rounded-xl text-xs font-bold text-slate-700 transition"
                  >
                    Request Revision
                  </button>
                  <button
                    onClick={() => setSignModal(item)}
                    className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-extrabold shadow transition flex items-center gap-1.5"
                  >
                    <ShieldCheck className="w-4 h-4" /> Authorize & Sign
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Digital Signature Modal */}
      {signModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl border border-slate-200 p-6 space-y-4 animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-600" />
                <h3 className="font-extrabold text-sm text-slate-900">Authorize Change Order</h3>
              </div>
              <button onClick={() => setSignModal(null)} className="p-1 text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-slate-600">
              You are applying an official digital signature for <strong>{signModal.id}: {signModal.title}</strong> with financial impact of <strong>{signModal.costImpact}</strong>.
            </p>

            <form onSubmit={handleSignApprove} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Authorized Signer Name</label>
                <input
                  type="text"
                  required
                  value={signedName}
                  onChange={(e) => setSignedName(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-900"
                />
              </div>

              <div className="p-3 bg-slate-100 rounded-2xl border border-slate-200 text-center font-serif italic text-base text-slate-700 select-none">
                Rajiv Mehta
              </div>

              <div className="flex items-center gap-2 text-[11px] text-slate-500 font-medium">
                <input type="checkbox" required defaultChecked className="rounded text-emerald-600" />
                <span>I confirm scope and commercial impact per FIDIC conditions.</span>
              </div>

              <div className="pt-2 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setSignModal(null)}
                  className="px-4 py-2 bg-slate-100 rounded-xl font-bold text-slate-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold shadow"
                >
                  Apply Digital Signature
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
