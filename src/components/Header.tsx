import React, { useState } from 'react';
import { FiBell, FiSearch, FiSettings, FiMenu, FiX, FiChevronDown } from 'react-icons/fi';

interface HeaderProps {
  onMenuClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onMenuClick }) => {
  const [isWebMenuOpen, setWebMenuOpen] = useState(false);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const menuItems = [
    { label: 'Dashboard', href: '/' },
    { label: 'Projects', href: '/projects' },
    { label: 'Tasks', href: '/tasks' },
    { label: 'Calendar', href: '/calendar' },
    { label: 'Reports', href: '/reports' },
  ];

  return (
    <header className="bg-white shadow-sm">
      <div className="flex items-center justify-between px-6 py-4">
        {/* Mobile Hamburger Menu */}
        <button 
          onClick={() => {
            setMobileMenuOpen(!isMobileMenuOpen);
            onMenuClick();
          }}
          className="p-2 rounded-lg hover:bg-gray-100 lg:hidden"
        >
          {isMobileMenuOpen ? (
            <FiX size={24} className="text-gray-600" />
          ) : (
            <FiMenu size={24} className="text-gray-600" />
          )}
        </button>

        {/* Web Menu Button */}
        <div className="hidden lg:flex items-center space-x-6">
          <div className="relative">
            <button
              onClick={() => setWebMenuOpen(!isWebMenuOpen)}
              className="flex items-center space-x-2 text-gray-700 hover:text-gray-900"
            >
              <span>Menu</span>
              <FiChevronDown className={`transform transition-transform ${isWebMenuOpen ? 'rotate-180' : ''}`} />
            </button>

            {/* Web Dropdown Menu */}
            {isWebMenuOpen && (
              <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-50">
                {menuItems.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                  >
                    {item.label}
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Search Bar */}
        <div className="flex-1 max-w-lg ml-4">
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
              <FiSearch className="text-gray-400" />
            </span>
            <input
              type="text"
              placeholder="Search..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>

        {/* Right Side Actions */}
        <div className="flex items-center space-x-4">
          {/* Notifications */}
          <button className="p-2 text-gray-500 hover:text-gray-700 rounded-lg hover:bg-gray-100">
            <div className="relative">
              <FiBell size={20} />
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                3
              </span>
            </div>
          </button>

          {/* Settings */}
          <button className="p-2 text-gray-500 hover:text-gray-700 rounded-lg hover:bg-gray-100">
            <FiSettings size={20} />
          </button>

          {/* Profile */}
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
            <div className="hidden md:block">
              <p className="text-sm font-medium text-gray-700">User Name</p>
              <p className="text-xs text-gray-500">Administrator</p>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="lg:hidden border-t border-gray-200">
          <div className="px-4 py-2 space-y-1">
            {menuItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;