import React, { useState } from 'react';
import {
  FileText,
  Download,
  Search,
  Filter,
  Eye,
  Calendar,
  CheckCircle2,
  FolderArchive,
  Layers,
  Sparkles,
  X
} from 'lucide-react';

export default function ClientPortalDocuments() {
  const [filterCat, setFilterCat] = useState('All');
  const [search, setSearch] = useState('');
  const [previewDoc, setPreviewDoc] = useState(null);

  const docs = [
    { id: 'DOC-01', title: 'Architectural Working Drawings Set (Rev 3)', category: 'Architectural', format: 'PDF', size: '24.5 MB', date: 'May 12, 2025', approvedBy: 'Studio ArchMatrix', status: 'Approved' },
    { id: 'DOC-02', title: 'Floor 1 to 18 Structural Framing & Shear Wall Specs', category: 'Structural', format: 'DWG/PDF', size: '42.1 MB', date: 'May 04, 2025', approvedBy: 'Apex Engineering Audits', status: 'Approved' },
    { id: 'DOC-03', title: 'MEP Electrical & HVAC Coordination Layout', category: 'MEP', format: 'BIM / IFC', size: '68.0 MB', date: 'Apr 28, 2025', approvedBy: 'BlueStar Tech Rep', status: 'Approved' },
    { id: 'DOC-04', title: 'Municipal Corporation Environmental & Fire NOC', category: 'Permits', format: 'PDF', size: '4.8 MB', date: 'Mar 15, 2025', approvedBy: 'State Fire Authority', status: 'Certified' },
    { id: 'DOC-05', title: 'Italian Marble & Vitrified Tile Selection Spec Sheet', category: 'Finishes', format: 'PDF', size: '12.3 MB', date: 'May 16, 2025', approvedBy: 'Interior Design Lead', status: 'Pending Review' },
    { id: 'DOC-06', title: 'Schindler High-Speed Elevators Technical Submittal', category: 'Equipment', format: 'PDF', size: '8.4 MB', date: 'Apr 10, 2025', approvedBy: 'Schindler India', status: 'Approved' },
  ];

  const filtered = docs.filter((d) => {
    const matchCat = filterCat === 'All' || d.category === filterCat;
    const matchSearch = d.title.toLowerCase().includes(search.toLowerCase()) || d.id.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="text-xs font-bold text-emerald-600 mb-1 flex items-center gap-1.5">
            <span>Skyline Residences (PRJ-1001) • Document Library</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-[#172B4D] tracking-tight">
            Shared Drawings, BIM & Documents
          </h1>
          <p className="text-xs md:text-sm text-slate-500 mt-1">
            Access the single source of truth for approved architectural designs, municipal licenses, and structural models.
          </p>
        </div>

        <button className="flex items-center gap-1.5 px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-2xl text-xs font-bold transition shadow">
          <Download className="w-3.5 h-3.5" /> Download Full As-Built Bundle (ZIP)
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-3 rounded-2xl border border-slate-200/80 shadow-xs flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-1.5 overflow-x-auto py-1">
          {['All', 'Architectural', 'Structural', 'MEP', 'Permits', 'Finishes'].map((c) => (
            <button
              key={c}
              onClick={() => setFilterCat(c)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition whitespace-nowrap ${
                filterCat === c
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="relative">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search documents or drawings..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 pr-3.5 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:bg-white"
          />
        </div>
      </div>

      {/* Documents Table View */}
      <div className="bg-white p-6 md:p-7 rounded-3xl border border-slate-200/80 shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-100 text-[11px] font-bold uppercase tracking-wider text-slate-400 bg-slate-50/50">
                <th className="py-3.5 px-4 rounded-l-xl">Document Name & Ref</th>
                <th className="py-3.5 px-4">Trade Category</th>
                <th className="py-3.5 px-4">Format & Size</th>
                <th className="py-3.5 px-4">Last Certified</th>
                <th className="py-3.5 px-4">Approved By</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right rounded-r-xl">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
              {filtered.map((d) => (
                <tr key={d.id} className="hover:bg-slate-50/80 transition">
                  <td className="py-4 px-4 font-bold text-slate-900">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-xs shrink-0">
                        <FileText className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="text-xs font-extrabold text-slate-900">{d.title}</div>
                        <div className="text-[10px] text-slate-400 font-normal">{d.id}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <span className="px-2.5 py-1 rounded-xl text-[10px] font-bold bg-slate-100 text-slate-700">
                      {d.category}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-slate-600 font-medium">
                    {d.format} • {d.size}
                  </td>
                  <td className="py-4 px-4 text-slate-500 font-medium">{d.date}</td>
                  <td className="py-4 px-4 font-bold text-slate-800">{d.approvedBy}</td>
                  <td className="py-4 px-4">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold ${
                      d.status === 'Approved' || d.status === 'Certified'
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-amber-100 text-amber-800'
                    }`}>
                      {d.status}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => setPreviewDoc(d)}
                        className="px-2.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-[11px] font-bold transition flex items-center gap-1"
                      >
                        <Eye className="w-3.5 h-3.5" /> Preview
                      </button>
                      <button
                        onClick={() => alert(`Downloading ${d.title}...`)}
                        className="p-1.5 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-xl transition"
                        title="Download File"
                      >
                        <Download className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Preview Modal */}
      {previewDoc && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="w-full max-w-xl bg-white rounded-3xl shadow-2xl border border-slate-200 p-6 space-y-4 animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-blue-100 text-blue-700 flex items-center justify-center">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-extrabold text-sm text-slate-900">{previewDoc.title}</h3>
                  <p className="text-[11px] text-slate-400">{previewDoc.id} • {previewDoc.size}</p>
                </div>
              </div>
              <button onClick={() => setPreviewDoc(null)} className="p-1 text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="h-64 bg-slate-100 rounded-2xl flex flex-col items-center justify-center text-slate-400 p-6 text-center border border-dashed border-slate-300">
              <Layers className="w-10 h-10 text-slate-300 mb-2" />
              <p className="font-bold text-xs text-slate-700">Digital Watermarked PDF Viewer</p>
              <p className="text-[11px] text-slate-400 mt-1">
                Authorized for client inspection: Rajiv Mehta (Skyline Realty Holdings Ltd).
              </p>
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <button
                onClick={() => setPreviewDoc(null)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 rounded-xl text-xs font-bold text-slate-700"
              >
                Close
              </button>
              <button
                onClick={() => {
                  alert(`Downloading ${previewDoc.title}`);
                  setPreviewDoc(null);
                }}
                className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow flex items-center gap-1.5"
              >
                <Download className="w-3.5 h-3.5" /> Download Document
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
