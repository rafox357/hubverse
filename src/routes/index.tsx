import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MainDashboard from '../components/Dashboard/MainDashboard';
import ProjectsPage from '../pages/ProjectsPage';
import CollaborationPage from '../pages/CollaborationPage';
import TimePage from '../pages/TimePage';
import DocsPage from '../pages/DocsPage';
import GoalsPage from '../pages/GoalsPage';
import AgilePage from '../pages/AgilePage';
import ChatPage from '../pages/ChatPage';
import WhiteboardPage from '../pages/WhiteboardPage';
import SettingsPage from '../pages/SettingsPage';

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<MainDashboard />} />
      <Route path="/projects/*" element={<ProjectsPage />} />
      <Route path="/collaboration" element={<CollaborationPage />} />
      <Route path="/time" element={<TimePage />} />
      <Route path="/docs" element={<DocsPage />} />
      <Route path="/goals" element={<GoalsPage />} />
      <Route path="/agile" element={<AgilePage />} />
      <Route path="/chat" element={<ChatPage />} />
      <Route path="/whiteboard" element={<WhiteboardPage />} />
      <Route path="/settings" element={<SettingsPage />} />
    </Routes>
  );
};

export default AppRoutes;
