import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Layers,
  Shield,
  Cloud,
  Settings,
  Database,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  HardHat,
  Truck,
  Building,
  Check
} from 'lucide-react';

export default function SplashLoaderPage() {
  const navigate = useNavigate();
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState('Initializing secure SSL handshake...');

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            navigate('/login');
          }, 600);
          return 100;
        }

        const next = prev + 1;
        if (next < 25) {
          setCurrentStep('Establishing enterprise tenant isolation...');
        } else if (next < 50) {
          setCurrentStep('Syncing BIM models & BOQ rate cards...');
        } else if (next < 75) {
          setCurrentStep('Preparing AI Copilot & daily site telemetry...');
        } else if (next < 99) {
          setCurrentStep('Workspace loaded. Preparing login gateway...');
        } else {
          setCurrentStep('Ready! Redirecting to login...');
        }
        return next;
      });
    }, 45); // ~4.5 seconds full realistic animation

    return () => clearInterval(interval);
  }, [navigate]);

  return (
    <div className="min-h-screen bg-[#070D1E] text-white flex flex-col justify-between p-6 md:p-10 relative overflow-hidden font-['Plus_Jakarta_Sans',sans-serif] select-none">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-blue-600/10 rounded-full blur-[140px] pointer-events-none"></div>
      <div className="absolute bottom-20 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-amber-500/15 rounded-full blur-[100px] pointer-events-none"></div>

      {/* Top Header */}
      <header className="flex items-center justify-between relative z-10">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-amber-500 to-amber-600 flex items-center justify-center text-slate-950 font-black shadow-lg shadow-amber-500/30">
            <Layers className="w-6 h-6 text-white" />
          </div>
          <div>
            <div className="font-black text-xl tracking-tight flex items-center gap-2">
              SiteSetu
              <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-amber-400/20 text-amber-300 border border-amber-400/30">
                SaaS
              </span>
            </div>
            <p className="text-[11px] text-slate-400 font-medium leading-none">
              Construction Management Platform
            </p>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <span className="hidden sm:inline text-xs text-slate-400 font-semibold tracking-wider uppercase">
            Plan • Build • Deliver
          </span>
          <button
            onClick={() => navigate('/login')}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-bold text-white transition backdrop-blur-md border border-white/15"
          >
            <span>Skip to Login</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </header>

      {/* Center 3D Holographic Construction Stage */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center my-6">
        {/* Stage Wrapper */}
        <div className="relative w-full max-w-4xl flex items-center justify-center">
          {/* Glowing Circular Pedestal Platform */}
          <div className="absolute bottom-[-20px] w-full max-w-2xl h-24 rounded-full border-2 border-amber-500/40 bg-gradient-to-b from-amber-500/10 to-transparent shadow-[0_0_60px_rgba(245,158,11,0.25)] flex items-center justify-center">
            <div className="w-[85%] h-16 rounded-full border border-amber-400/30 bg-amber-500/5"></div>
          </div>

          {/* Central Floating Dashboard HUD Card */}
          <div className="relative z-20 w-full max-w-lg bg-[#0E172E]/90 backdrop-blur-xl border border-white/15 rounded-3xl p-5 shadow-2xl space-y-4">
            {/* Window bar */}
            <div className="flex items-center justify-between pb-2 border-b border-white/10">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500"></span>
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                <span className="text-[11px] text-slate-400 font-mono ml-2">PRJ-1001 • Skyline Residences</span>
              </div>
              <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-full font-bold">
                Live Sync
              </span>
            </div>

            {/* Dashboard snippet inside card */}
            <div>
              <h3 className="font-bold text-sm text-slate-200">
                Good Morning, Rohit Sharma 👋
              </h3>
              <p className="text-[11px] text-slate-400">Here's what's happening on your project today.</p>
            </div>

            {/* 4 Mini metrics */}
            <div className="grid grid-cols-4 gap-2 text-center">
              <div className="p-2 rounded-xl bg-white/5 border border-white/5">
                <div className="text-[10px] text-slate-400 font-bold uppercase">Tasks</div>
                <div className="font-extrabold text-white text-xs mt-0.5">24</div>
              </div>
              <div className="p-2 rounded-xl bg-white/5 border border-white/5">
                <div className="text-[10px] text-slate-400 font-bold uppercase">Active</div>
                <div className="font-extrabold text-blue-400 text-xs mt-0.5">16</div>
              </div>
              <div className="p-2 rounded-xl bg-white/5 border border-white/5">
                <div className="text-[10px] text-slate-400 font-bold uppercase">Done</div>
                <div className="font-extrabold text-emerald-400 text-xs mt-0.5">6</div>
              </div>
              <div className="p-2 rounded-xl bg-white/5 border border-white/5">
                <div className="text-[10px] text-slate-400 font-bold uppercase">Pending</div>
                <div className="font-extrabold text-amber-400 text-xs mt-0.5">38</div>
              </div>
            </div>

            {/* Progress Bar inside HUD */}
            <div className="space-y-1.5 pt-1">
              <div className="flex justify-between text-[11px] font-semibold text-slate-300">
                <span>Superstructure Framing</span>
                <span className="text-amber-400 font-bold">72% Finished</span>
              </div>
              <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                <div className="bg-gradient-to-r from-amber-500 to-amber-400 h-full w-[72%] rounded-full"></div>
              </div>
            </div>
          </div>

          {/* Left Floating Hologram Card: Progress checklist */}
          <div className="hidden lg:block absolute left-4 top-1/4 -translate-y-1/2 w-56 bg-[#0E172E]/80 backdrop-blur-md border border-cyan-500/30 rounded-2xl p-4 shadow-xl z-10 animate-pulse">
            <div className="text-[11px] font-bold text-cyan-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" /> Project Progress
            </div>
            <div className="space-y-2 text-[11px]">
              <div className="flex items-center justify-between text-slate-200">
                <span className="flex items-center gap-1.5 font-medium">
                  <Check className="w-3.5 h-3.5 text-emerald-400" /> Foundation
                </span>
                <span className="font-bold text-emerald-400">100%</span>
              </div>
              <div className="flex items-center justify-between text-slate-200">
                <span className="flex items-center gap-1.5 font-medium">
                  <span className="w-2 h-2 rounded-full bg-amber-400"></span> Structure
                </span>
                <span className="font-bold text-amber-400">72%</span>
              </div>
              <div className="flex items-center justify-between text-slate-400">
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-slate-600"></span> Electrical
                </span>
                <span>0%</span>
              </div>
              <div className="flex items-center justify-between text-slate-400">
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-slate-600"></span> Finishing
                </span>
                <span>0%</span>
              </div>
            </div>
          </div>

          {/* Right Floating Hologram Card: 3D Wireframe BIM Model */}
          <div className="hidden lg:block absolute right-4 top-1/4 -translate-y-1/2 w-56 bg-[#0E172E]/80 backdrop-blur-md border border-blue-500/30 rounded-2xl p-4 shadow-xl z-10">
            <div className="text-[11px] font-bold text-blue-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <Building className="w-3.5 h-3.5" /> 3D BIM Wireframe
            </div>
            <div className="h-24 rounded-xl border border-dashed border-blue-400/40 bg-blue-500/5 flex flex-col items-center justify-center text-blue-300 text-center p-2">
              <Building className="w-8 h-8 opacity-70 mb-1" />
              <span className="text-[10px] font-mono">LOD 400 • IFC Model</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section: Progress Bar & Milestone Badges */}
      <footer className="relative z-10 w-full max-w-2xl mx-auto space-y-6 text-center">
        <div>
          <h2 className="text-xl md:text-2xl font-black text-white tracking-tight">
            Building a Smarter Construction Future
          </h2>
          <p className="text-xs text-slate-400 mt-1 font-medium">
            {currentStep}
          </p>
        </div>

        {/* Interactive Glowing Loading Bar */}
        <div className="space-y-2">
          <div className="w-full bg-slate-800/80 h-3.5 rounded-full overflow-hidden p-0.5 border border-white/10 shadow-inner relative">
            <div
              style={{ width: `${progress}%` }}
              className="bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-300 h-full rounded-full transition-all duration-100 shadow-[0_0_20px_rgba(245,158,11,0.6)] relative"
            >
              {/* Glowing leading tip */}
              <div className="absolute right-0 top-0 bottom-0 w-3 bg-white rounded-full blur-[1px]"></div>
            </div>
          </div>
          <div className="text-xs font-black text-amber-400 font-mono tracking-wider">
            {progress}%
          </div>
        </div>

        {/* 4 Interactive Milestone Badges */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
          <div
            className={`p-3 rounded-2xl border transition-all text-xs flex flex-col items-center gap-1.5 ${
              progress >= 25
                ? 'bg-blue-500/10 border-blue-500/40 text-blue-300 shadow-[0_0_15px_rgba(59,130,246,0.15)]'
                : 'bg-white/5 border-white/5 text-slate-500'
            }`}
          >
            <Shield className="w-5 h-5" />
            <span className="font-bold text-[11px] leading-tight">Secure Connection</span>
          </div>

          <div
            className={`p-3 rounded-2xl border transition-all text-xs flex flex-col items-center gap-1.5 ${
              progress >= 50
                ? 'bg-amber-500/10 border-amber-500/40 text-amber-300 shadow-[0_0_15px_rgba(245,158,11,0.15)]'
                : 'bg-white/5 border-white/5 text-slate-500'
            }`}
          >
            <Cloud className="w-5 h-5" />
            <span className="font-bold text-[11px] leading-tight">Loading Projects</span>
          </div>

          <div
            className={`p-3 rounded-2xl border transition-all text-xs flex flex-col items-center gap-1.5 ${
              progress >= 75
                ? 'bg-purple-500/10 border-purple-500/40 text-purple-300 shadow-[0_0_15px_rgba(168,85,247,0.15)]'
                : 'bg-white/5 border-white/5 text-slate-500'
            }`}
          >
            <Settings className="w-5 h-5" />
            <span className="font-bold text-[11px] leading-tight">Preparing Features</span>
          </div>

          <div
            className={`p-3 rounded-2xl border transition-all text-xs flex flex-col items-center gap-1.5 ${
              progress >= 100
                ? 'bg-emerald-500/15 border-emerald-500/40 text-emerald-300 shadow-[0_0_15px_rgba(16,185,129,0.2)]'
                : 'bg-white/5 border-white/5 text-slate-500'
            }`}
          >
            <Database className="w-5 h-5" />
            <span className="font-bold text-[11px] leading-tight">Almost Ready</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
