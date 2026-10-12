import React, { useState } from 'react';
import { useOutletContext, Link } from 'react-router-dom';
import {
  Building2,
  Plus,
  Search,
  Filter,
  MapPin,
  Users,
  AlertTriangle,
  ShieldCheck,
  Calendar,
  DollarSign,
  TrendingUp,
  LayoutGrid,
  List,
  CheckCircle2,
  ChevronRight,
  Map
} from 'lucide-react';
import { allProjects } from '../data/mockData';

export default function ProjectsPage() {
  const { openCreateTask } = useOutletContext();
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'table'
  const [filterStatus, setFilterStatus] = useState('All');
  const [search, setSearch] = useState('');
  const [showMap, setShowMap] = useState(false);

  const filtered = allProjects.filter((p) => {
    const matchesStatus = filterStatus === 'All' || p.status === filterStatus;
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase()) || p.location.toLowerCase().includes(search.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-[#172B4D] tracking-tight">
            Projects Portfolio & Sites
          </h1>
          <p className="text-xs md:text-sm text-slate-500 mt-1">
            Real-time status, site health, manpower distribution, and financial budgets across all jobsites.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowMap(!showMap)}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold border transition ${
              showMap
                ? 'bg-blue-50 border-blue-300 text-blue-700'
                : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
            }`}
          >
            <Map className="w-4 h-4" /> {showMap ? 'Hide Site Map' : 'View Site Map'}
          </button>
          <button
            onClick={openCreateTask}
            className="flex items-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-md shadow-blue-500/20 transition"
          >
            <Plus className="w-4 h-4" /> Add New Project
          </button>
        </div>
      </div>

      {/* Map Overview Banner (Biswas screenshot inspiration) */}
      {showMap && (
        <div className="p-5 rounded-3xl bg-slate-900 text-white relative overflow-hidden shadow-lg animate-in fade-in duration-300">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-bold flex items-center gap-2">
              <MapPin className="w-4 h-4 text-amber-400" /> Geographic Construction Site Clusters
            </h3>
            <span className="text-[11px] text-slate-400">5 Active Sites Geotagged</span>
          </div>

          <div className="h-52 bg-slate-800 rounded-2xl relative overflow-hidden border border-slate-700 flex items-center justify-center">
            {/* Stylized vector map grid */}
            <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#60a5fa_1px,transparent_1px)] [background-size:16px_16px]"></div>
            
            {/* Pins */}
            <div className="absolute top-1/4 left-1/3 flex flex-col items-center group cursor-pointer">
              <div className="px-2.5 py-1 bg-blue-600 text-white rounded-lg text-[10px] font-bold shadow-lg flex items-center gap-1">
                <span>Skyline Residences</span> • 62%
              </div>
              <div className="w-3 h-3 bg-blue-500 rotate-45 -mt-1"></div>
            </div>

            <div className="absolute top-1/2 left-2/3 flex flex-col items-center group cursor-pointer">
              <div className="px-2.5 py-1 bg-emerald-600 text-white rounded-lg text-[10px] font-bold shadow-lg flex items-center gap-1">
                <span>Manggarai Tower</span> • 78%
              </div>
              <div className="w-3 h-3 bg-emerald-500 rotate-45 -mt-1"></div>
            </div>

            <div className="absolute bottom-1/4 left-1/2 flex flex-col items-center group cursor-pointer">
              <div className="px-2.5 py-1 bg-amber-500 text-white rounded-lg text-[10px] font-bold shadow-lg flex items-center gap-1">
                <span>Pakuwon Mall</span> • 54% (12d delay)
              </div>
              <div className="w-3 h-3 bg-amber-500 rotate-45 -mt-1"></div>
            </div>

            <span className="text-xs text-slate-400 font-medium">Interactive Geo-Spatial Map Overlay (GPS Verified)</span>
          </div>
        </div>
      )}

      {/* Filter and View Toggles */}
      <div className="bg-white p-3 rounded-2xl border border-slate-200/80 shadow-xs flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          {['All', 'Active', 'Delayed', 'Planning'].map((status) => (
            <button
              key={status}
              onClick={() => setFilterStatus(status)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                filterStatus === status
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
              }`}
            >
              {status}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search projects..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-8 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none"
            />
          </div>

          <div className="flex items-center bg-slate-100 p-0.5 rounded-xl border border-slate-200">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-lg text-xs font-semibold ${
                viewMode === 'grid' ? 'bg-white text-blue-600 shadow-xs' : 'text-slate-500'
              }`}
              title="Grid View"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={`p-1.5 rounded-lg text-xs font-semibold ${
                viewMode === 'table' ? 'bg-white text-blue-600 shadow-xs' : 'text-slate-500'
              }`}
              title="Table View"
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Grid View */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((proj) => (
            <div
              key={proj.id}
              className="bg-white rounded-3xl border border-slate-200/80 shadow-xs overflow-hidden flex flex-col justify-between hover:shadow-md transition group"
            >
              <div>
                {/* Photo & Status Badge */}
                <div className="h-44 relative overflow-hidden bg-slate-100">
                  <img
                    src={proj.image}
                    alt={proj.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 flex gap-2">
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-extrabold bg-white/95 text-slate-900 shadow-sm backdrop-blur-sm">
                      {proj.id}
                    </span>
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold shadow-sm ${
                      proj.status === 'Active'
                        ? 'bg-emerald-500 text-white'
                        : proj.status === 'Delayed'
                        ? 'bg-amber-500 text-white'
                        : 'bg-blue-500 text-white'
                    }`}>
                      {proj.status}
                    </span>
                  </div>
                </div>

                {/* Details */}
                <div className="p-5">
                  <h3 className="text-base font-extrabold text-slate-900 group-hover:text-blue-600 transition">
                    {proj.name}
                  </h3>
                  <p className="text-xs text-slate-500 flex items-center gap-1 mt-1">
                    <MapPin className="w-3 h-3 text-slate-400" /> {proj.location}
                  </p>

                  {/* Progress Bar */}
                  <div className="my-4">
                    <div className="flex justify-between text-xs font-bold mb-1">
                      <span className="text-slate-600">Site Progress</span>
                      <span className="text-blue-600">{proj.progress}%</span>
                    </div>
                    <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                      <div
                        style={{ width: `${proj.progress}%` }}
                        className={`h-full rounded-full ${
                          proj.status === 'Delayed' ? 'bg-amber-500' : 'bg-blue-600'
                        }`}
                      ></div>
                    </div>
                  </div>

                  {/* Specs */}
                  <div className="grid grid-cols-3 gap-2 text-center py-2 border-t border-slate-100 text-xs">
                    <div>
                      <div className="text-[10px] text-slate-400 font-bold">BUDGET</div>
                      <div className="font-extrabold text-slate-800 mt-0.5">{proj.budget}</div>
                    </div>
                    <div>
                      <div className="text-[10px] text-slate-400 font-bold">WORKERS</div>
                      <div className="font-extrabold text-slate-800 mt-0.5">{proj.workers}</div>
                    </div>
                    <div>
                      <div className="text-[10px] text-slate-400 font-bold">SAFETY</div>
                      <div className="font-extrabold text-emerald-600 mt-0.5">{proj.safetyScore}</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Link */}
              <div className="px-5 pb-5 pt-0">
                <Link
                  to="/"
                  className="w-full py-2.5 text-center text-xs font-bold text-slate-700 hover:text-blue-600 bg-slate-50 hover:bg-blue-50 rounded-xl transition flex items-center justify-center gap-1"
                >
                  Manage Project Dashboard <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Table View (matching Acme.Build screenshot) */
        <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-100 text-[11px] font-bold uppercase tracking-wider text-slate-400 bg-slate-50/50">
                  <th className="py-3 px-4">Project Name</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Progress</th>
                  <th className="py-3 px-4">Spent / Budget</th>
                  <th className="py-3 px-4">Deadline</th>
                  <th className="py-3 px-4 text-center">Workers</th>
                  <th className="py-3 px-4 text-center">Safety</th>
                  <th className="py-3 px-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                {filtered.map((proj) => (
                  <tr key={proj.id} className="hover:bg-slate-50 transition">
                    <td className="py-3.5 px-4 font-bold text-slate-900">
                      <div>
                        <div className="text-xs font-bold text-slate-900">{proj.name}</div>
                        <div className="text-[10px] text-slate-400">{proj.id} • {proj.category}</div>
                      </div>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        proj.status === 'Active'
                          ? 'bg-emerald-100 text-emerald-800'
                          : proj.status === 'Delayed'
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-blue-100 text-blue-800'
                      }`}>
                        {proj.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-800 w-8">{proj.progress}%</span>
                        <div className="w-20 bg-slate-100 h-2 rounded-full overflow-hidden">
                          <div
                            style={{ width: `${proj.progress}%` }}
                            className="bg-blue-600 h-full rounded-full"
                          ></div>
                        </div>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 font-bold text-slate-800">
                      {proj.spent} / {proj.budget}
                    </td>
                    <td className="py-3.5 px-4 text-slate-500">{proj.deadline}</td>
                    <td className="py-3.5 px-4 text-center font-bold text-slate-800">{proj.workers}</td>
                    <td className="py-3.5 px-4 text-center font-bold text-emerald-600">{proj.safetyScore}</td>
                    <td className="py-3.5 px-4 text-right">
                      <Link
                        to="/"
                        className="px-3 py-1.5 bg-blue-50 hover:bg-blue-600 hover:text-white rounded-xl text-blue-700 font-bold text-[11px] transition"
                      >
                        Open
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
