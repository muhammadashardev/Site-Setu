import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import AIAssistantDrawer from './AIAssistantDrawer';
import CreateTaskModal from './CreateTaskModal';
import QuickActionModal from './QuickActionModal';
import NotificationDrawer from './NotificationDrawer';
import GlobalSearchModal from './GlobalSearchModal';
import { activeProject } from '../data/mockData';

export default function AppLayout() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isAIOpen, setIsAIOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCreateTaskOpen, setIsCreateTaskOpen] = useState(false);
  const [quickActionType, setQuickActionType] = useState(null);
  const [selectedProject, setSelectedProject] = useState(activeProject);

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex font-['Plus_Jakarta_Sans',sans-serif]">
      {/* Sidebar Navigation */}
      <Sidebar
        collapsed={sidebarCollapsed}
        setCollapsed={setSidebarCollapsed}
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
      />

      {/* Main Content Column — Physically Offset by Sidebar Width */}
      <div
        className={`flex-1 flex flex-col min-w-0 transition-all duration-300 ease-in-out ${
          sidebarCollapsed ? 'md:ml-20' : 'md:ml-64'
        } ml-0`}
      >
        {/* Top Sticky Navbar */}
        <Navbar
          onOpenAI={() => setIsAIOpen(true)}
          onOpenNotifications={() => setIsNotificationsOpen(true)}
          onOpenSearch={() => setIsSearchOpen(true)}
          selectedProject={selectedProject}
          setSelectedProject={setSelectedProject}
          onToggleMobile={() => setMobileOpen(!mobileOpen)}
        />

        {/* Dynamic Page Outlet with No Sidebar Overlap */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 w-full min-w-0 overflow-x-hidden">
          <Outlet
            context={{
              selectedProject,
              openCreateTask: () => setIsCreateTaskOpen(true),
              openQuickAction: (type) => setQuickActionType(type),
              openAI: () => setIsAIOpen(true),
            }}
          />
        </main>
      </div>

      {/* Global Modals & Slide-out Drawers */}
      <AIAssistantDrawer
        isOpen={isAIOpen}
        onClose={() => setIsAIOpen(false)}
      />

      <NotificationDrawer
        isOpen={isNotificationsOpen}
        onClose={() => setIsNotificationsOpen(false)}
      />

      <GlobalSearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />

      <CreateTaskModal
        isOpen={isCreateTaskOpen}
        onClose={() => setIsCreateTaskOpen(false)}
        onTaskCreated={(newTask) => {
          console.log("New Task Created:", newTask);
        }}
      />

      <QuickActionModal
        actionType={quickActionType}
        isOpen={!!quickActionType}
        onClose={() => setQuickActionType(null)}
      />
    </div>
  );
}
