import React from 'react';
import ChartCard from '../Dashboard/ChartCard';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const CustomerService: React.FC = () => {
  const ticketData = [
    { day: 'Mon', open: 45, resolved: 40, escalated: 5 },
    { day: 'Tue', open: 38, resolved: 35, escalated: 3 },
    { day: 'Wed', open: 52, resolved: 48, escalated: 4 },
    { day: 'Thu', open: 41, resolved: 38, escalated: 3 },
    { day: 'Fri', open: 47, resolved: 43, escalated: 4 },
    { day: 'Sat', open: 28, resolved: 25, escalated: 3 },
    { day: 'Sun', open: 25, resolved: 22, escalated: 3 },
  ];

  const activeTickets = [
    {
      id: 'T-1234',
      customer: 'John Doe',
      priority: 'High',
      status: 'In Progress',
      waitTime: '45m',
      type: 'Technical',
    },
    {
      id: 'T-1235',
      customer: 'Jane Smith',
      priority: 'Medium',
      status: 'Waiting',
      waitTime: '15m',
      type: 'Billing',
    },
    {
      id: 'T-1236',
      customer: 'Bob Johnson',
      priority: 'Low',
      status: 'New',
      waitTime: '5m',
      type: 'General',
    },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartCard
          title="Support Tickets Overview"
          subtitle="Daily ticket status and resolution"
          downloadData={() => console.log('Downloading ticket data')}
        >
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={ticketData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="open" stroke="#8884d8" name="Opened" />
              <Line type="monotone" dataKey="resolved" stroke="#82ca9d" name="Resolved" />
              <Line type="monotone" dataKey="escalated" stroke="#ff8042" name="Escalated" />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard
          title="Active Support Tickets"
          subtitle="Current open support requests"
          downloadData={() => console.log('Downloading active tickets')}
        >
          <div className="space-y-4">
            {activeTickets.map((ticket) => (
              <div key={ticket.id} className="bg-gray-50 p-4 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <div className="flex items-center space-x-2">
                    <span className="font-medium">{ticket.id}</span>
                    <span className={`px-2 py-1 rounded text-xs ${
                      ticket.priority === 'High' ? 'bg-red-100 text-red-800' :
                      ticket.priority === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {ticket.priority}
                    </span>
                  </div>
                  <span className="text-sm text-gray-500">{ticket.waitTime}</span>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <div className="text-sm font-medium">{ticket.customer}</div>
                    <div className="text-xs text-gray-500">Customer</div>
                  </div>
                  <div>
                    <div className="text-sm font-medium">{ticket.status}</div>
                    <div className="text-xs text-gray-500">Status</div>
                  </div>
                  <div>
                    <div className="text-sm font-medium">{ticket.type}</div>
                    <div className="text-xs text-gray-500">Type</div>
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

export default CustomerService;
