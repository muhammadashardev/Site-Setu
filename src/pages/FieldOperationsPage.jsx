import React, { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import {
  HardHat,
  Camera,
  Sun,
  Wind,
  Users,
  CheckCircle2,
  AlertTriangle,
  Plus,
  Calendar,
  Layers,
  FileCheck2,
  ShieldCheck,
  ChevronRight
} from 'lucide-react';
import { dailySiteLogs } from '../data/mockData';

export default function FieldOperationsPage() {
  const { openQuickAction } = useOutletContext();
  const [logs, setLogs] = useState(dailySiteLogs);
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  const punchItems = [
    { id: 'SNAG-01', location: 'Floor 4, Unit 402', desc: 'Conduit capping missing in electrical junction box', severity: 'Minor', status: 'In Progress' },
    { id: 'SNAG-02', location: 'Floor 5, Staircase B', desc: 'Handrail temporary safety toe-board loose', severity: 'Critical', status: 'Open' },
    { id: 'SNAG-03', location: 'Basement B1, Column 12', desc: 'Honeycombing after shutter stripping, requires micro-concrete grouting', severity: 'High', status: 'Pending Review' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-[#172B4D] tracking-tight">
            Field Operations & Daily Site Logs
          </h1>
          <p className="text-xs md:text-sm text-slate-500 mt-1">
            Real-time daily manpower records, weather conditions, concrete casting logs, and photographic site inspections.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => openQuickAction('safety')}
            className="flex items-center gap-1.5 px-3.5 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-bold shadow transition"
          >
            <AlertTriangle className="w-4 h-4" /> Log Hazard
          </button>
          <button
            onClick={() => openQuickAction('add-inventory')}
            className="flex items-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-md shadow-blue-500/20 transition"
          >
            <Camera className="w-4 h-4" /> New Daily Log
          </button>
        </div>
      </div>

      {/* Weather & Site Metrics Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex items-center justify-between">
          <div>
            <div className="text-xs font-bold text-slate-400 uppercase">Site Weather</div>
            <div className="text-2xl font-extrabold text-slate-900 mt-1">33°C Sunny</div>
            <div className="text-[11px] text-slate-500 mt-0.5 flex items-center gap-1">
              <Wind className="w-3.5 h-3.5 text-blue-500" /> Wind 11 km/h • Humidity 45%
            </div>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-500 flex items-center justify-center">
            <Sun className="w-6 h-6 animate-spin" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex items-center justify-between">
          <div>
            <div className="text-xs font-bold text-slate-400 uppercase">Manpower On Site</div>
            <div className="text-2xl font-extrabold text-slate-900 mt-1">142 Workers</div>
            <div className="text-[11px] text-emerald-600 font-semibold mt-0.5">
              100% Biometric Verified
            </div>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
            <Users className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex items-center justify-between">
          <div>
            <div className="text-xs font-bold text-slate-400 uppercase">Concrete Poured Today</div>
            <div className="text-2xl font-extrabold text-slate-900 mt-1">120 cu.m</div>
            <div className="text-[11px] text-slate-500 mt-0.5">
              Grade M35 • Floor 5 Slab
            </div>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center">
            <Layers className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex items-center justify-between">
          <div>
            <div className="text-xs font-bold text-slate-400 uppercase">Open Snag / Punch Items</div>
            <div className="text-2xl font-extrabold text-slate-900 mt-1">3 Items</div>
            <div className="text-[11px] text-amber-600 font-semibold mt-0.5">
              1 Critical safety item
            </div>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center">
            <AlertTriangle className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Main Content: Daily Logs List with Photo Galleries */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Logs Stream */}
        <div className="lg:col-span-8 space-y-5">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-extrabold text-slate-900">
              Daily Supervisor Logs & Verification
            </h2>
            <span className="text-xs text-slate-400 font-medium">Synced with mobile field app</span>
          </div>

          {logs.map((log) => (
            <div
              key={log.id}
              className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs space-y-4"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-xs">
                    <Calendar className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-sm text-slate-900">{log.date}</h3>
                    <p className="text-[11px] text-slate-500 font-medium">{log.shift} • In-charge: {log.author}</p>
                  </div>
                </div>

                <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-1 w-fit">
                  <CheckCircle2 className="w-3.5 h-3.5" /> {log.status}
                </span>
              </div>

              {/* Log Summary */}
              <p className="text-xs text-slate-700 leading-relaxed bg-slate-50 p-3.5 rounded-2xl border border-gray-200">
                {log.summary}
              </p>

              {/* Photos Gallery */}
              <div>
                <h4 className="text-xs font-bold text-slate-600 mb-2.5 flex items-center gap-1.5">
                  <Camera className="w-3.5 h-3.5 text-blue-600" /> Attached Site Inspection Photos ({log.photos.length})
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {log.photos.map((photo, pIdx) => (
                    <div
                      key={pIdx}
                      onClick={() => setSelectedPhoto(photo)}
                      className="rounded-2xl overflow-hidden border border-slate-200 relative group cursor-pointer bg-slate-100 aspect-4/3"
                    >
                      <img
                        src={photo.url}
                        alt={photo.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent flex flex-col justify-end p-2.5 text-white">
                        <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-blue-600 w-fit mb-1">
                          {photo.tag}
                        </span>
                        <p className="text-[11px] font-bold leading-tight truncate">{photo.title}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Right Column: Punch / Snag List */}
        <div className="lg:col-span-4 bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base font-bold text-slate-900">Punch / Snag Register</h2>
              <span className="text-xs font-bold text-rose-700 bg-rose-50 px-2 py-0.5 rounded">
                Active Issues
              </span>
            </div>

            <div className="space-y-3">
              {punchItems.map((item) => (
                <div
                  key={item.id}
                  className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-blue-700 text-[10px]">{item.id}</span>
                    <span className={`text-[9px] font-bold px-2 py-0.5 rounded ${
                      item.severity === 'Critical'
                        ? 'bg-rose-100 text-rose-700'
                        : item.severity === 'High'
                        ? 'bg-amber-100 text-amber-700'
                        : 'bg-slate-200 text-slate-700'
                    }`}>
                      {item.severity}
                    </span>
                  </div>

                  <p className="font-bold text-slate-900 text-xs">{item.desc}</p>
                  <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1 border-t border-slate-200">
                    <span>{item.location}</span>
                    <span className="font-semibold text-slate-700">{item.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={() => openQuickAction('safety')}
            className="w-full mt-6 py-2.5 text-center text-xs font-bold text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-xl transition flex items-center justify-center gap-1"
          >
            + Create New Punch Item
          </button>
        </div>
      </div>
    </div>
  );
}
