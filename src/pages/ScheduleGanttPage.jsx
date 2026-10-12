import React, { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import {
  CalendarDays,
  Plus,
  Sparkles,
  Download,
  Filter,
  CheckCircle2,
  Clock,
  ChevronRight,
  ChevronLeft,
  ZoomIn,
  ZoomOut,
  Layers,
  ArrowRight,
  Check
} from 'lucide-react';
import { scheduleGanttData } from '../data/mockData';

export default function ScheduleGanttPage() {
  const { openCreateTask, openAI } = useOutletContext();
  const [activeTab, setActiveTab] = useState('Working Schedule');
  const [tasks, setTasks] = useState(scheduleGanttData);
  const [selectedTask, setSelectedTask] = useState(tasks[5]); // Level 5 Slab Shuttering

  const tabs = ['Published Schedule', 'Working Schedule', 'Baseline', 'Calendar', 'Agenda', 'Work Days'];

  return (
    <div className="space-y-6">
      {/* Schedule Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="text-xs font-bold text-blue-600 mb-1 flex items-center gap-1.5">
            <span>001 — Skyline Residences (PRJ-1001)</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-[#172B4D] tracking-tight flex items-center gap-3">
            Gantt Schedule & Milestone Timeline
            <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800">
              39 tasks, 38 deps
            </span>
          </h1>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={openAI}
            className="flex items-center gap-1.5 px-3.5 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white rounded-xl text-xs font-bold shadow transition"
          >
            <Sparkles className="w-3.5 h-3.5" /> AI Schedule Optimizer
          </button>
          <button
            onClick={openCreateTask}
            className="flex items-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-md shadow-blue-500/20 transition"
          >
            <Plus className="w-4 h-4" /> Quick Add Task
          </button>
        </div>
      </div>

      {/* Schedule Control Bar Tabs */}
      <div className="bg-white p-2.5 rounded-2xl border border-slate-200/80 shadow-xs flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-1 overflow-x-auto py-1">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition whitespace-nowrap ${
                activeTab === tab
                  ? 'bg-blue-50 text-blue-700 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-200">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            Autosave On
          </div>
          <button className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-bold flex items-center gap-1 transition">
            <Download className="w-3.5 h-3.5" /> Export PDF
          </button>
        </div>
      </div>

      {/* Main Gantt Grid Container */}
      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs overflow-hidden">
        {/* Info Banner */}
        <div className="p-3 bg-emerald-50/70 border-b border-emerald-100 text-emerald-800 text-xs font-semibold flex items-center justify-between px-6">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>You have edit control. Schedule lock refreshes automatically every 5 minutes. Critical path calculated.</span>
          </div>
          <span className="text-[11px] text-emerald-700 font-bold">5 Days Ahead of Baseline</span>
        </div>

        {/* Gantt Interactive Table */}
        <div className="overflow-x-auto">
          <div className="min-w-[950px]">
            {/* Table Header: Task Columns + Timeline Dates */}
            <div className="grid grid-cols-12 bg-slate-50 border-b border-slate-200 text-[11px] font-bold text-slate-500 uppercase tracking-wider py-3 px-4">
              <div className="col-span-1">#</div>
              <div className="col-span-3">Task Name</div>
              <div className="col-span-1">Duration</div>
              <div className="col-span-2">Subcontractor</div>
              <div className="col-span-1 text-center">% Done</div>
              {/* Timeline Header (Months / Weeks) */}
              <div className="col-span-4 grid grid-cols-4 text-center border-l border-slate-200 text-blue-700 font-extrabold">
                <div>May 10</div>
                <div>May 24</div>
                <div>Jun 07</div>
                <div>Jun 21</div>
              </div>
            </div>

            {/* Table Rows */}
            <div className="divide-y divide-slate-100 text-xs">
              {tasks.map((task, idx) => {
                const isSelected = selectedTask?.id === task.id;
                return (
                  <div
                    key={task.id}
                    onClick={() => setSelectedTask(task)}
                    className={`grid grid-cols-12 items-center py-3.5 px-4 cursor-pointer transition ${
                      isSelected ? 'bg-blue-50/50' : 'hover:bg-slate-50/80'
                    }`}
                  >
                    <div className="col-span-1 font-bold text-slate-400">{idx + 1}</div>
                    <div className="col-span-3 font-bold text-slate-900 truncate flex items-center gap-2">
                      <span className={`w-2 h-2 rounded-full ${task.progress === 100 ? 'bg-emerald-500' : 'bg-blue-600'}`}></span>
                      {task.name}
                    </div>
                    <div className="col-span-1 text-slate-600 font-medium">{task.duration}</div>
                    <div className="col-span-2 text-slate-600 truncate">{task.vendor}</div>
                    <div className="col-span-1 text-center font-bold text-slate-800">
                      {task.progress}%
                    </div>

                    {/* Timeline Bar visualization */}
                    <div className="col-span-4 border-l border-slate-200 px-3 relative h-8 flex items-center">
                      <div className="w-full bg-slate-100 h-4 rounded-md relative overflow-hidden">
                        <div
                          style={{
                            left: task.offset,
                            width: task.width,
                          }}
                          className={`absolute top-0 bottom-0 rounded-md transition-all duration-300 flex items-center justify-between px-2 text-[10px] text-white font-bold shadow-xs ${task.color}`}
                        >
                          <span className="truncate">{task.progress}%</span>
                          {task.isCurrent && (
                            <span className="w-2 h-2 bg-white rounded-full animate-ping"></span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Selected Task Inspector Card */}
      {selectedTask && (
        <div className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-bold text-white ${selectedTask.color}`}>
              {selectedTask.progress}%
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-100 text-blue-700">
                  Active Timeline Task #{selectedTask.id}
                </span>
                <span className="text-xs font-semibold text-slate-500">{selectedTask.start} – {selectedTask.end}</span>
              </div>
              <h3 className="text-sm font-bold text-slate-900 mt-1">{selectedTask.name}</h3>
              <p className="text-xs text-slate-500">
                Assigned Subcontractor: <strong className="text-slate-700">{selectedTask.vendor}</strong> • Duration: {selectedTask.duration}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={openAI}
              className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-500" /> Ask AI to Check Dependencies
            </button>
            <button
              onClick={openCreateTask}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition"
            >
              Edit Milestone
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
