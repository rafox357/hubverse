import React from 'react';
import TimeTracking from '../components/TimeManagement/TimeTracking';
import { FiClock, FiPieChart, FiUsers, FiDollarSign } from 'react-icons/fi';

const TimePage: React.FC = () => {
  return (
    <div className="h-full flex flex-col">
      {/* Time Management Header */}
      <div className="bg-white border-b px-6 py-4">
        <h1 className="text-2xl font-semibold text-gray-900">Time Management</h1>
        
        {/* Time Stats */}
        <div className="grid grid-cols-4 gap-4 mt-4">
          <div className="bg-blue-50 rounded-lg p-4">
            <div className="flex items-center text-blue-600 mb-2">
              <FiClock className="w-5 h-5 mr-2" />
              <h3 className="font-medium">Today</h3>
            </div>
            <p className="text-2xl font-semibold text-gray-900">8h 24m</p>
            <p className="text-sm text-gray-500">Tracked Time</p>
          </div>

          <div className="bg-green-50 rounded-lg p-4">
            <div className="flex items-center text-green-600 mb-2">
              <FiPieChart className="w-5 h-5 mr-2" />
              <h3 className="font-medium">This Week</h3>
            </div>
            <p className="text-2xl font-semibold text-gray-900">32h 40m</p>
            <p className="text-sm text-gray-500">Total Hours</p>
          </div>

          <div className="bg-purple-50 rounded-lg p-4">
            <div className="flex items-center text-purple-600 mb-2">
              <FiUsers className="w-5 h-5 mr-2" />
              <h3 className="font-medium">Team</h3>
            </div>
            <p className="text-2xl font-semibold text-gray-900">142h</p>
            <p className="text-sm text-gray-500">Combined Time</p>
          </div>

          <div className="bg-yellow-50 rounded-lg p-4">
            <div className="flex items-center text-yellow-600 mb-2">
              <FiDollarSign className="w-5 h-5 mr-2" />
              <h3 className="font-medium">Billable</h3>
            </div>
            <p className="text-2xl font-semibold text-gray-900">28h 15m</p>
            <p className="text-sm text-gray-500">This Week</p>
          </div>
        </div>
      </div>

      {/* Time Tracking Content */}
      <div className="flex-1 overflow-auto p-6">
        <div className="grid grid-cols-12 gap-6">
          {/* Time Tracker */}
          <div className="col-span-4">
            <TimeTracking />
          </div>

          {/* Recent Time Entries */}
          <div className="col-span-8">
            <div className="bg-white rounded-lg shadow p-4">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Time Entries</h2>
              <div className="space-y-2">
                {/* We'll implement the time entries list component later */}
                <p className="text-gray-500">No recent entries</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimePage;
