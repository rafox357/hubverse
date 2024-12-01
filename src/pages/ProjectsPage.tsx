import React, { useState } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import ProjectBoard from '../components/ProjectManagement/ProjectBoard';
import { FiList, FiGrid, FiCalendar, FiClock } from 'react-icons/fi';

const ProjectsPage: React.FC = () => {
  const location = useLocation();
  const [currentView, setCurrentView] = useState('board');

  const views = [
    { id: 'list', icon: FiList, label: 'List View' },
    { id: 'board', icon: FiGrid, label: 'Board View' },
    { id: 'calendar', icon: FiCalendar, label: 'Calendar' },
    { id: 'timeline', icon: FiClock, label: 'Timeline' },
  ];

  return (
    <div className="h-full flex flex-col">
      {/* Project Header */}
      <div className="bg-white border-b px-6 py-4">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold text-gray-900">Projects</h1>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            New Project
          </button>
        </div>

        {/* View Switcher */}
        <div className="flex space-x-1 mt-4">
          {views.map((view) => {
            const Icon = view.icon;
            return (
              <Link
                key={view.id}
                to={`/projects/${view.id}`}
                className={`flex items-center px-4 py-2 rounded-lg text-sm ${
                  currentView === view.id
                    ? 'bg-blue-50 text-blue-700'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
                onClick={() => setCurrentView(view.id)}
              >
                <Icon className="w-4 h-4 mr-2" />
                {view.label}
              </Link>
            );
          })}
        </div>
      </div>

      {/* Project Content */}
      <div className="flex-1 overflow-hidden">
        <Routes>
          <Route path="/" element={<ProjectBoard />} />
          <Route path="/board" element={<ProjectBoard />} />
          <Route path="/list" element={<div>List View (Coming Soon)</div>} />
          <Route path="/calendar" element={<div>Calendar View (Coming Soon)</div>} />
          <Route path="/timeline" element={<div>Timeline View (Coming Soon)</div>} />
        </Routes>
      </div>
    </div>
  );
};

export default ProjectsPage;
