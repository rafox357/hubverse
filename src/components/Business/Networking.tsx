import React from 'react';
import { FiUsers, FiGlobe, FiCalendar } from 'react-icons/fi';
import ChartCard from '../Dashboard/ChartCard';

const Networking: React.FC = () => {
  const upcomingEvents = [
    {
      id: 1,
      title: 'Tech Summit 2024',
      date: '2024-03-15',
      type: 'Conference',
      location: 'San Francisco, CA',
      participants: 1500,
      status: 'Registered',
    },
    {
      id: 2,
      title: 'Startup Networking Mixer',
      date: '2024-03-20',
      type: 'Networking',
      location: 'New York, NY',
      participants: 200,
      status: 'Interested',
    },
    {
      id: 3,
      title: 'Industry Partner Meetup',
      date: '2024-03-25',
      type: 'Meeting',
      location: 'Virtual',
      participants: 50,
      status: 'Hosting',
    },
  ];

  const partnerOpportunities = [
    {
      company: 'TechCorp Inc.',
      industry: 'Software',
      potential: 'High',
      status: 'Initial Contact',
      nextAction: 'Schedule Meeting',
      deadline: '2024-03-10',
    },
    {
      company: 'Global Solutions Ltd.',
      industry: 'Consulting',
      potential: 'Medium',
      status: 'Proposal Stage',
      nextAction: 'Send Proposal',
      deadline: '2024-03-12',
    },
    {
      company: 'Innovation Labs',
      industry: 'Research',
      potential: 'High',
      status: 'Negotiation',
      nextAction: 'Contract Review',
      deadline: '2024-03-15',
    },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartCard
          title="Upcoming Networking Events"
          subtitle="Conferences, meetups, and industry events"
          downloadData={() => console.log('Downloading events data')}
        >
          <div className="space-y-4">
            {upcomingEvents.map((event) => (
              <div key={event.id} className="bg-gray-50 p-4 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <h4 className="font-medium">{event.title}</h4>
                  <span className={`px-2 py-1 rounded text-xs ${
                    event.status === 'Registered' ? 'bg-green-100 text-green-800' :
                    event.status === 'Hosting' ? 'bg-blue-100 text-blue-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {event.status}
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <div className="text-sm font-medium">{event.date}</div>
                    <div className="text-xs text-gray-500">Date</div>
                  </div>
                  <div>
                    <div className="text-sm font-medium">{event.location}</div>
                    <div className="text-xs text-gray-500">Location</div>
                  </div>
                  <div>
                    <div className="text-sm font-medium">{event.participants}</div>
                    <div className="text-xs text-gray-500">Participants</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ChartCard>

        <ChartCard
          title="Partnership Opportunities"
          subtitle="Potential partners and collaboration leads"
          downloadData={() => console.log('Downloading partnership data')}
        >
          <div className="space-y-4">
            {partnerOpportunities.map((partner) => (
              <div key={partner.company} className="bg-gray-50 p-4 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <div>
                    <h4 className="font-medium">{partner.company}</h4>
                    <span className="text-xs text-gray-500">{partner.industry}</span>
                  </div>
                  <span className={`px-2 py-1 rounded text-xs ${
                    partner.potential === 'High' ? 'bg-green-100 text-green-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {partner.potential} Potential
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-4 mt-3">
                  <div>
                    <div className="text-sm font-medium">{partner.status}</div>
                    <div className="text-xs text-gray-500">Status</div>
                  </div>
                  <div>
                    <div className="text-sm font-medium">{partner.nextAction}</div>
                    <div className="text-xs text-gray-500">Next Step</div>
                  </div>
                  <div>
                    <div className="text-sm font-medium">{partner.deadline}</div>
                    <div className="text-xs text-gray-500">Deadline</div>
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

export default Networking;
