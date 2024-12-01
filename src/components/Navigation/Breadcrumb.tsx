import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FiChevronRight } from 'react-icons/fi';

const Breadcrumb: React.FC = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter(x => x);

  return (
    <nav className="flex" aria-label="Breadcrumb">
      <ol className="inline-flex items-center space-x-1 md:space-x-3">
        <li className="inline-flex items-center">
          <Link to="/" className="text-gray-700 hover:text-blue-600">
            Home
          </Link>
        </li>
        {pathnames.map((name, index) => {
          const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
          const isLast = index === pathnames.length - 1;
          
          return (
            <li key={name} className="inline-flex items-center">
              <FiChevronRight className="w-4 h-4 text-gray-400" />
              {isLast ? (
                <span className="ml-1 text-gray-500 md:ml-2 font-medium">
                  {name.split('-').map(word => 
                    word.charAt(0).toUpperCase() + word.slice(1)
                  ).join(' ')}
                </span>
              ) : (
                <Link
                  to={routeTo}
                  className="ml-1 text-gray-700 hover:text-blue-600 md:ml-2"
                >
                  {name.split('-').map(word => 
                    word.charAt(0).toUpperCase() + word.slice(1)
                  ).join(' ')}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumb;