import React, { useState, useMemo, useCallback } from 'react';
import { FixedSizeList } from 'react-window';

interface Message {
  id: string;
  sender: string;
  content: string;
  timestamp: Date;
}

// Memoized Message component
const MessageItem = React.memo(({ message }: { message: Message }) => (
  <div className="flex flex-col mb-4 p-4 rounded-lg bg-white shadow">
    <div className="flex justify-between items-center mb-2">
      <span className="font-semibold">{message.sender}</span>
      <span className="text-sm text-gray-500">
        {message.timestamp.toLocaleTimeString()}
      </span>
    </div>
    <p className="text-gray-700">{message.content}</p>
  </div>
));

const ChatPage: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');

  const handleSendMessage = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const message: Message = {
      id: Date.now().toString(),
      sender: 'User',
      content: newMessage,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, message]);
    setNewMessage('');
  }, [newMessage]);

  const MessageList = useMemo(() => (
    <FixedSizeList
      height={500}
      itemCount={messages.length}
      itemSize={100}
      width="100%"
    >
      {({ index, style }) => (
        <div style={style}>
          <MessageItem message={messages[index]} />
        </div>
      )}
    </FixedSizeList>
  ), [messages]);

  return (
    <div className="flex flex-col h-screen">
      <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
        {MessageList}
      </div>
      <form onSubmit={handleSendMessage} className="p-4 bg-white border-t">
        <div className="flex space-x-4">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Send
          </button>
        </div>
      </form>
    </div>
  );
};

export default React.memo(ChatPage);