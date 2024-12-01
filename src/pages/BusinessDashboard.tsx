import React from 'react';
import {
  FiUsers,
  FiMessageSquare,
  FiTrendingUp,
  FiDollarSign,
  FiBarChart2
} from 'react-icons/fi';

const stats = [
  { id: 1, name: 'Total Customers', stat: '71,897', icon: FiUsers, change: '12%', changeType: 'increase' },
  { id: 2, name: 'Support Tickets', stat: '58', icon: FiMessageSquare, change: '5.4%', changeType: 'decrease' },
  { id: 3, name: 'Revenue', stat: '$405,091', icon: FiDollarSign, change: '28.3%', changeType: 'increase' },
  { id: 4, name: 'Growth', stat: '15.3%', icon: FiTrendingUp, change: '8.2%', changeType: 'increase' }
];

const activities = [
  { id: 1, type: 'customer', description: 'New customer onboarding completed', time: '5 min ago' },
  { id: 2, type: 'support', description: 'Support ticket resolved', time: '2 hours ago' },
  { id: 3, type: 'development', description: 'New partnership established', time: '1 day ago' }
];

const BusinessDashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-2xl font-semibold text-gray-900">Business Overview</h1>
          <p className="mt-2 text-sm text-gray-700">
            A comprehensive view of your business metrics and activities.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {stats.map((item) => (
          <div
            key={item.id}
            className="relative bg-white pt-5 px-4 pb-12 sm:pt-6 sm:px-6 shadow rounded-lg overflow-hidden"
          >
            <dt>
              <div className="absolute bg-blue-500 rounded-md p-3">
                <item.icon className="h-6 w-6 text-white" aria-hidden="true" />
              </div>
              <p className="ml-16 text-sm font-medium text-gray-500 truncate">{item.name}</p>
            </dt>
            <dd className="ml-16 pb-6 flex items-baseline sm:pb-7">
              <p className="text-2xl font-semibold text-gray-900">{item.stat}</p>
              <p
                className={`ml-2 flex items-baseline text-sm font-semibold ${
                  item.changeType === 'increase' ? 'text-green-600' : 'text-red-600'
                }`}
              >
                {item.change}
              </p>
            </dd>
          </div>
        ))}
      </div>

      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg font-medium text-gray-900">Recent Activity</h3>
          <div className="mt-6 flow-root">
            <ul className="-mb-8">
              {activities.map((activity, activityIdx) => (
                <li key={activity.id}>
                  <div className="relative pb-8">
                    {activityIdx !== activities.length - 1 ? (
                      <span
                        className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200"
                        aria-hidden="true"
                      />
                    ) : null}
                    <div className="relative flex space-x-3">
                      <div>
                        <span className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center ring-8 ring-white">
                          <FiBarChart2 className="h-5 w-5 text-white" aria-hidden="true" />
                        </span>
                      </div>
                      <div className="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                        <div>
                          <p className="text-sm text-gray-500">{activity.description}</p>
                        </div>
                        <div className="text-right text-sm whitespace-nowrap text-gray-500">
                          <time>{activity.time}</time>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessDashboard;