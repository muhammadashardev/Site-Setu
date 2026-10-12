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
import SuperAdminTenants from './pages/superadmin/SuperAdminTenants';
import SuperAdminSubscriptions from './pages/superadmin/SuperAdminSubscriptions';
import SuperAdminSystemHealth from './pages/superadmin/SuperAdminSystemHealth';
import SuperAdminAuditLogs from './pages/superadmin/SuperAdminAuditLogs';
import ClientPortalPage from './pages/ClientPortalPage';
import ClientPortalMilestones from './pages/client/ClientPortalMilestones';
import ClientPortalDocuments from './pages/client/ClientPortalDocuments';
import ClientPortalApprovals from './pages/client/ClientPortalApprovals';
import ClientPortalFinances from './pages/client/ClientPortalFinances';
import AIAssistantPage from './pages/AIAssistantPage';
import LoginPage from './pages/LoginPage';
import SplashLoaderPage from './pages/SplashLoaderPage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Interactive 3D Construction Splash Loader */}
        <Route path="/splash" element={<SplashLoaderPage />} />
        <Route path="/welcome" element={<SplashLoaderPage />} />

        {/* Dedicated Login & Role Selector Page */}
        <Route path="/login" element={<LoginPage />} />

        {/* Unified Application Layout */}
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
          
          {/* Super Admin Multi-tenant Platform Suite */}
          <Route path="super-admin" element={<SuperAdminPage />} />
          <Route path="super-admin/tenants" element={<SuperAdminTenants />} />
          <Route path="super-admin/subscriptions" element={<SuperAdminSubscriptions />} />
          <Route path="super-admin/system-health" element={<SuperAdminSystemHealth />} />
          <Route path="super-admin/audit-logs" element={<SuperAdminAuditLogs />} />
          
          {/* External Client & Property Owner Portal Suite */}
          <Route path="client-portal" element={<ClientPortalPage />} />
          <Route path="client-portal/milestones" element={<ClientPortalMilestones />} />
          <Route path="client-portal/documents" element={<ClientPortalDocuments />} />
          <Route path="client-portal/approvals" element={<ClientPortalApprovals />} />
          <Route path="client-portal/finances" element={<ClientPortalFinances />} />
          
          {/* AI Construction Copilot */}
          <Route path="ai-assistant" element={<AIAssistantPage />} />

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
