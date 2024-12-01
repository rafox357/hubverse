import React from 'react';
import { useStore } from '../store';

const AgilePage: React.FC = () => {
  // Example of accessing a project from the store
  const projects = useStore((state) => state.projects);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Agile Management</h1>
      
      {/* You can now use projects if needed */}
      {projects.length === 0 && (
        <p>No projects available</p>
      )}
      
      {/* Rest of your existing code */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Sprint Planning */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Sprint Planning</h2>
          <div className="space-y-4">
            {/* Add sprint planning components */}
          </div>
        </div>

        {/* Active Sprint */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Active Sprint</h2>
          <div className="space-y-4">
            {/* Add active sprint components */}
          </div>
        </div>
      </div>
    </div>
  );
};



export default AgilePage;
