import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  FiUser, FiShield, FiBarChart2, FiBriefcase, 
  FiMessageCircle, FiCode, FiDatabase, FiCpu, 
  FiGrid, FiLayers 
} from 'react-icons/fi';

const Sidebar: React.FC = () => {
  const menuItems = [
    { path: '/profile', label: 'Profile', icon: <FiUser size={20} /> },
    { path: '/security', label: 'Security', icon: <FiShield size={20} /> },
    { path: '/analytics', label: 'Analytics', icon: <FiBarChart2 size={20} /> },
    { path: '/marketing', label: 'Marketing', icon: <FiBriefcase size={20} /> },
    { path: '/communications', label: 'Communications', icon: <FiMessageCircle size={20} /> },
    { path: '/development', label: 'Development', icon: <FiCode size={20} /> },
    { path: '/operations', label: 'Operations', icon: <FiLayers size={20} /> },
    { path: '/database', label: 'Database', icon: <FiDatabase size={20} /> },
    { path: '/arbiter', label: 'Arbiter (AI)', icon: <FiCpu size={20} /> },
    { path: '/integrations', label: 'Integrations', icon: <FiGrid size={20} /> },
  ];

  return (
    <aside className="w-64 bg-white shadow-lg">
      {/* Logo/Brand Section */}
      <div className="p-6 border-b border-gray-200">
        <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
      </div>

      {/* Navigation Menu */}
      <nav className="mt-6">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => `
              flex items-center px-6 py-3 text-gray-600 transition-colors duration-200
              hover:bg-gray-50 hover:text-blue-600
              ${isActive ? 'bg-blue-50 text-blue-600 border-r-4 border-blue-600' : ''}
            `}
          >
            <span className="mr-4">{item.icon}</span>
            <span className="font-medium">{item.label}</span>
          </NavLink>
        ))}
      </nav>

      {/* Footer Section */}
      <div className="absolute bottom-0 w-full p-4 border-t border-gray-200">
        <div className="flex items-center space-x-4">
          <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
          <div>
            <p className="text-sm font-medium text-gray-700">User Name</p>
            <p className="text-xs text-gray-500">user@example.com</p>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;