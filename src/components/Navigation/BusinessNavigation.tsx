import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  FiPhoneCall,
  FiTrendingUp,
  FiGlobe,
  FiTruck,
  FiPieChart,
  FiUsers,
  FiMessageSquare,
  FiBarChart2
} from 'react-icons/fi';

const businessNavItems = [
  {
    category: 'Overview',
    items: [
      { id: 'dashboard', label: 'Dashboard', icon: FiPieChart, path: '/business' }
    ]
  },
  {
    category: 'Customer',
    items: [
      { id: 'customer-service', label: 'Customer Service', icon: FiPhoneCall, path: '/business/customer-service' },
      { id: 'support', label: 'Support Tickets', icon: FiMessageSquare, path: '/business/support' }
    ]
  },
  {
    category: 'Growth',
    items: [
      { id: 'business-dev', label: 'Business Development', icon: FiTrendingUp, path: '/business/development' },
      { id: 'networking', label: 'Networking', icon: FiGlobe, path: '/business/networking' }
    ]
  },
  {
    category: 'Operations',
    items: [
      { id: 'supply-chain', label: 'Supply Chain', icon: FiTruck, path: '/business/supply-chain' },
      { id: 'analytics', label: 'Analytics', icon: FiBarChart2, path: '/business/analytics' },
      { id: 'team', label: 'Team', icon: FiUsers, path: '/business/team' }
    ]
  }
];

const BusinessNavigation: React.FC = () => {
  return (
    <nav className="p-4 space-y-8">
      {businessNavItems.map(category => (
        <div key={category.category}>
          <h3 className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
            {category.category}
          </h3>
          <div className="mt-2 space-y-1">
            {category.items.map(item => (
              <NavLink
                key={item.id}
                to={item.path}
                className={({ isActive }) =>
                  `group flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                    isActive
                      ? 'bg-gray-200 text-gray-900'
                      : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                  }`
                }
              >
                <item.icon
                  className={`mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500`}
                />
                {item.label}
              </NavLink>
            ))}
          </div>
        </div>
      ))}
    </nav>
  );
};

export default BusinessNavigation;