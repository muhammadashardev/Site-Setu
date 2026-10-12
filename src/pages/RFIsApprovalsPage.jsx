import React, { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import {
  FileCheck2,
  Plus,
  Search,
  Filter,
  CheckCircle2,
  AlertTriangle,
  Clock,
  MessageSquare,
  FileText,
  User,
  Paperclip,
  Sparkles,
  Send
} from 'lucide-react';
import { rfiList } from '../data/mockData';

export default function RFIsApprovalsPage() {
  const { openAI } = useOutletContext();
  const [rfis, setRfis] = useState(rfiList);
  const [selectedRfi, setSelectedRfi] = useState(rfis[0]);
  const [replyText, setReplyText] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');

  const handleSendReply = (e) => {
    e.preventDefault();
    if (!replyText.trim()) return;
    alert(`Response submitted to consultant: "${replyText}"`);
    setReplyText('');
  };

  const filtered = rfis.filter(
    (item) => filterStatus === 'All' || item.status.includes(filterStatus)
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-[#172B4D] tracking-tight">
            RFIs, Submittals & Approvals
          </h1>
          <p className="text-xs md:text-sm text-slate-500 mt-1">
            Requests for Information, engineering clarifications, architectural approvals, and consultant response tracking.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={openAI}
            className="flex items-center gap-1.5 px-3.5 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-xl text-xs font-bold shadow transition"
          >
            <Sparkles className="w-4 h-4" /> AI Draft RFI
          </button>
          <button
            onClick={() => alert("Create RFI form opened")}
            className="flex items-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-md shadow-blue-500/20 transition"
          >
            <Plus className="w-4 h-4" /> New RFI
          </button>
        </div>
      </div>

      {/* Main Grid: RFI Register List + Detailed Viewer */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: RFI Register */}
        <div className="lg:col-span-5 bg-white p-5 rounded-3xl border border-slate-200/80 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-bold text-slate-900">RFI Register</h2>
              <div className="flex gap-1">
                {['All', 'Open', 'Resolved'].map((s) => (
                  <button
                    key={s}
                    onClick={() => setFilterStatus(s)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-bold ${
                      filterStatus === s ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              {filtered.map((rfi) => {
                const isSelected = selectedRfi?.id === rfi.id;
                return (
                  <div
                    key={rfi.id}
                    onClick={() => setSelectedRfi(rfi)}
                    className={`p-4 rounded-2xl border transition cursor-pointer ${
                      isSelected
                        ? 'bg-blue-50/60 border-blue-300 shadow-xs'
                        : 'bg-slate-50/50 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-extrabold text-blue-700 text-xs">{rfi.id}</span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        rfi.status.includes('Urgent') || rfi.priority === 'Critical'
                          ? 'bg-rose-100 text-rose-700'
                          : rfi.status === 'Resolved'
                          ? 'bg-emerald-100 text-emerald-700'
                          : 'bg-amber-100 text-amber-700'
                      }`}>
                        {rfi.status}
                      </span>
                    </div>

                    <h4 className="text-xs font-bold text-slate-900 leading-snug line-clamp-2">
                      {rfi.title}
                    </h4>

                    <div className="flex items-center justify-between text-[11px] text-slate-500 mt-2.5 pt-2 border-t border-slate-200/60">
                      <span>By: {rfi.raisedBy.split(' ')[0]}</span>
                      <span className="flex items-center gap-1 font-medium">
                        <Clock className="w-3.5 h-3.5 text-slate-400" /> Due: {rfi.dueDate}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right: Detailed RFI Thread & Decision History */}
        {selectedRfi && (
          <div className="lg:col-span-7 bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-4 mb-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-700 text-xs font-bold">
                      {selectedRfi.id}
                    </span>
                    <span className="text-xs text-slate-400 font-medium">{selectedRfi.project}</span>
                  </div>
                  <h3 className="text-base font-extrabold text-slate-900">
                    {selectedRfi.title}
                  </h3>
                </div>

                <div className="text-right">
                  <span className="text-[11px] font-semibold text-slate-400 block">Response Deadline</span>
                  <span className="text-xs font-bold text-rose-600">{selectedRfi.dueDate}</span>
                </div>
              </div>

              {/* Scope & Consultant Information */}
              <div className="grid grid-cols-2 gap-4 p-3.5 rounded-2xl bg-slate-50 border border-gray-200 mb-4 text-xs">
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase">Initiated By</span>
                  <p className="font-bold text-slate-800 mt-0.5">{selectedRfi.raisedBy}</p>
                </div>
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase">Assigned Consultant</span>
                  <p className="font-bold text-slate-800 mt-0.5">{selectedRfi.assignedTo}</p>
                </div>
              </div>

              {/* RFI Body */}
              <div className="p-4 rounded-2xl bg-white border border-slate-200 text-xs text-slate-800 leading-relaxed mb-4">
                <h4 className="font-bold text-slate-900 mb-1">Statement of Problem:</h4>
                <p>{selectedRfi.description}</p>
              </div>

              {/* Threaded Discussion Responses */}
              <div className="space-y-3 mb-4">
                <h4 className="text-xs font-bold text-slate-700">Official Discussion Log (2 Responses)</h4>
                
                <div className="p-3.5 rounded-2xl bg-slate-50 border border-gray-200 text-xs space-y-1">
                  <div className="flex justify-between items-center text-[11px]">
                    <span className="font-bold text-slate-900">Studio ArchMatrix (Structural Consultant)</span>
                    <span className="text-slate-400">May 19, 11:30 AM</span>
                  </div>
                  <p className="text-slate-600">
                    We have evaluated the beam shear stress. Sleeve diameter up to 200mm is permissible provided it is located in the middle-third of the span. Formal CAD revision sketch attached.
                  </p>
                </div>
              </div>
            </div>

            {/* Quick Reply Form */}
            <form onSubmit={handleSendReply} className="pt-4 border-t border-slate-100 flex gap-2">
              <input
                type="text"
                placeholder="Write official response or clarification note..."
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                className="flex-1 px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:bg-white"
              />
              <button
                type="submit"
                className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition flex items-center gap-1.5 shadow"
              >
                <Send className="w-3.5 h-3.5" /> Submit
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
