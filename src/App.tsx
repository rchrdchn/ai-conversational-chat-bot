import React, { useState } from 'react';
import ChatWindow from './components/ChatWindow';
import Navbar from './components/Navbar';

const App: React.FC = () => {
  const [messages, setMessages] = useState<{ text: string; isUser: boolean }[]>([]);

  const handleSendMessage = (data: { text: string; file: File | null }) => {
    const { text, file } = data;
  
    // Add the user's message
    if (text) {
      setMessages((prev) => [...prev, { text, isUser: true }]);
    }
  
    // Add the file message if a file is provided
    if (file) {
      setMessages((prev) => [...prev, { text: `Uploaded: ${file.name}`, isUser: true }]);
    }
  
    // Simulate a response
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { text: "Hi back! This is a dummy response for testing purposes.", isUser: false },
      ]);
    }, 1000);
  };

  const handleCreateNewConversation = () => setMessages([]);

  return (
    <div className="max-w-4xl mx-auto p-4">
      <Navbar onCreateNewConversation={handleCreateNewConversation} />
      <ChatWindow messages={messages} onSendMessage={handleSendMessage} />
    </div>
  );
};

export default App;