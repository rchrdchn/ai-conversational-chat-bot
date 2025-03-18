import React, { useEffect, useState } from 'react';
import ChatWindow from './components/ChatWindow';
import Navbar from './components/Navbar';
import ConversationsDialog from './components/ConversationDialog';

interface Conversation {
  id: string;
  title: string;
  messages: { text: string; isUser: boolean }[];
  firstUserMessage?: string;
}

const API_KEY = import.meta.env.VITE_OPENAI_API_KEY;

const App: React.FC = () => {
  const [conversations, setConversations] = useState<Conversation[]>(() => {
    const savedConversations = localStorage.getItem('conversations');
    let loadedConversations: Conversation[] = [];
    if (savedConversations) {
      try {
        const parsedConversations = JSON.parse(savedConversations);
        if (Array.isArray(parsedConversations)) {
          loadedConversations = parsedConversations;
        }
      } catch (error) {
        console.error('Failed to parse conversations from localStorage:', error);
      }
    }
    const newConversation: Conversation = {
      id: Date.now().toString(),
      title: `Conversation: ${loadedConversations.length + 1}`,
      messages: [],
    };
    return [...loadedConversations, newConversation];
  });

  const [activeConversationId, setActiveConversationId] = useState<string | null>(
    conversations.length > 0 ? conversations[conversations.length - 1].id : null
  );
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = async (data: { text: string; file: File | null }) => {
    const { text, file } = data;

    if (!activeConversationId) {
      const newConversation: Conversation = {
        id: Date.now().toString(),
        title: `Conversation: ${conversations.length + 1}`,
        messages: [{ text, isUser: true }],
        firstUserMessage: text,
      };
      setConversations((prev) => [...prev, newConversation]);
      setActiveConversationId(newConversation.id);
      return;
    }

    // Update the active conversation with user message/file
    setConversations((prev) =>
      prev.map((conversation) => {
        if (conversation.id === activeConversationId) {
          const newMessages = [
            ...conversation.messages,
            ...(text ? [{ text, isUser: true }] : []),
            ...(file ? [{ text: `Uploaded: ${file.name}`, isUser: true }] : []),
          ];
          const firstUserMessage =
            conversation.firstUserMessage || (text ? text : `Uploaded: ${file?.name}`);
          return { ...conversation, messages: newMessages, firstUserMessage };
        }
        return conversation;
      })
    );

    // OpenAI API request
    const activeConversation = conversations.find((c) => c.id === activeConversationId);
    const messagesForAPI = [
      { role: 'system', content: 'You are a helpful assistant.' },
      ...(activeConversation?.messages.map((msg) => ({
        role: msg.isUser ? 'user' : 'assistant',
        content: msg.text,
      })) || []),
      { role: 'user', content: text || `${file?.name}` },
    ];

    setIsLoading(true); // Show loading state

    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo', // or 'gpt-4' if available
          messages: messagesForAPI,
          max_tokens: 150, // Adjust as needed
        }),
      });

      if (!response.ok) {
        throw new Error(`API request failed: ${response.statusText}`);
      }

      const data = await response.json();
      const aiResponse = data.choices[0].message.content;

      // Add AI response to the active conversation
      setConversations((prev) =>
        prev.map((conversation) =>
          conversation.id === activeConversationId
            ? { ...conversation, messages: [...conversation.messages, { text: aiResponse, isUser: false }] }
            : conversation
        )
      );
    } catch (error) {
      console.error('Error calling OpenAI API:', error);
      setConversations((prev) =>
        prev.map((conversation) =>
          conversation.id === activeConversationId
            ? {
                ...conversation,
                messages: [...conversation.messages, { text: 'Sorry, something went wrong!', isUser: false }],
              }
            : conversation
        )
      );
    } finally {
      setIsLoading(false); // Hide loading state
    }
  };

  const handleCreateNewConversation = () => {
    const newConversation: Conversation = {
      id: Date.now().toString(),
      title: `Conversation: ${conversations.length + 1}`,
      messages: [],
    };
    setConversations([...conversations, newConversation]);
    setActiveConversationId(newConversation.id);
  };

  const handleShowConversations = () => setIsHistoryOpen(true);

  useEffect(() => {
    try {
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
        onSendMessage={handleSendMessage}
        isLoading={isLoading} // Pass loading state
      />
      <ConversationsDialog
        conversations={conversations.map((c) => ({
          id: c.id,
          title: c.title,
          firstUserMessage: c.firstUserMessage || 'No messages yet',
        }))}
        isOpen={isHistoryOpen}
        onClose={() => setIsHistoryOpen(false)}
        onSelectConversation={(id) => setActiveConversationId(id)}
      />
    </div>
  );
};

export default App;