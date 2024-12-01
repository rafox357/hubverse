import React, { useState } from 'react';
import { FiMessageSquare, FiEdit3, FiUsers, FiVideo } from 'react-icons/fi';
import LoadingSpinner from '../components/Common/LoadingSpinner';

interface ChatMessage {
  id: string;
  sender: string;
  content: string;
  timestamp: Date;
}

const CollaborationPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('chat');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const tabs = [
    { id: 'chat', icon: FiMessageSquare, label: 'Team Chat' },
    { id: 'whiteboard', icon: FiEdit3, label: 'Whiteboard' },
    { id: 'meetings', icon: FiVideo, label: 'Meetings' },
    { id: 'team', icon: FiUsers, label: 'Team' },
  ];

  const sendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim() === '') return;

    setIsLoading(true);
    try {
      // Simulate an async message sending operation
      // Replace this with your actual message sending logic
      setTimeout(() => {
        const newMessageObj: ChatMessage = {
          id: Date.now().toString(),
          sender: 'Current User', // Replace with actual user logic
          content: newMessage,
          timestamp: new Date()
        };

        setMessages(prevMessages => [...prevMessages, newMessageObj]);
        setNewMessage('');
      }, 1000); // Simulated 1-second delay
    } catch (error) {
      console.error('Error sending message:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="collaboration-page">
      {/* Header */}
      <div className="bg-white border-b px-6 py-4">
        <h1 className="text-2xl font-semibold text-gray-900">Collaboration Hub</h1>
        
        {/* Tabs */}
        <div className="flex space-x-1 mt-4">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center px-4 py-2 rounded-lg text-sm ${
                  activeTab === tab.id
                    ? 'bg-blue-50 text-blue-700'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <Icon className="w-4 h-4 mr-2" />
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-hidden">
        {isLoading && (
          <div className="loading-overlay">
            <LoadingSpinner />
          </div>
        )}
        {isLoading ? (
          <div className="h-full flex items-center justify-center">
            <LoadingSpinner size="large" />
          </div>
        ) : (
          <div className="h-full">
            {activeTab === 'chat' && (
              <div className="h-full flex flex-col">
                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${
                        message.sender === 'Current User'
                          ? 'justify-end'
                          : 'justify-start'
                      }`}
                    >
                      <div
                        className={`max-w-md rounded-lg px-4 py-2 ${
                          message.sender === 'Current User'
                            ? 'bg-blue-500 text-white'
                            : 'bg-gray-100 text-gray-900'
                        }`}
                      >
                        <div className="font-medium text-sm mb-1">
                          {message.sender}
                        </div>
                        <div>{message.content}</div>
                        <div className="text-xs opacity-75 mt-1">
                          {message.timestamp.toLocaleTimeString()}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Message Input */}
                <form onSubmit={sendMessage} className="p-4 border-t bg-white">
                  <div className="flex space-x-4">
                    <input
                      type="text"
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      placeholder="Type your message..."
                      className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                      type="submit"
                      className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                      Send
                    </button>
                  </div>
                </form>
              </div>
            )}

            {activeTab === 'whiteboard' && (
              <div className="h-full p-4">
                <div className="bg-white h-full rounded-lg shadow-sm p-4">
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">
                    Whiteboard
                  </h2>
                  {/* Whiteboard implementation will go here */}
                  <div className="h-full flex items-center justify-center text-gray-500">
                    Whiteboard feature coming soon
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'meetings' && (
              <div className="h-full p-4">
                <div className="bg-white h-full rounded-lg shadow-sm p-4">
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">
                    Video Meetings
                  </h2>
                  <div className="grid grid-cols-2 gap-4">
                    <button className="p-4 border rounded-lg hover:bg-gray-50">
                      <FiVideo className="w-8 h-8 text-blue-500 mx-auto mb-2" />
                      <span className="block font-medium">Start Meeting</span>
                    </button>
                    <button className="p-4 border rounded-lg hover:bg-gray-50">
                      <FiUsers className="w-8 h-8 text-green-500 mx-auto mb-2" />
                      <span className="block font-medium">Join Meeting</span>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'team' && (
              <div className="h-full p-4">
                <div className="bg-white h-full rounded-lg shadow-sm p-4">
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">
                    Team Members
                  </h2>
                  {/* Team members list will go here */}
                  <div className="text-gray-500">Team members list coming soon</div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CollaborationPage;
