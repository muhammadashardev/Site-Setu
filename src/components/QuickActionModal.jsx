import React, { useState } from 'react';
import { X, Check, DollarSign, Boxes, Truck, ShieldAlert, FileCheck2, Camera } from 'lucide-react';

export default function QuickActionModal({ actionType, isOpen, onClose, onSuccess }) {
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    amount: '',
    vendor: '',
    notes: '',
    category: 'Material',
    severity: 'Medium',
    quantity: '50 Bags',
  });

  if (!isOpen || !actionType) return null;

  const getActionConfig = () => {
    switch (actionType) {
      case 'log-expense':
        return {
          title: 'Log Project Expense',
          subtitle: 'Direct Site Petty Cash & Vendor Invoice',
          icon: DollarSign,
          iconColor: 'bg-emerald-100 text-emerald-700',
          fields: 'expense',
        };
      case 'add-inventory':
        return {
          title: 'Add Site Inventory',
          subtitle: 'Record Inbound Steel, Cement, Aggregates',
          icon: Boxes,
          iconColor: 'bg-purple-100 text-purple-700',
          fields: 'inventory',
        };
      case 'add-equipment':
        return {
          title: 'Register Heavy Equipment',
          subtitle: 'Excavator, Tower Crane, Concrete Pump',
          icon: Truck,
          iconColor: 'bg-amber-100 text-amber-700',
          fields: 'equipment',
        };
      case 'safety':
        return {
          title: 'Log Safety Observation / Hazard',
          subtitle: 'HSE Near-Miss, Unsafe Act, PPE Violation',
          icon: ShieldAlert,
          iconColor: 'bg-rose-100 text-rose-700',
          fields: 'safety',
        };
      case 'approvals':
      default:
        return {
          title: 'Fast Track Review & Approval',
          subtitle: 'Submittals, Architectural Revisions & BOQ',
          icon: FileCheck2,
          iconColor: 'bg-blue-100 text-blue-700',
          fields: 'approval',
        };
    }
  };

  const config = getActionConfig();
  const Icon = config.icon;

  const handleSubmit = (e) => {
    e.preventDefault();
    setSuccess(true);
    setTimeout(() => {
      setSuccess(false);
      if (onSuccess) onSuccess(formData);
      onClose();
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden animate-in zoom-in-95 duration-200">
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${config.iconColor}`}>
              <Icon className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">{config.title}</h3>
              <p className="text-[11px] text-slate-500">{config.subtitle}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-200/60 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Description / Subject *
            </label>
            <input
              type="text"
              required
              placeholder={
                config.fields === 'expense'
                  ? 'e.g. Fuel for generator DG-02'
                  : config.fields === 'inventory'
                  ? 'e.g. TMT 16mm Rebar Bundle (Fe 500D)'
                  : config.fields === 'safety'
                  ? 'e.g. Unguarded edge on Floor 4 balcony'
                  : 'e.g. Tower crane rigging inspection sign-off'
              }
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:bg-white"
            />
          </div>

          {config.fields === 'expense' && (
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Amount ($)</label>
                <input
                  type="number"
                  placeholder="2450"
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl"
                  value={formData.amount}
                  onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Cost Code</label>
                <select className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl">
                  <option>CC-01 Preliminaries</option>
                  <option>CC-04 Concrete & Steel</option>
                  <option>CC-08 MEP Works</option>
                </select>
              </div>
            </div>
          )}

          {config.fields === 'inventory' && (
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Quantity Received</label>
                <input
                  type="text"
                  placeholder="50 Metric Tons"
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl"
                  value={formData.quantity}
                  onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Supplier / Batch</label>
                <input
                  type="text"
                  placeholder="Tata Tiscon #8902"
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl"
                />
              </div>
            </div>
          )}

          {config.fields === 'safety' && (
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Risk Severity</label>
                <select
                  value={formData.severity}
                  onChange={(e) => setFormData({ ...formData, severity: e.target.value })}
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl"
                >
                  <option value="Critical">Critical (Immediate Stop)</option>
                  <option value="High">High Priority</option>
                  <option value="Medium">Medium Warning</option>
                  <option value="Low">Low Observation</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Action Assigned</label>
                <select className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl">
                  <option>Site Safety Officer</option>
                  <option>Subcontractor Supervisor</option>
                </select>
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Field Notes / Remarks
            </label>
            <textarea
              rows={2}
              placeholder="Add observation notes or delivery challan numbers..."
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none"
            />
          </div>

          <div className="p-3 bg-slate-50 rounded-2xl border border-dashed border-slate-300 flex items-center justify-center gap-2 text-xs text-slate-500 cursor-pointer hover:bg-slate-100 transition">
            <Camera className="w-4 h-4 text-slate-400" />
            <span>Attach Site Photo / Invoice Receipt</span>
          </div>

          <div className="pt-2 border-t border-slate-100 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={success}
              className="flex items-center gap-1.5 px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow transition"
            >
              {success ? (
                <>
                  <Check className="w-4 h-4 animate-bounce" /> Recorded!
                </>
              ) : (
                'Save to Log'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
