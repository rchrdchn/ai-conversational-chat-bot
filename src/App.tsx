import React, { useState } from 'react';
import ChatWindow from './components/ChatWindow';
import Navbar from './components/Navbar';

const App: React.FC = () => {
  const [messages, setMessages] = useState<{ text: string; isUser: boolean }[]>([]);

  const handleSendMessage = (text: string) => {
    setMessages([...messages, { text, isUser: true }]);
    setTimeout(() => {
      setMessages((prev) => [...prev, { text: "Hi back! This is a dummy text that is very long for testing purposes.", isUser: false }]);
    }, 1000);
  };

  const onFileUpload = (file: File) => {
    console.log("File uploaded:", file);
    setMessages((prev) => [...prev, { text: `File uploaded: ${file.name}`, isUser: true }]);
  };

  const handleCreateNewConversation = () => {
    setMessages([]);
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      {/* <ChatWindow messages={messages} onSendMessage={handleSendMessage} onFileUpload={onFileUpload} /> */}
      <Navbar onCreateNewConversation={handleCreateNewConversation} />
      <ChatWindow messages={messages} onSendMessage={handleSendMessage} />
    </div>
  );
};

export default App;