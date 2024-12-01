import React from 'react';
import { IconType } from 'react-icons';

interface KPICardProps {
  title: string;
  value: string | number;
  change: {
    value: string | number;
    isPositive: boolean;
  };
  icon: IconType;
  iconColor: string;
  additionalInfo?: string;
  onClick?: () => void;
}

const KPICard: React.FC<KPICardProps> = ({
  title,
  value,
  change,
  icon: Icon,
  iconColor,
  additionalInfo,
  onClick,
}) => {
  return (
    <div 
      className={`bg-white p-6 rounded-lg shadow-sm transition-all duration-200 
        ${onClick ? 'cursor-pointer hover:shadow-md transform hover:-translate-y-1' : ''}`}
      onClick={onClick}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-500 text-sm font-medium">{title}</p>
          <h3 className="text-2xl font-bold text-gray-800 mt-1">{value}</h3>
          <div className="flex items-center mt-2">
            <span className={`text-sm ${change.isPositive ? 'text-green-500' : 'text-red-500'}`}>
              {change.isPositive ? '↑' : '↓'} {change.value}
            </span>
            {additionalInfo && (
              <span className="text-gray-500 text-sm ml-2">• {additionalInfo}</span>
            )}
          </div>
        </div>
        <div className={`p-3 rounded-full bg-${iconColor}-100`}>
          <Icon className={`text-${iconColor}-500`} size={24} />
        </div>
      </div>
    </div>
  );
};

export default KPICard;
