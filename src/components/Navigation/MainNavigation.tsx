import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  FiHome, FiClipboard, FiUsers, FiClock, FiFolder,
  FiTarget, FiLayout, FiGitBranch, FiSettings,
  FiMessageSquare, FiEdit3, FiTrendingUp, FiGlobe,
  FiTruck, FiPhoneCall
} from 'react-icons/fi';

interface NavItem {
  id: string;
  label: string;
  icon: React.ComponentType;
  path: string;
  badge?: number;
}

const mainNavItems: NavItem[] = [
  { id: 'dashboard', label: 'Dashboard', icon: FiHome, path: '/' },
  { id: 'projects', label: 'Projects', icon: FiClipboard, path: '/projects' },
  { id: 'collaboration', label: 'Collaboration', icon: FiUsers, path: '/collaboration' },
  { id: 'time', label: 'Time', icon: FiClock, path: '/time' },
  { id: 'docs', label: 'Docs', icon: FiFolder, path: '/docs' },
  { id: 'goals', label: 'Goals', icon: FiTarget, path: '/goals' },
  { id: 'agile', label: 'Agile', icon: FiGitBranch, path: '/agile' },
  { id: 'chat', label: 'Chat', icon: FiMessageSquare, path: '/chat', badge: 3 },
  { id: 'whiteboard', label: 'Whiteboard', icon: FiEdit3, path: '/whiteboard' }
];

const businessNavItems: NavItem[] = [
  { id: 'customer-service', label: 'Customer Service', icon: FiPhoneCall, path: '/business/customer-service' },
  { id: 'business-dev', label: 'Business Development', icon: FiTrendingUp, path: '/business/development' },
  { id: 'networking', label: 'Networking', icon: FiGlobe, path: '/business/networking' },
  { id: 'supply-chain', label: 'Supply Chain', icon: FiTruck, path: '/business/supply-chain' }
];

const MainNavigation: React.FC = () => {
  return (
    <nav className="space-y-6">
      <div>
        <h2 className="px-4 text-lg font-semibold text-gray-600">Main</h2>
        <ul className="mt-3 space-y-1">
          {mainNavItems.map(item => (
            <li key={item.id}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center px-4 py-2 text-sm ${
                    isActive
                      ? 'bg-gray-800 text-white'
                      : 'text-gray-600 hover:bg-gray-700 hover:text-white'
                  }`
                }
              >
                <item.icon className="w-5 h-5 mr-3" />
                {item.label}
                {item.badge && (
                  <span className="ml-auto bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                    {item.badge}
                  </span>
                )}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h2 className="px-4 text-lg font-semibold text-gray-600">Business</h2>
        <ul className="mt-3 space-y-1">
          {businessNavItems.map(item => (
            <li key={item.id}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center px-4 py-2 text-sm ${
                    isActive
                      ? 'bg-gray-800 text-white'
                      : 'text-gray-600 hover:bg-gray-700 hover:text-white'
                  }`
                }
              >
                <item.icon className="w-5 h-5 mr-3" />
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-auto">
        <NavLink
          to="/settings"
          className={({ isActive }) =>
            `flex items-center px-4 py-2 text-sm ${
              isActive
                ? 'bg-gray-800 text-white'
                : 'text-gray-600 hover:bg-gray-700 hover:text-white'
            }`
          }
        >
          <FiSettings className="w-5 h-5 mr-3" />
          Settings
        </NavLink>
      </div>
    </nav>
  );
};

export default MainNavigation;
