import React, { useEffect, useState } from 'react';
import ChatWindow from './components/ChatWindow';
import Navbar from './components/Navbar';
import ConversationsDialog from './components/ConversationDialog';

interface Conversation {
  id: string;
  title: string;
  messages: { text: string; isUser: boolean }[];
  firstUserMessage?: string; // Track the first user message
}

const App: React.FC = () => {
  // Initialize conversations from localStorage or create the first conversation
  const [conversations, setConversations] = useState<Conversation[]>(() => {
    const savedConversations = localStorage.getItem('conversations');
    if (savedConversations) {
      try {
        const parsedConversations = JSON.parse(savedConversations);
        if (Array.isArray(parsedConversations)) {
          console.log('Loaded conversations from localStorage during initialization:', parsedConversations); // Debug log
          return parsedConversations;
        } else {
          console.error('Invalid conversations format in localStorage:', parsedConversations);
        }
      } catch (error) {
        console.error('Failed to parse conversations from localStorage during initialization:', error);
      }
    }

    // Create the first conversation if no saved conversations exist
    const firstConversation: Conversation = {
      id: Date.now().toString(),
      title: 'Conversation: 1',
      messages: [],
    };
    console.log('Creating the first conversation:', firstConversation); // Debug log
    return [firstConversation];
  });

  const [activeConversationId, setActiveConversationId] = useState<string | null>(
    conversations.length > 0 ? conversations[0].id : null
  );
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);

  const handleSendMessage = (data: { text: string; file: File | null }) => {
    const { text, file } = data;
    console.log('Sending message:', { text, file }); // Debug log

    if (!activeConversationId) {
      // Add the user's message to a new conversation
      const newConversation: Conversation = {
        id: Date.now().toString(),
        title: `Conversation: ${conversations.length + 1}`,
        messages: [{ text, isUser: true }],
        firstUserMessage: text,
      };
      console.log('Creating new conversation:', newConversation); // Debug log
      setConversations((prev) => [...prev, newConversation]);
      setActiveConversationId(newConversation.id);
      return;
    }

    // Add the user's message to the active conversation
    setConversations((prev) =>
      prev.map((conversation) => {
        if (conversation.id === activeConversationId) {
          const newMessages = [
            ...conversation.messages,
            ...(text ? [{ text, isUser: true }] : []),
            ...(file ? [{ text: `Uploaded: ${file.name}`, isUser: true }] : []),
          ];

          // Update the first user message if it doesn't already exist
          const firstUserMessage =
            conversation.firstUserMessage || (text ? text : `Uploaded: ${file?.name}`);

          const updatedConversation = {
            ...conversation,
            messages: newMessages,
            firstUserMessage,
          };
          console.log('Updated conversation:', updatedConversation); // Debug log
          return updatedConversation;
        }
        return conversation;
      })
    );

    // Simulate a response
    setTimeout(() => {
      setConversations((prev) =>
        prev.map((conversation) =>
          conversation.id === activeConversationId
            ? {
                ...conversation,
                messages: [
                  ...conversation.messages,
                  { text: "Hi back! This is a dummy response for testing purposes.", isUser: false },
                ],
              }
            : conversation
        )
      );
    }, 1000);
  };

  const handleCreateNewConversation = () => {
    const newConversation: Conversation = {
      id: Date.now().toString(), // Unique ID
      title: `Conversation: ${conversations.length + 1}`,
      messages: [],
    };
    setConversations([...conversations, newConversation]);
    setActiveConversationId(newConversation.id);
  };

  const handleShowConversations = () => setIsHistoryOpen(true);

  // Save conversations to localStorage whenever they change
  useEffect(() => {
    try {
      console.log('Saving conversations to localStorage:', conversations); // Debug log
      localStorage.setItem('conversations', JSON.stringify(conversations));
    } catch (error) {
      console.error('Failed to save conversations to localStorage:', error);
    }
  }, [conversations]);

  return (
    <div className="max-w-4xl mx-auto p-4">
      <Navbar
        onCreateNewConversation={handleCreateNewConversation}
        onShowConversations={handleShowConversations}
      />
      <ChatWindow
        messages={conversations.find((c) => c.id === activeConversationId)?.messages || []}
        onSendMessage={(data) => {
          console.log('Message sent from ChatWindow:', data); // Debug log
          handleSendMessage(data);
        }}
      />
      <ConversationsDialog
        conversations={conversations.map((c) => ({
          id: c.id,
          title: c.title,
          firstUserMessage: c.firstUserMessage || "No messages yet",
        }))}
        isOpen={isHistoryOpen}
        onClose={() => setIsHistoryOpen(false)}
        onSelectConversation={(id) => {
          console.log('Selected conversation ID:', id); // Debug log
          setActiveConversationId(id);
        }}
      />
    </div>
  );
};

export default App;