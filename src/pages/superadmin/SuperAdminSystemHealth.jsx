import React from 'react';
import {
  Server,
  Activity,
  CheckCircle2,
  AlertTriangle,
  RefreshCw,
  Cpu,
  HardDrive,
  Database,
  Cloud
} from 'lucide-react';
import { superAdminMetrics } from '../../data/mockData';

export default function SuperAdminSystemHealth() {
  const nodes = [
    { name: "API Cluster — Mumbai (ap-south-1)", type: "Edge Kubernetes", load: "28%", memory: "18.4 GB / 64 GB", ping: "14ms", status: "Operational" },
    { name: "PostgreSQL HA Database Cluster", type: "Primary + 2 Read Replicas", load: "42%", memory: "64.2 GB / 128 GB", ping: "2ms", status: "Operational" },
    { name: "AWS S3 Multi-Region BIM Storage", type: "Object Store (Encrypted AES-256)", load: "18%", memory: "14.2 TB / 50 TB", ping: "35ms", status: "Operational" },
    { name: "SiteSetu AI & OCR Inference Worker", type: "GPU T4 Node Pool", load: "61%", memory: "28.5 GB / 32 GB", ping: "89ms", status: "Operational" },
    { name: "Redis Cache & Webhook Queue Cluster", type: "In-Memory Ingestion", load: "12%", memory: "8.1 GB / 16 GB", ping: "1ms", status: "Operational" },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="text-xs font-bold text-amber-600 mb-1 flex items-center gap-1.5">
            <span>Platform Administration • Infrastructure Observability</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-[#172B4D] tracking-tight">
            System Health, Clusters & DevOps
          </h1>
          <p className="text-xs md:text-sm text-slate-500 mt-1">
            Real-time status of multi-tenant API gateways, relational databases, AI workers, and object storage.
          </p>
        </div>

        <button className="flex items-center gap-1.5 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-2xl text-xs font-bold transition">
          <RefreshCw className="w-3.5 h-3.5" /> Force Health Ping
        </button>
      </div>

      {/* 4 Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
          <span className="text-[11px] font-bold text-slate-400 uppercase">Platform Uptime (30d)</span>
          <div className="text-2xl font-extrabold text-emerald-600 mt-1">99.98%</div>
          <span className="text-[11px] text-slate-500 font-medium">SLA target exceeded</span>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
          <span className="text-[11px] font-bold text-slate-400 uppercase">Median API Latency</span>
          <div className="text-2xl font-extrabold text-blue-600 mt-1">42ms</div>
          <span className="text-[11px] text-emerald-600 font-bold">Fast globally cached</span>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
          <span className="text-[11px] font-bold text-slate-400 uppercase">Storage Utilized</span>
          <div className="text-2xl font-extrabold text-purple-600 mt-1">14.2 TB</div>
          <span className="text-[11px] text-slate-500 font-medium">BIM drawings & 4K video</span>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
          <span className="text-[11px] font-bold text-slate-400 uppercase">Error Rate (24h)</span>
          <div className="text-2xl font-extrabold text-slate-900 mt-1">0.002%</div>
          <span className="text-[11px] text-emerald-600 font-bold">0 critical outages</span>
        </div>
      </div>

      {/* Infrastructure Node List */}
      <div className="bg-white p-6 md:p-7 rounded-3xl border border-slate-200/80 shadow-xs">
        <h2 className="text-base font-extrabold text-slate-900 mb-4">
          Active Infrastructure Node Pools
        </h2>

        <div className="space-y-4">
          {nodes.map((node, idx) => (
            <div
              key={idx}
              className="p-4 rounded-2xl bg-slate-50 border border-slate-150 flex flex-col md:flex-row md:items-center justify-between gap-4 text-xs"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
                  <Server className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-extrabold text-slate-900 text-xs">{node.name}</h4>
                  <p className="text-[11px] text-slate-400 font-medium">{node.type} • Ping: {node.ping}</p>
                </div>
              </div>

              <div className="flex items-center gap-6">
                <div>
                  <span className="text-[10px] text-slate-400 font-bold uppercase">Memory Usage</span>
                  <p className="font-bold text-slate-800">{node.memory}</p>
                </div>

                <div className="w-32">
                  <div className="flex justify-between text-[10px] font-bold text-slate-500 mb-1">
                    <span>CPU LOAD</span>
                    <span>{node.load}</span>
                  </div>
                  <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                    <div
                      style={{ width: node.load }}
                      className="bg-blue-600 h-full rounded-full"
                    ></div>
                  </div>
                </div>

                <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 flex items-center gap-1 shrink-0">
                  <CheckCircle2 className="w-3.5 h-3.5" /> {node.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
