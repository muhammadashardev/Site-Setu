import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import AppLayout from './components/AppLayout';
import CompanyDashboard from './pages/CompanyDashboard';
import ProjectsPage from './pages/ProjectsPage';
import ScheduleGanttPage from './pages/ScheduleGanttPage';
import TasksPage from './pages/TasksPage';
import FieldOperationsPage from './pages/FieldOperationsPage';
import RFIsApprovalsPage from './pages/RFIsApprovalsPage';
import FinanceCostPage from './pages/FinanceCostPage';
import SafetyCompliancePage from './pages/SafetyCompliancePage';
import SuperAdminPage from './pages/SuperAdminPage';
import ClientPortalPage from './pages/ClientPortalPage';
import AIAssistantPage from './pages/AIAssistantPage';
import LoginPage from './pages/LoginPage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Dedicated Login & Role Selector Page */}
        <Route path="/login" element={<LoginPage />} />

        <Route path="/" element={<AppLayout />}>
          {/* Company Operations Dashboard */}
          <Route index element={<CompanyDashboard />} />
          
          {/* Projects Portfolio */}
          <Route path="projects" element={<ProjectsPage />} />
          
          {/* Schedule & Gantt Timeline */}
          <Route path="schedule" element={<ScheduleGanttPage />} />
          
          {/* Tasks & Workflows (Kanban & List) */}
          <Route path="tasks" element={<TasksPage />} />
          
          {/* Field Operations & Daily Site Logs */}
          <Route path="field-ops" element={<FieldOperationsPage />} />
          
          {/* RFIs & Approvals */}
          <Route path="rfis-approvals" element={<RFIsApprovalsPage />} />
          
          {/* Cost & Budget */}
          <Route path="finance" element={<FinanceCostPage />} />
          
          {/* Safety & Compliance */}
          <Route path="safety" element={<SafetyCompliancePage />} />
          
          {/* Super Admin Multi-tenant Platform */}
          <Route path="super-admin" element={<SuperAdminPage />} />
          
          {/* External Client & Owner Portal */}
          <Route path="client-portal" element={<ClientPortalPage />} />
          
          {/* AI Construction Copilot */}
          <Route path="ai-assistant" element={<AIAssistantPage />} />

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
