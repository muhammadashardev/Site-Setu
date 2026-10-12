import React, { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import {
  DollarSign,
  TrendingDown,
  TrendingUp,
  FileText,
  Download,
  Plus,
  CheckCircle2,
  AlertCircle,
  PieChart,
  ArrowUpRight
} from 'lucide-react';
import { financialSummary } from '../data/mockData';

export default function FinanceCostPage() {
  const { openQuickAction } = useOutletContext();
  const [data, setData] = useState(financialSummary);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-[#172B4D] tracking-tight">
            Estimating, Budget & Cost Tracking
          </h1>
          <p className="text-xs md:text-sm text-slate-500 mt-1">
            Real-time financial variance, committed purchase orders, BOQ breakdown, and change orders for Skyline Residences.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition flex items-center gap-1.5">
            <Download className="w-3.5 h-3.5" /> Export Cost Ledger
          </button>
          <button
            onClick={() => openQuickAction('log-expense')}
            className="flex items-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-md shadow-blue-500/20 transition"
          >
            <Plus className="w-4 h-4" /> Log Expense
          </button>
        </div>
      </div>

      {/* 4 Financial Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
          <span className="text-[11px] font-bold text-slate-400 uppercase">Total Contract Value</span>
          <div className="text-2xl font-extrabold text-slate-900 mt-1">${(data.totalContract / 1000000).toFixed(2)}M</div>
          <span className="text-[11px] text-slate-500 font-medium">Skyline Realty Agreed BOQ</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
          <span className="text-[11px] font-bold text-slate-400 uppercase">Spent To Date (Actual)</span>
          <div className="text-2xl font-extrabold text-blue-600 mt-1">${(data.spentToDate / 1000000).toFixed(2)}M</div>
          <span className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1">
            <TrendingDown className="w-3.5 h-3.5" /> 2.4% Under Budget Threshold
          </span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
          <span className="text-[11px] font-bold text-slate-400 uppercase">Committed POs & Subcontracts</span>
          <div className="text-2xl font-extrabold text-purple-600 mt-1">${(data.committedOrders / 1000).toFixed(0)}k</div>
          <span className="text-[11px] text-slate-500 font-medium">14 Active Purchase Orders</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
          <span className="text-[11px] font-bold text-slate-400 uppercase">Projected Net Margin</span>
          <div className="text-2xl font-extrabold text-emerald-600 mt-1">{data.profitMarginPercent}%</div>
          <span className="text-[11px] text-emerald-600 font-semibold">
            +${(data.projectedProfit / 1000).toFixed(0)}k Projected Profit
          </span>
        </div>
      </div>

      {/* BOQ Cost Categories Breakdown */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs">
        <h2 className="text-base font-extrabold text-slate-900 mb-4">
          Bill of Quantities (BOQ) Cost Codes & Budget vs Actual
        </h2>

        <div className="space-y-4">
          {data.categories.map((cat, idx) => (
            <div key={idx} className="p-4 rounded-2xl bg-slate-50 border border-gray-200 space-y-2">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs gap-1">
                <span className="font-bold text-slate-900">{cat.name}</span>
                <div className="flex items-center gap-4 text-slate-600">
                  <span>Actual: <strong className="text-slate-900">${(cat.actual / 1000).toFixed(0)}k</strong></span>
                  <span>Budget: <strong className="text-slate-900">${(cat.budget / 1000).toFixed(0)}k</strong></span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800">
                    {cat.status}
                  </span>
                </div>
              </div>

              <div className="w-full bg-slate-200 h-2.5 rounded-full overflow-hidden">
                <div
                  style={{ width: `${cat.pct}%` }}
                  className="bg-blue-600 h-full rounded-full transition-all duration-500"
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Change Orders Register */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-base font-extrabold text-slate-900">Change Orders & Scope Variance</h2>
            <p className="text-xs text-slate-500">Formally tracked revisions impacting price or delivery baseline</p>
          </div>
          <button className="text-xs font-bold text-blue-600 hover:text-blue-700">
            + Request Change Order
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-100 text-[11px] font-bold uppercase tracking-wider text-slate-400 bg-slate-50/50">
                <th className="py-3 px-4">Change ID</th>
                <th className="py-3 px-4">Description</th>
                <th className="py-3 px-4">Cost Impact</th>
                <th className="py-3 px-4">Schedule Impact</th>
                <th className="py-3 px-4 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
              {data.changeOrders.map((co) => (
                <tr key={co.id} className="hover:bg-slate-50 transition">
                  <td className="py-3.5 px-4 font-bold text-blue-700">{co.id}</td>
                  <td className="py-3.5 px-4 font-bold text-slate-900">{co.title}</td>
                  <td className="py-3.5 px-4 font-extrabold text-emerald-700">{co.costImpact}</td>
                  <td className="py-3.5 px-4 text-slate-500">{co.timeImpact}</td>
                  <td className="py-3.5 px-4 text-right">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                      co.status === 'Approved'
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-amber-100 text-amber-800'
                    }`}>
                      {co.status}
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
