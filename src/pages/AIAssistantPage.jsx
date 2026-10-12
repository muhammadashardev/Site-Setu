import React, { useState } from 'react';
import {
  Sparkles,
  Bot,
  Send,
  FileText,
  AlertTriangle,
  Lightbulb,
  CheckCircle2,
  HardHat,
  Zap,
  ArrowRight
} from 'lucide-react';

export default function AIAssistantPage() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'ai',
      text: "👋 Welcome to SiteSetu Construction AI Copilot!\n\nI have indexed all 84 BIM drawings, 4 active subcontractor contracts, the latest BOQ rate cards, and daily site logs for Skyline Residences (PRJ-1001).\n\nHow can I help you accelerate project delivery today?",
      suggestions: [
        "Analyze critical path delay risk on Level 5 slab",
        "Draft RFI for MEP clash at Floor 3 beam soffit",
        "Summarize cement consumption vs BOQ specification",
        "Generate daily site handover report for PM"
      ]
    }
  ]);
  const [inputVal, setInputVal] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = (text) => {
    const q = text || inputVal;
    if (!q.trim()) return;

    setMessages((prev) => [
      ...prev,
      { id: Date.now(), sender: 'user', text: q }
    ]);
    setInputVal('');
    setIsTyping(true);

    setTimeout(() => {
      let reply = "";
      if (q.toLowerCase().includes("risk") || q.toLowerCase().includes("delay") || q.toLowerCase().includes("level 5")) {
        reply = "⚠️ **Critical Path Analysis — Level 5 Slab**:\n• Status: 65% shuttered, bar-bending in progress.\n• Subcontractor BarBenders United is running 1.5 days behind on high-yield TMT bars.\n• Recommended Action: Pre-order 120 cu.m batch delivery from UltraTech RMC for May 21st to eliminate curing downtime.";
      } else if (q.toLowerCase().includes("rfi") || q.toLowerCase().includes("mep") || q.toLowerCase().includes("clash")) {
        reply = "📝 **Drafted RFI #105**:\n**Subject:** Clashing HVAC Duct with Structural Beam B-44 at Floor 3\n**Proposed Resolution:** Requesting 150mm lower ceiling soffit or structural sleeve approval per IS 456-2000.\n**Assignee:** Studio ArchMatrix (Structural Consultant).\n*Status: Ready to export to RFI Register.*";
      } else if (q.toLowerCase().includes("cement") || q.toLowerCase().includes("boq")) {
        reply = "📊 **BOQ Concrete & Cement Audit**:\n• Total Planned: 2,400 MT\n• Actual Dispatched: 1,820 MT (75.8% of budget)\n• Current Variance: -2.1% (favorable/under-budget).\n• Waste factor on site: 1.8% (Target threshold is < 2.5%).";
      } else {
        reply = `🤖 **SiteSetu Analysis Result** for "${q}":\n• Cross-referenced against 84 approved drawings and current site manpower (142 workers).\n• All parameters comply with NBC 2016 safety guidelines. No critical delays detected.`;
      }

      setMessages((prev) => [
        ...prev,
        { id: Date.now() + 1, sender: 'ai', text: reply }
      ]);
      setIsTyping(false);
    }, 600);
  };

  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-slate-900 via-[#172B4D] to-indigo-950 text-white shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold border border-amber-500/30 mb-2">
            <Sparkles className="w-3.5 h-3.5" /> Construction Language Model v2.4
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">
            SiteSetu AI Project Assistant
          </h1>
          <p className="text-xs md:text-sm text-slate-300 mt-1">
            Natural-language search, automated RFI drafting, BOQ variance diagnosis, and risk intelligence.
          </p>
        </div>

        <div className="bg-white/10 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-white/15 text-xs text-slate-200 flex items-center gap-2">
          <Zap className="w-4 h-4 text-amber-400" />
          <span>Connected to Skyline Residences (PRJ-1001)</span>
        </div>
      </div>

      {/* Main Chat Interface */}
      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs flex flex-col h-[650px] overflow-hidden">
        {/* Messages Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-slate-50/50">
          {messages.map((m) => (
            <div
              key={m.id}
              className={`flex flex-col ${m.sender === 'user' ? 'items-end' : 'items-start'}`}
            >
              <div
                className={`max-w-[85%] md:max-w-[75%] rounded-3xl p-4 text-xs leading-relaxed shadow-xs ${
                  m.sender === 'user'
                    ? 'bg-blue-600 text-white rounded-tr-none'
                    : 'bg-white text-slate-800 border border-slate-200/80 rounded-tl-none whitespace-pre-line'
                }`}
              >
                {m.text}
              </div>

              {m.suggestions && (
                <div className="mt-4 space-y-2 w-full max-w-xl">
                  <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                    <Lightbulb className="w-3.5 h-3.5 text-amber-500" /> Recommended Inquiries
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {m.suggestions.map((sugg, i) => (
                      <button
                        key={i}
                        onClick={() => handleSend(sugg)}
                        className="text-xs bg-white hover:bg-blue-50 border border-slate-200 hover:border-blue-300 text-slate-700 hover:text-blue-700 p-2.5 rounded-xl font-medium text-left transition flex items-center justify-between"
                      >
                        <span className="truncate mr-2">{sugg}</span>
                        <ArrowRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}

          {isTyping && (
            <div className="flex items-center gap-2 p-3 bg-white border border-slate-200 rounded-2xl w-fit">
              <Sparkles className="w-4 h-4 text-amber-500 animate-spin" />
              <span className="text-xs text-slate-500 font-medium">SiteSetu Copilot is querying project drawings & logs...</span>
            </div>
          )}
        </div>

        {/* Input Bar */}
        <div className="p-4 border-t border-slate-200 bg-white">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex items-center gap-3"
          >
            <input
              type="text"
              placeholder="Ask anything about PRJ-1001, BOQ rates, delay risks, or RFI drafting..."
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              className="flex-1 px-4 py-3 text-xs bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:bg-white transition"
            />
            <button
              type="submit"
              disabled={!inputVal.trim()}
              className="px-5 py-3 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white rounded-2xl text-xs font-bold transition shadow-sm flex items-center gap-1.5"
            >
              <Send className="w-4 h-4" /> Send
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
