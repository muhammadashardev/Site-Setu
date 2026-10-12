import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X, Building, CheckSquare, HardHat, FileText, ArrowRight } from 'lucide-react';
import { allProjects } from '../data/mockData';

export default function GlobalSearchModal({ isOpen, onClose }) {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  if (!isOpen) return null;

  const quickLinks = [
    { title: 'Skyline Residences (PRJ-1001)', type: 'Project', path: '/projects', icon: Building },
    { title: 'Level 5 Slab Shuttering & Rebar', type: 'Task', path: '/tasks', icon: CheckSquare },
    { title: 'Daily Site Log — Concrete Pouring Bay 2', type: 'Field Log', path: '/field-ops', icon: HardHat },
    { title: 'RFI-104: HVAC Duct Clash Floor 3', type: 'RFI', path: '/rfis-approvals', icon: FileText },
  ];

  const filtered = query.trim()
    ? quickLinks.filter(item => item.title.toLowerCase().includes(query.toLowerCase()) || item.type.toLowerCase().includes(query.toLowerCase()))
    : quickLinks;

  const handleSelect = (path) => {
    navigate(path);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden animate-in zoom-in-95 duration-200">
        <div className="p-4 border-b border-slate-100 flex items-center gap-3">
          <Search className="w-5 h-5 text-slate-400" />
          <input
            type="text"
            autoFocus
            placeholder="Search projects, drawings, BOQ, submittals, or tasks..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 text-sm bg-transparent outline-none text-slate-800 placeholder-slate-400"
          />
          <button onClick={onClose} className="p-1 rounded-lg text-slate-400 hover:text-slate-600">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-3 max-h-80 overflow-y-auto space-y-1">
          <div className="px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-slate-400">
            {query ? 'Search Results' : 'Suggested Jump-to Links'}
          </div>
          {filtered.map((item, idx) => {
            const Icon = item.icon;
            return (
              <button
                key={idx}
                onClick={() => handleSelect(item.path)}
                className="w-full flex items-center justify-between p-3 rounded-2xl hover:bg-slate-50 transition text-left group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                    <Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-900 group-hover:text-blue-600 transition">
                      {item.title}
                    </div>
                    <div className="text-[10px] text-slate-400">{item.type}</div>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-blue-600 group-hover:translate-x-1 transition" />
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
