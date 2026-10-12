import React from 'react';
import { X, Bell, AlertTriangle, FileCheck, CheckCircle2, Calendar, ShieldAlert } from 'lucide-react';

export default function NotificationDrawer({ isOpen, onClose }) {
  const notifications = [
    {
      id: 1,
      title: "MEP Shop Drawing RFI-104 pending response",
      time: "10m ago",
      desc: "Studio ArchMatrix commented on duct penetration clearance at Level 3.",
      type: "rfi",
      unread: true,
      icon: AlertTriangle,
      color: "text-amber-600 bg-amber-50",
    },
    {
      id: 2,
      title: "Batch Concrete Dispatch Approved",
      time: "45m ago",
      desc: "UltraTech RMC 120 cu.m batch M35 cleared by Quality Engineer.",
      type: "quality",
      unread: true,
      icon: CheckCircle2,
      color: "text-emerald-600 bg-emerald-50",
    },
    {
      id: 3,
      title: "Overdue Task: Tower Crane Rigging Certificate",
      time: "2h ago",
      desc: "Monthly safety inspection report due before crane operation on May 21.",
      type: "safety",
      unread: true,
      icon: ShieldAlert,
      color: "text-rose-600 bg-rose-50",
    },
    {
      id: 4,
      title: "Client Payment Received: $290,000",
      time: "5h ago",
      desc: "Skyline Realty cleared 4th Floor Milestone Invoice INV-2025-001.",
      type: "finance",
      unread: false,
      icon: FileCheck,
      color: "text-blue-600 bg-blue-50",
    },
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-slate-900/30 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="w-full max-w-sm bg-white h-full shadow-2xl flex flex-col border-l border-slate-200 animate-in slide-in-from-right duration-300">
        <div className="p-4 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bell className="w-4 h-4 text-blue-600" />
            <h3 className="font-bold text-sm text-slate-900">Notifications & Alerts</h3>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-100 text-blue-700">
              3 new
            </span>
          </div>
          <button onClick={onClose} className="p-1 text-slate-400 hover:text-slate-600">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-3 space-y-2">
          {notifications.map((n) => {
            const Icon = n.icon;
            return (
              <div
                key={n.id}
                className={`p-3 rounded-2xl border transition ${
                  n.unread
                    ? 'bg-blue-50/40 border-blue-200/80 shadow-xs'
                    : 'bg-white border-slate-100 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${n.color}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-0.5">
                      <p className="text-xs font-bold text-slate-900 leading-tight">{n.title}</p>
                    </div>
                    <p className="text-[11px] text-slate-600 mb-1.5">{n.desc}</p>
                    <span className="text-[10px] text-slate-400 font-medium">{n.time}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="p-3 border-t border-slate-100 bg-slate-50 text-center">
          <button className="text-xs font-bold text-blue-600 hover:text-blue-700">
            Mark all as read
          </button>
        </div>
      </div>
    </div>
  );
}
