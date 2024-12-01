import React, { useState } from 'react';
import { FiMaximize2, FiMinimize2, FiDownload } from 'react-icons/fi';

interface ChartCardProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  downloadData?: () => void;
  className?: string;
}

const ChartCard: React.FC<ChartCardProps> = ({
  title,
  subtitle,
  children,
  downloadData,
  className = '',
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className={`
      bg-white rounded-lg shadow-sm transition-all duration-300
      ${isExpanded ? 'fixed inset-4 z-50' : ''}
      ${className}
    `}>
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
            {subtitle && <p className="text-sm text-gray-500 mt-1">{subtitle}</p>}
          </div>
          <div className="flex items-center space-x-2">
            {downloadData && (
              <button
                onClick={downloadData}
                className="p-2 text-gray-500 hover:text-gray-700 rounded-lg hover:bg-gray-100"
              >
                <FiDownload size={18} />
              </button>
            )}
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="p-2 text-gray-500 hover:text-gray-700 rounded-lg hover:bg-gray-100"
            >
              {isExpanded ? <FiMinimize2 size={18} /> : <FiMaximize2 size={18} />}
            </button>
          </div>
        </div>
        <div className={isExpanded ? 'h-[calc(100vh-200px)]' : 'h-80'}>
          {children}
        </div>
      </div>
    </div>
  );
};

export default ChartCard;
