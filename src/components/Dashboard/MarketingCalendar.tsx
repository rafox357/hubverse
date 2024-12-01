import React, { useState } from 'react';
import { FiCalendar, FiClock, FiTag, FiUsers, FiMoreVertical } from 'react-icons/fi';

interface Event {
  id: number;
  title: string;
  date: string;
  time?: string;
  type: string;
  audience?: string;
  status: 'upcoming' | 'in-progress' | 'completed';
  description?: string;
  team?: string[];
}

interface MarketingCalendarProps {
  events: Event[];
}

const MarketingCalendar: React.FC<MarketingCalendarProps> = ({ events }) => {
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [showEventDetails, setShowEventDetails] = useState(false);

  const getStatusColor = (status: Event['status']) => {
    switch (status) {
      case 'upcoming':
        return 'bg-blue-500';
      case 'in-progress':
        return 'bg-yellow-500';
      case 'completed':
        return 'bg-green-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case 'email':
        return '📧';
      case 'social':
        return '📱';
      case 'event':
        return '🎪';
      case 'launch':
        return '🚀';
      default:
        return '📅';
    }
  };

  return (
    <div className="relative">
      <div className="space-y-4">
        {events.map((event) => (
          <div
            key={event.id}
            className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer"
            onClick={() => {
              setSelectedEvent(event);
              setShowEventDetails(true);
            }}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <span className="text-2xl">{getTypeIcon(event.type)}</span>
                <div>
                  <h4 className="text-sm font-medium text-gray-800">{event.title}</h4>
                  <div className="flex items-center space-x-2 mt-1">
                    <FiCalendar className="text-gray-400" size={12} />
                    <span className="text-xs text-gray-500">{event.date}</span>
                    {event.time && (
                      <>
                        <FiClock className="text-gray-400" size={12} />
                        <span className="text-xs text-gray-500">{event.time}</span>
                      </>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <span className={`px-2 py-1 rounded-full text-xs text-white ${getStatusColor(event.status)}`}>
                  {event.status}
                </span>
                <button className="p-1 hover:bg-gray-100 rounded">
                  <FiMoreVertical size={16} className="text-gray-500" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Event Details Modal */}
      {showEventDetails && selectedEvent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-lg w-full mx-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold">{selectedEvent.title}</h3>
              <button
                onClick={() => setShowEventDetails(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ×
              </button>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <FiCalendar className="text-gray-400" />
                <span>{selectedEvent.date}</span>
                {selectedEvent.time && (
                  <>
                    <FiClock className="text-gray-400 ml-2" />
                    <span>{selectedEvent.time}</span>
                  </>
                )}
              </div>

              <div className="flex items-center space-x-2">
                <FiTag className="text-gray-400" />
                <span>{selectedEvent.type}</span>
              </div>

              {selectedEvent.audience && (
                <div className="flex items-center space-x-2">
                  <FiUsers className="text-gray-400" />
                  <span>{selectedEvent.audience}</span>
                </div>
              )}

              {selectedEvent.description && (
                <p className="text-gray-600 mt-2">{selectedEvent.description}</p>
              )}

              {selectedEvent.team && (
                <div className="mt-4">
                  <h4 className="text-sm font-medium mb-2">Team Members</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedEvent.team.map((member, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-600"
                      >
                        {member}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MarketingCalendar;
