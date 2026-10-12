import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Layers,
  Building2,
  ShieldAlert,
  Users,
  HardHat,
  ArrowRight,
  Lock,
  Mail,
  CheckCircle2,
  Sparkles,
  Shield,
  Eye,
  EyeOff
} from 'lucide-react';

export default function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('rohit.sharma@apexinfra.com');
  const [password, setPassword] = useState('••••••••••••');
  const [showPassword, setShowPassword] = useState(false);
  const [selectedRole, setSelectedRole] = useState('pm');

  const demoRoles = [
    {
      id: 'pm',
      title: 'Company Project Manager',
      user: 'Rohit Sharma',
      org: 'Apex InfraTech Solutions',
      route: '/',
      icon: Building2,
      color: 'bg-blue-600 text-white',
      badge: 'Main Company Ops',
      badgeColor: 'bg-blue-100 text-blue-800',
      desc: 'Full operational control: Gantt schedules, active projects, tasks, BOQ finance & RFIs.',
    },
    {
      id: 'admin',
      title: 'Super Admin / Platform Owner',
      user: 'System Administrator',
      org: 'SiteSetu Global SaaS',
      route: '/super-admin',
      icon: ShieldAlert,
      color: 'bg-slate-900 text-amber-400',
      badge: 'Tenant Admin',
      badgeColor: 'bg-amber-100 text-amber-800',
      desc: 'Multi-tenant isolation, MRR subscriptions, server clusters & global feature flags.',
    },
    {
      id: 'client',
      title: 'External Client / Property Owner',
      user: 'Rajiv Mehta (Managing Director)',
      org: 'Skyline Realty Holdings Ltd',
      route: '/client-portal',
      icon: Users,
      color: 'bg-emerald-600 text-white',
      badge: 'Client Portal',
      badgeColor: 'bg-emerald-100 text-emerald-800',
      desc: 'Verified milestone progress, drone footage, change order sign-offs & billing invoices.',
    },
    {
      id: 'field',
      title: 'Site Engineer / Field Supervisor',
      user: 'Amit Verma',
      org: 'Field Operations Crew',
      route: '/field-ops',
      icon: HardHat,
      color: 'bg-amber-600 text-white',
      badge: 'Field Ops',
      badgeColor: 'bg-orange-100 text-orange-800',
      desc: 'Daily concrete pouring logs, biometric manpower tracking & punch list inspections.',
    },
  ];

  const handleRoleSelect = (role) => {
    setSelectedRole(role.id);
    navigate(role.route);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const active = demoRoles.find((r) => r.id === selectedRole) || demoRoles[0];
    navigate(active.route);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col lg:flex-row font-['Plus_Jakarta_Sans',sans-serif]">
      {/* Left Brand Showcase Column */}
      <div className="lg:w-5/12 bg-gradient-to-br from-[#172B4D] via-[#0F1E36] to-slate-950 p-8 lg:p-12 text-white flex flex-col justify-between relative overflow-hidden">
        {/* Background glow effects */}
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>

        {/* Top Logo */}
        <div className="relative z-10">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-blue-600 flex items-center justify-center text-white shadow-lg shadow-blue-600/30">
              <Layers className="w-6 h-6" />
            </div>
            <div>
              <span className="font-extrabold text-2xl tracking-tight flex items-center gap-2">
                SiteSetu
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 border border-blue-400/30">
                  Enterprise
                </span>
              </span>
              <p className="text-xs text-slate-400 font-medium">Construction Management Cloud Platform</p>
            </div>
          </div>
        </div>

        {/* Hero Visual Card */}
        <div className="my-10 relative z-10 space-y-6">
          <div className="p-6 rounded-3xl bg-white/5 backdrop-blur-md border border-white/10 shadow-2xl space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-amber-400 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" /> Project PRJ-1001 Live
              </span>
              <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-full font-bold">
                98% On Track
              </span>
            </div>

            <h2 className="text-xl font-bold leading-snug">
              Connected construction intelligence from the site trailer to the executive boardroom.
            </h2>

            <div className="grid grid-cols-2 gap-3 pt-2">
              <div className="p-3 rounded-2xl bg-white/5 border border-white/5">
                <div className="text-[10px] text-slate-400 font-bold uppercase">Active Projects</div>
                <div className="text-lg font-extrabold text-white mt-0.5">184 Sites</div>
              </div>
              <div className="p-3 rounded-2xl bg-white/5 border border-white/5">
                <div className="text-[10px] text-slate-400 font-bold uppercase">Contract Volume</div>
                <div className="text-lg font-extrabold text-white mt-0.5">$4.2B+ BOQ</div>
              </div>
            </div>
          </div>

          <div className="space-y-2 text-xs text-slate-300">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Multi-tenant SaaS workspace isolation with zero data leak</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Integrated AI Copilot for automated RFI drafting and BOQ audit</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Dedicated Client Portal for transparent investor progress milestones</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="relative z-10 text-[11px] text-slate-400 flex items-center justify-between">
          <span>© 2026 SiteSetu Technologies</span>
          <span className="flex items-center gap-1 text-slate-300">
            <Shield className="w-3.5 h-3.5 text-blue-400" /> ISO 27001 & SOC-2 Certified
          </span>
        </div>
      </div>

      {/* Right Column: 1-Click Role Login Selector */}
      <div className="lg:w-7/12 p-8 lg:p-14 flex flex-col justify-center max-w-3xl mx-auto w-full">
        <div className="mb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold border border-blue-200 mb-3">
            <Sparkles className="w-3.5 h-3.5" /> Interactive Demo Role Selector
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-[#172B4D] tracking-tight">
            Sign In to SiteSetu Workspace
          </h1>
          <p className="text-sm text-slate-500 mt-1 font-medium">
            Select an account role below to instantly launch that personalized demo experience:
          </p>
        </div>

        {/* 4 Interactive Role Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          {demoRoles.map((role) => {
            const Icon = role.icon;
            const isSelected = selectedRole === role.id;
            return (
              <div
                key={role.id}
                onClick={() => handleRoleSelect(role)}
                className={`p-5 rounded-3xl border-2 transition-all duration-200 cursor-pointer flex flex-col justify-between group hover:shadow-lg ${
                  isSelected
                    ? 'border-blue-600 bg-blue-50/40 shadow-sm'
                    : 'border-slate-200 hover:border-blue-300 bg-white shadow-xs'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className={`w-11 h-11 rounded-2xl flex items-center justify-center font-bold shadow-xs ${role.color}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className={`text-[10px] font-extrabold px-2.5 py-1 rounded-full ${role.badgeColor}`}>
                      {role.badge}
                    </span>
                  </div>

                  <h3 className="text-sm font-extrabold text-slate-900 group-hover:text-blue-600 transition leading-snug">
                    {role.title}
                  </h3>
                  <p className="text-xs font-bold text-slate-700 mt-1">
                    {role.user}
                  </p>
                  <p className="text-[11px] text-slate-400 font-medium">
                    {role.org}
                  </p>

                  <p className="text-xs text-slate-500 mt-3 leading-relaxed">
                    {role.desc}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs font-extrabold text-blue-600 group-hover:translate-x-1 transition-transform flex items-center gap-1">
                    Launch Role Workspace <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Traditional Credentials Form Accordion */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs">
          <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
            Or Standard Email Sign-In
          </div>
          <form onSubmit={handleFormSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Work Email</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Password</label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-10 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:bg-white"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs pt-1">
              <label className="flex items-center gap-2 cursor-pointer font-medium text-slate-600">
                <input type="checkbox" defaultChecked className="rounded text-blue-600" />
                <span>Remember this device (30 days)</span>
              </label>
              <a href="#" className="font-bold text-blue-600 hover:text-blue-700">
                Forgot password?
              </a>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl text-xs font-extrabold shadow-md shadow-blue-500/20 transition flex items-center justify-center gap-2"
            >
              Sign In to SiteSetu Dashboard <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
