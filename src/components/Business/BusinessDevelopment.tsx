import React from 'react';
import { FiUsers, FiTrendingUp, FiGlobe } from 'react-icons/fi';
import ChartCard from '../Dashboard/ChartCard';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const BusinessDevelopment: React.FC = () => {
  const leadData = [
    { month: 'Jan', qualified: 45, prospecting: 65, converted: 20 },
    { month: 'Feb', qualified: 55, prospecting: 75, converted: 25 },
    { month: 'Mar', qualified: 65, prospecting: 85, converted: 30 },
    { month: 'Apr', qualified: 75, prospecting: 95, converted: 35 },
    { month: 'May', qualified: 85, prospecting: 105, converted: 40 },
    { month: 'Jun', qualified: 95, prospecting: 115, converted: 45 },
  ];

  const partnershipData = [
    { name: 'Tech Partners', active: 12, negotiation: 5, potential: 8 },
    { name: 'Service Providers', active: 8, negotiation: 3, potential: 6 },
    { name: 'Resellers', active: 15, negotiation: 7, potential: 10 },
    { name: 'Consultants', active: 6, negotiation: 4, potential: 5 },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartCard
          title="Lead Pipeline"
          subtitle="Lead qualification and conversion tracking"
          downloadData={() => console.log('Downloading lead data')}
        >
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={leadData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="qualified" stroke="#8884d8" name="Qualified Leads" />
              <Line type="monotone" dataKey="prospecting" stroke="#82ca9d" name="Prospecting" />
              <Line type="monotone" dataKey="converted" stroke="#ffc658" name="Converted" />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard
          title="Strategic Partnerships"
          subtitle="Partnership status and opportunities"
          downloadData={() => console.log('Downloading partnership data')}
        >
          <div className="space-y-4">
            {partnershipData.map((category) => (
              <div key={category.name} className="bg-gray-50 p-4 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <h4 className="font-medium">{category.name}</h4>
                  <span className="text-sm text-blue-600">{category.active + category.negotiation + category.potential} total</span>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="text-green-600 font-semibold">{category.active}</div>
                    <div className="text-xs text-gray-500">Active</div>
                  </div>
                  <div className="text-center">
                    <div className="text-yellow-600 font-semibold">{category.negotiation}</div>
                    <div className="text-xs text-gray-500">In Talks</div>
                  </div>
                  <div className="text-center">
                    <div className="text-blue-600 font-semibold">{category.potential}</div>
                    <div className="text-xs text-gray-500">Potential</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ChartCard>
      </div>
    </div>
  );
};

export default BusinessDevelopment;
