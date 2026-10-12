import React from 'react';
import {
  CreditCard,
  DollarSign,
  TrendingUp,
  CheckCircle2,
  Download,
  ShieldCheck,
  Zap,
  Building,
  Sparkles
} from 'lucide-react';
import { superAdminMetrics } from '../../data/mockData';

export default function SuperAdminSubscriptions() {
  const plans = [
    {
      name: "Starter Construction",
      price: "$199",
      billing: "/month",
      activeTenants: 12,
      features: [
        "Up to 3 Active Projects",
        "25 Team Members",
        "Basic Daily Site Logs & Photos",
        "Community Support",
        "50 GB Document Cloud Storage"
      ],
      popular: false,
      color: "border-slate-200",
    },
    {
      name: "Growth Tier",
      price: "$599",
      billing: "/month",
      activeTenants: 17,
      features: [
        "Up to 10 Active Projects",
        "100 Team Members",
        "Gantt Critical Path Scheduling",
        "RFI & Submittals Workflow",
        "Client Portal View",
        "500 GB Storage + Priority Phone Support"
      ],
      popular: true,
      color: "border-blue-500 shadow-md",
    },
    {
      name: "Enterprise Scale",
      price: "$1,299",
      billing: "/month",
      activeTenants: 19,
      features: [
        "Unlimited Construction Projects",
        "Unlimited Seats & Subcontractors",
        "SiteSetu AI Copilot (Full RAG)",
        "3D BIM Model IFC Viewer",
        "Dedicated Database Container",
        "Dedicated Customer Success Director"
      ],
      popular: false,
      color: "border-purple-500",
    },
  ];

  const recentTransactions = [
    { id: 'INV-2025-881', tenant: 'Apex InfraTech Solutions', plan: 'Enterprise Scale', amount: '$4,500.00', date: 'May 18, 2025', status: 'Succeeded' },
    { id: 'INV-2025-880', tenant: 'BuildPro Developers Pvt Ltd', plan: 'Enterprise Scale', amount: '$6,200.00', date: 'May 17, 2025', status: 'Succeeded' },
    { id: 'INV-2025-879', tenant: 'Skyline Global Constructions', plan: 'Growth Tier', amount: '$2,400.00', date: 'May 16, 2025', status: 'Succeeded' },
    { id: 'INV-2025-878', tenant: 'Falcon Civil Contractors', plan: 'Growth Tier', amount: '$1,800.00', date: 'May 15, 2025', status: 'Succeeded' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="text-xs font-bold text-amber-600 mb-1 flex items-center gap-1.5">
            <span>Platform Administration • Commercial SaaS Engine</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-[#172B4D] tracking-tight">
            Subscription Plans & MRR Billing
          </h1>
          <p className="text-xs md:text-sm text-slate-500 mt-1">
            Global pricing tiers, recurring Stripe / Razorpay subscriptions, usage limits, and financial exports.
          </p>
        </div>

        <button className="flex items-center gap-1.5 px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-2xl text-xs font-bold transition shadow">
          <Download className="w-3.5 h-3.5" /> Export Billing Ledger (CSV)
        </button>
      </div>

      {/* 4 Financial Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
          <span className="text-[11px] font-bold text-slate-400 uppercase">Monthly Recurring (MRR)</span>
          <div className="text-2xl font-extrabold text-slate-900 mt-1">${superAdminMetrics.monthlyRecurringRevenue.toLocaleString()}</div>
          <span className="text-[11px] text-emerald-600 font-bold flex items-center gap-1 mt-0.5">
            <TrendingUp className="w-3.5 h-3.5" /> +14.6% Growth MoM
          </span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
          <span className="text-[11px] font-bold text-slate-400 uppercase">Annual Run Rate (ARR)</span>
          <div className="text-2xl font-extrabold text-blue-600 mt-1">$2.21M</div>
          <span className="text-[11px] text-slate-500 font-medium">Projected annualized</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
          <span className="text-[11px] font-bold text-slate-400 uppercase">Paid Subscriptions</span>
          <div className="text-2xl font-extrabold text-purple-600 mt-1">48 Active Tenants</div>
          <span className="text-[11px] text-emerald-600 font-bold">0% Churn this quarter</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
          <span className="text-[11px] font-bold text-slate-400 uppercase">Trial Conversions</span>
          <div className="text-2xl font-extrabold text-emerald-600 mt-1">64.2%</div>
          <span className="text-[11px] text-slate-500 font-medium">14-day trial period</span>
        </div>
      </div>

      {/* 3 Tier Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {plans.map((p, idx) => (
          <div
            key={idx}
            className={`bg-white rounded-3xl p-6 md:p-7 border-2 ${p.color} flex flex-col justify-between relative transition hover:shadow-lg`}
          >
            {p.popular && (
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-blue-600 text-white text-[10px] font-extrabold uppercase tracking-wider">
                Most Popular
              </span>
            )}

            <div>
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-extrabold text-base text-slate-900">{p.name}</h3>
                <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700">
                  {p.activeTenants} Tenants
                </span>
              </div>

              <div className="flex items-baseline gap-1 my-4">
                <span className="text-3xl font-black text-slate-900">{p.price}</span>
                <span className="text-xs text-slate-400 font-bold">{p.billing}</span>
              </div>

              <div className="space-y-2.5 pt-3 border-t border-slate-100 text-xs">
                {p.features.map((f, fIdx) => (
                  <div key={fIdx} className="flex items-center gap-2 text-slate-600">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>{f}</span>
                  </div>
                ))}
              </div>
            </div>

            <button className="w-full mt-6 py-2.5 text-center text-xs font-bold text-slate-700 hover:text-blue-600 bg-slate-50 hover:bg-blue-50 rounded-xl transition">
              Configure Tier Limits
            </button>
          </div>
        ))}
      </div>

      {/* Recent Platform Invoices Table */}
      <div className="bg-white p-6 md:p-7 rounded-3xl border border-slate-200/80 shadow-xs">
        <h2 className="text-base font-extrabold text-slate-900 mb-4">
          Latest Auto-Collected Platform Invoices
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-100 text-[11px] font-bold uppercase tracking-wider text-slate-400 bg-slate-50/50">
                <th className="py-3 px-4">Invoice #</th>
                <th className="py-3 px-4">Customer Organization</th>
                <th className="py-3 px-4">Plan Tier</th>
                <th className="py-3 px-4">Billing Date</th>
                <th className="py-3 px-4">Gross Collected</th>
                <th className="py-3 px-4 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
              {recentTransactions.map((tx) => (
                <tr key={tx.id} className="hover:bg-slate-50 transition">
                  <td className="py-3.5 px-4 font-bold text-blue-700">{tx.id}</td>
                  <td className="py-3.5 px-4 font-bold text-slate-900">{tx.tenant}</td>
                  <td className="py-3.5 px-4">{tx.plan}</td>
                  <td className="py-3.5 px-4 text-slate-500">{tx.date}</td>
                  <td className="py-3.5 px-4 font-extrabold text-slate-900">{tx.amount}</td>
                  <td className="py-3.5 px-4 text-right">
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                      {tx.status}
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
