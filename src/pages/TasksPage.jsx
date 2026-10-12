import React, { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import {
  CheckSquare,
  Plus,
  Filter,
  Search,
  Calendar,
  User,
  Clock,
  MoreVertical,
  CheckCircle2,
  AlertCircle,
  LayoutGrid,
  List
} from 'lucide-react';
import { taskBoardColumns } from '../data/mockData';

export default function TasksPage() {
  const { openCreateTask } = useOutletContext();
  const [columns, setColumns] = useState(taskBoardColumns);
  const [view, setView] = useState('kanban'); // 'kanban' | 'list'
  const [selectedPhase, setSelectedPhase] = useState('All');

  // Simple drag-less status shift for interactive demo
  const moveTask = (fromCol, toCol, taskId) => {
    const task = columns[fromCol].find((t) => t.id === taskId);
    if (!task) return;

    setColumns((prev) => ({
      ...prev,
      [fromCol]: prev[fromCol].filter((t) => t.id !== taskId),
      [toCol]: [...prev[toCol], task],
    }));
  };

  const columnConfig = [
    { id: 'todo', title: 'To Do', badge: 'bg-slate-100 text-slate-700', border: 'border-slate-300' },
    { id: 'inprogress', title: 'In Progress', badge: 'bg-blue-100 text-blue-800', border: 'border-blue-500' },
    { id: 'review', title: 'Quality Review', badge: 'bg-amber-100 text-amber-800', border: 'border-amber-500' },
    { id: 'completed', title: 'Completed', badge: 'bg-emerald-100 text-emerald-800', border: 'border-emerald-500' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-[#172B4D] tracking-tight">
            Tasks & Workflows
          </h1>
          <p className="text-xs md:text-sm text-slate-500 mt-1">
            Manage field tasks, subtasks, contractor assignments, and quality checklists for Skyline Residences (PRJ-1001).
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center bg-slate-100 p-0.5 rounded-xl border border-slate-200">
            <button
              onClick={() => setView('kanban')}
              className={`p-1.5 rounded-lg text-xs font-semibold ${
                view === 'kanban' ? 'bg-white text-blue-600 shadow-xs' : 'text-slate-500'
              }`}
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setView('list')}
              className={`p-1.5 rounded-lg text-xs font-semibold ${
                view === 'list' ? 'bg-white text-blue-600 shadow-xs' : 'text-slate-500'
              }`}
            >
              <List className="w-4 h-4" />
            </button>
          </div>

          <button
            onClick={openCreateTask}
            className="flex items-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-md shadow-blue-500/20 transition"
          >
            <Plus className="w-4 h-4" /> Add Task
          </button>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="bg-white p-3 rounded-2xl border border-slate-200/80 shadow-xs flex items-center justify-between gap-3 overflow-x-auto">
        <div className="flex items-center gap-2">
          {['All', 'Structural', 'MEP', 'Quality', 'Safety', 'Procurement'].map((phase) => (
            <button
              key={phase}
              onClick={() => setSelectedPhase(phase)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition whitespace-nowrap ${
                selectedPhase === phase
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
              }`}
            >
              {phase}
            </button>
          ))}
        </div>
        <div className="text-xs text-slate-400 font-medium whitespace-nowrap">
          Click any card button to shift status interactively
        </div>
      </div>

      {/* Kanban Board */}
      {view === 'kanban' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {columnConfig.map((col) => {
            const taskList = columns[col.id].filter(
              (t) => selectedPhase === 'All' || t.phase === selectedPhase
            );
            return (
              <div
                key={col.id}
                className="bg-slate-100/70 p-4 rounded-3xl border border-slate-200/60 flex flex-col min-h-[500px]"
              >
                {/* Column Header */}
                <div className="flex items-center justify-between mb-3 pb-2 border-b border-slate-200">
                  <div className="flex items-center gap-2">
                    <span className="font-extrabold text-xs text-slate-900">{col.title}</span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${col.badge}`}>
                      {taskList.length}
                    </span>
                  </div>
                  <button
                    onClick={openCreateTask}
                    className="p-1 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-200"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>

                {/* Task Cards */}
                <div className="space-y-3 flex-1 overflow-y-auto">
                  {taskList.map((task) => (
                    <div
                      key={task.id}
                      className="p-4 bg-white rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-md transition space-y-3 group"
                    >
                      <div className="flex items-start justify-between">
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-50 text-blue-700">
                          {task.phase}
                        </span>
                        <span className={`text-[9px] font-extrabold px-1.5 py-0.5 rounded uppercase ${
                          task.priority === 'Urgent'
                            ? 'bg-rose-100 text-rose-700 animate-pulse'
                            : task.priority === 'High'
                            ? 'bg-amber-100 text-amber-700'
                            : 'bg-slate-100 text-slate-600'
                        }`}>
                          {task.priority}
                        </span>
                      </div>

                      <h4 className="text-xs font-bold text-slate-900 leading-snug group-hover:text-blue-600 transition">
                        {task.title}
                      </h4>

                      <div className="flex items-center justify-between text-[11px] text-slate-500 pt-2 border-t border-slate-100">
                        <span className="flex items-center gap-1 font-medium">
                          <Clock className="w-3.5 h-3.5 text-slate-400" /> {task.dueDate}
                        </span>
                        <span className="text-[10px] font-bold bg-slate-100 px-1.5 py-0.5 rounded text-slate-600">
                          ✓ {task.subtasks}
                        </span>
                      </div>

                      <div className="flex items-center justify-between pt-1">
                        <div className="flex items-center gap-1.5">
                          <div className="w-5 h-5 rounded-full bg-blue-600 text-white text-[9px] font-bold flex items-center justify-center">
                            {task.assignee.charAt(0)}
                          </div>
                          <span className="text-[10px] text-slate-600 font-medium truncate max-w-[90px]">
                            {task.assignee}
                          </span>
                        </div>

                        {/* Interactive Move Button */}
                        <div className="flex items-center gap-1">
                          {col.id !== 'completed' && (
                            <button
                              onClick={() => {
                                const nextCol =
                                  col.id === 'todo'
                                    ? 'inprogress'
                                    : col.id === 'inprogress'
                                    ? 'review'
                                    : 'completed';
                                moveTask(col.id, nextCol, task.id);
                              }}
                              className="text-[10px] font-bold text-blue-600 hover:text-blue-700 bg-blue-50 hover:bg-blue-100 px-2 py-0.5 rounded transition"
                            >
                              Move Next →
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* List View */
        <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-100 text-[11px] font-bold uppercase tracking-wider text-slate-400 bg-slate-50/50">
                  <th className="py-3 px-4">Task ID & Title</th>
                  <th className="py-3 px-4">Phase</th>
                  <th className="py-3 px-4">Assignee</th>
                  <th className="py-3 px-4">Priority</th>
                  <th className="py-3 px-4">Due Date</th>
                  <th className="py-3 px-4">Subtasks</th>
                  <th className="py-3 px-4 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                {Object.keys(columns).map((colKey) =>
                  columns[colKey].map((t) => (
                    <tr key={t.id} className="hover:bg-slate-50 transition">
                      <td className="py-3.5 px-4 font-bold text-slate-900">
                        <div>
                          <span>{t.title}</span>
                          <span className="text-[10px] text-slate-400 block font-normal">{t.id}</span>
                        </div>
                      </td>
                      <td className="py-3.5 px-4">{t.phase}</td>
                      <td className="py-3.5 px-4">{t.assignee}</td>
                      <td className="py-3.5 px-4">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          t.priority === 'Urgent'
                            ? 'bg-rose-100 text-rose-700'
                            : 'bg-amber-100 text-amber-700'
                        }`}>
                          {t.priority}
                        </span>
                      </td>
                      <td className="py-3.5 px-4">{t.dueDate}</td>
                      <td className="py-3.5 px-4">{t.subtasks}</td>
                      <td className="py-3.5 px-4 text-right">
                        <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-blue-100 text-blue-800">
                          {colKey}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
