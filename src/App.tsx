import React, { useState } from 'react';
import ChatWindow from './components/ChatWindow';

const App: React.FC = () => {
  const [messages, setMessages] = useState<{ text: string; isUser: boolean }[]>([]);

  const handleSendMessage = (text: string) => {
    setMessages([...messages, { text, isUser: true }]);
    setTimeout(() => {
      setMessages((prev) => [...prev, { text: "Hi back!", isUser: false }]);
    }, 1000);
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <ChatWindow messages={messages} onSendMessage={handleSendMessage} />
    </div>
  );
};

export default App;