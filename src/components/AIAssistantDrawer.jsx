import React, { useState } from 'react';
import {
  X,
  Bot,
  Sparkles,
  Send,
  FileText,
  AlertTriangle,
  Lightbulb,
  CheckCircle2,
  HardHat,
  ArrowRight
} from 'lucide-react';

export default function AIAssistantDrawer({ isOpen, onClose }) {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'ai',
      text: "Hello Rohit! I'm SiteSetu Copilot, trained on your BIM drawings, BOQ contracts, and daily site logs. What can I assist you with today?",
      timestamp: "Just now",
      suggestions: [
        "Analyze delay risk on Level 5 slab",
        "Draft RFI for MEP duct clash",
        "Summarize cement consumption vs BOQ",
        "Safety compliance audit check"
      ]
    }
  ]);

  const [inputVal, setInputVal] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = (textToSend) => {
    const query = textToSend || inputVal;
    if (!query.trim()) return;

    const userMsg = {
      id: Date.now(),
      sender: 'user',
      text: query,
      timestamp: "Just now"
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputVal('');
    setIsTyping(true);

    setTimeout(() => {
      let aiResponseText = "";
      if (query.toLowerCase().includes("risk") || query.toLowerCase().includes("delay") || query.toLowerCase().includes("level 5")) {
        aiResponseText = "⚠️ **Risk Assessment for Level 5 Slab**:\n• Shuttering is currently 65% complete.\n• Critical Path analysis shows bar-bending subcontractor is 1.5 days behind on high-yield TMT bars delivery.\n• Recommendation: Expedite vendor UltraTech RMC batch delivery scheduled for May 21st to prevent curing downtime.";
      } else if (query.toLowerCase().includes("rfi") || query.toLowerCase().includes("mep") || query.toLowerCase().includes("clash")) {
        aiResponseText = "📝 **Drafted RFI #105 (Draft)**:\n**Subject:** Clashing HVAC Duct with Structural Beam B-44 at Floor 3\n**Proposed Resolution:** Requesting 150mm lower ceiling soffit or structural sleeve approval per IS 456-2000.\n**Assignee:** Studio ArchMatrix (Structural Consultant).\n*Click 'Export to RFI Register' to submit.*";
      } else if (query.toLowerCase().includes("cement") || query.toLowerCase().includes("boq") || query.toLowerCase().includes("consumption")) {
        aiResponseText = "📊 **BOQ Concrete & Cement Audit**:\n• Total Planned: 2,400 MT\n• Actual Dispatched: 1,820 MT (75.8% of budget)\n• Current Variance: -2.1% (favorable/under-budget).\n• Waste factor on site: 1.8% (Target threshold is < 2.5%).";
      } else {
        aiResponseText = `🤖 Based on project PRJ-1001 database: I have analyzed your request "${query}". All site parameters, contractor milestones, and quality checklists are aligned with schedule specs. Would you like me to generate a PDF summary?`;
      }

      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          sender: 'ai',
          text: aiResponseText,
          timestamp: "Just now"
        }
      ]);
      setIsTyping(false);
    }, 700);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col border-l border-slate-200 animate-in slide-in-from-right duration-300">
        {/* Header */}
        <div className="p-4 border-b border-slate-100 bg-gradient-to-r from-slate-900 to-[#172B4D] text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-500/20 border border-amber-400/40 flex items-center justify-center text-amber-400">
              <Sparkles className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <div className="font-bold text-sm flex items-center gap-2">
                SiteSetu AI Copilot
                <span className="text-[10px] bg-amber-400/20 text-amber-300 px-2 py-0.5 rounded-full border border-amber-400/30 font-semibold">
                  v2.4 Live
                </span>
              </div>
              <div className="text-[11px] text-slate-300">Construction Intelligence & RFI Drafting</div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Message Thread */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50">
          {messages.map((m) => (
            <div
              key={m.id}
              className={`flex flex-col ${m.sender === 'user' ? 'items-end' : 'items-start'}`}
            >
              <div
                className={`max-w-[90%] rounded-2xl p-3.5 text-xs leading-relaxed shadow-sm ${
                  m.sender === 'user'
                    ? 'bg-blue-600 text-white rounded-tr-none'
                    : 'bg-white text-slate-800 border border-slate-200/80 rounded-tl-none whitespace-pre-line'
                }`}
              >
                {m.text}
              </div>

              {m.suggestions && (
                <div className="mt-3 space-y-1.5 w-full">
                  <div className="text-[11px] font-semibold text-slate-400 flex items-center gap-1">
                    <Lightbulb className="w-3.5 h-3.5 text-amber-500" /> Suggested Prompts
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {m.suggestions.map((sugg, i) => (
                      <button
                        key={i}
                        onClick={() => handleSend(sugg)}
                        className="text-[11px] bg-white hover:bg-blue-50 border border-slate-200 hover:border-blue-300 text-slate-700 hover:text-blue-700 px-2.5 py-1.5 rounded-lg font-medium text-left transition flex items-center gap-1"
                      >
                        {sugg}
                        <ArrowRight className="w-3 h-3 text-slate-400" />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <span className="text-[10px] text-slate-400 mt-1 px-1">
                {m.timestamp}
              </span>
            </div>
          ))}

          {isTyping && (
            <div className="flex items-center gap-2 p-3 bg-white border border-slate-200 rounded-2xl w-fit">
              <Sparkles className="w-4 h-4 text-amber-500 animate-spin" />
              <span className="text-xs text-slate-500 font-medium">Analyzing project BIM & BOQ database...</span>
            </div>
          )}
        </div>

        {/* Footer Input */}
        <div className="p-3 border-t border-slate-200 bg-white">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              placeholder="Ask anything about PRJ-1001, BOQ, or RFI..."
              className="flex-1 px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:bg-white transition"
            />
            <button
              type="submit"
              disabled={!inputVal.trim()}
              className="p-2.5 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white rounded-xl transition shadow-sm"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
          <div className="text-[10px] text-slate-400 text-center mt-2">
            SiteSetu AI complies with enterprise tenant isolation & audit logs.
          </div>
        </div>
      </div>
    </div>
  );
}
