import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { 
  FiHome, 
  FiPhoneCall, 
  FiTrendingUp, 
  FiGlobe, 
  FiTruck,
  FiMessageSquare,
  FiBarChart2,
  FiUsers
} from 'react-icons/fi';

const navigation = [
  { name: 'Dashboard', href: '/business', icon: FiHome },
  { name: 'Customer Service', href: '/business/customer-service', icon: FiPhoneCall },
  { name: 'Development', href: '/business/development', icon: FiTrendingUp },
  { name: 'Networking', href: '/business/networking', icon: FiGlobe },
  { name: 'Supply Chain', href: '/business/supply-chain', icon: FiTruck },
  { name: 'Support', href: '/business/support', icon: FiMessageSquare },
  { name: 'Analytics', href: '/business/analytics', icon: FiBarChart2 },
  { name: 'Team', href: '/business/team', icon: FiUsers },
];

const BusinessLayout: React.FC = () => {
  const location = useLocation();

  return (
    <div className="flex h-full">
      {/* Sidebar */}
      <div className="hidden md:flex md:flex-shrink-0">
        <div className="flex flex-col w-64 border-r border-gray-200 bg-white">
          <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
            <div className="flex-1 px-3 space-y-1">
              {navigation.map((item) => {
                const isActive = location.pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`
                      group flex items-center px-3 py-2 text-sm font-medium rounded-md
                      ${isActive 
                        ? 'bg-gray-100 text-gray-900'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}
                    `}
                  >
                    <item.icon
                      className={`
                        mr-3 h-6 w-6
                        ${isActive ? 'text-gray-500' : 'text-gray-400 group-hover:text-gray-500'}
                      `}
                    />
                    {item.name}
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 overflow-auto">
        <main className="flex-1">
          <div className="py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
              <Outlet />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default BusinessLayout;