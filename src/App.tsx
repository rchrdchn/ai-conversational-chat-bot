import React, { useState } from 'react';
import ChatWindow from './components/ChatWindow';
import Navbar from './components/Navbar';
import ConversationsDialog from './components/ConversationDialog';

const App: React.FC = () => {
  const [messages, setMessages] = useState<{ text: string; isUser: boolean }[]>([]);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);

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
  const handleShowConversations = () => setIsHistoryOpen(true);

  return (
    <div className="max-w-4xl mx-auto p-4">
      <Navbar
        onCreateNewConversation={handleCreateNewConversation}
        onShowConversations={handleShowConversations}
      />
      <ChatWindow messages={messages} onSendMessage={handleSendMessage} />
      <ConversationsDialog
        messages={messages}
        isOpen={isHistoryOpen}
        onClose={() => setIsHistoryOpen(false)}
      />
    </div>
  );
};

export default App;