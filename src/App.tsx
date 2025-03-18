import React, { useEffect, useState } from 'react';
import ChatWindow from './components/ChatWindow';
import ConversationsDialog from './components/ConversationsDialog';
import Navbar from './components/Navbar';
import { callOpenAIAPI } from './api/openai';
import { Conversation } from './components/types';
import { formatDistanceToNow } from 'date-fns';
// import '@fontsource/inter/variable.css';

const App: React.FC = () => {
  // Load conversations from localStorage - here to load conversations from localStorage, if any, when the app starts
  const loadConversationsFromLocalStorage = (): Conversation[] => {
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
      createdAt: Date.now(),
    };
    return [...loadedConversations, newConversation];
  };

  const [conversations, setConversations] = useState<Conversation[]>(() => loadConversationsFromLocalStorage());
  const [activeConversationId, setActiveConversationId] = useState<string | null>(
    conversations.length > 0 ? conversations[conversations.length - 1].id : null
  );
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);


  // Save conversations to localStorage
  const saveConversationsToLocalStorage = (conversations: Conversation[]) => {
    try {
      localStorage.setItem('conversations', JSON.stringify(conversations));
    } catch (error) {
      console.error('Failed to save conversations to localStorage:', error);
    }
  };

  // Create a new conversation
  const createNewConversation = (text: string): Conversation => ({
    id: Date.now().toString(),
    title: `Conversation: ${text}`,
    messages: [{ text, isUser: true }],
    createdAt: Date.now(),
    firstUserMessage: text,
  });

  // Update an existing conversation
  const updateConversationMessages = (
    conversationId: string,
    text: string | null,
    file: File | null
  ): Conversation[] =>
    conversations.map((conversation) => {
      if (conversation.id === conversationId) {
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
    });

  // Handle sending a message
  const handleSendMessage = async (data: { text: string; file: File | null }) => {
    const { text, file } = data;

    if (!activeConversationId) {
      const newConversation = createNewConversation(text);
      setConversations((prev) => [...prev, newConversation]);
      setActiveConversationId(newConversation.id);
      return;
    }

    // Update the active conversation with user message/file
    setConversations(updateConversationMessages(activeConversationId, text, file));

    // Prepare messages for OpenAI API
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
      const aiResponse = await callOpenAIAPI(messagesForAPI);

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
      createdAt: Date.now(),
    };
    setConversations([...conversations, newConversation]);
    setActiveConversationId(newConversation.id);
  };

  const handleDeleteConversation = (id: string) => {
    const isConfirmed = window.confirm('Are you sure you want to delete this conversation?');
  
    if (isConfirmed) {
      setConversations((prev) => prev.filter((conversation) => conversation.id !== id));
  
      // If the deleted conversation is the active one, reset the active conversation
      if (activeConversationId === id) {
        setActiveConversationId(null);
      }
    }
  };

  const handleShowConversations = () => setIsHistoryOpen(true);

  const filteredConversations = conversations.filter((c) => c.firstUserMessage && c.firstUserMessage.trim() !== '').map((c) => ({
    id: c.id,
    title: c.title,
    firstUserMessage: c.firstUserMessage,
    createdAt: formatDistanceToNow(c.createdAt, { addSuffix: true }),
  }));

  useEffect(() => {
    saveConversationsToLocalStorage(conversations);
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
        isLoading={isLoading}
      />
      <ConversationsDialog
        conversations={filteredConversations}
        isOpen={isHistoryOpen}
        onClose={() => setIsHistoryOpen(false)}
        onSelectConversation={(id) => setActiveConversationId(id)}
        onDeleteConversation={(id) => handleDeleteConversation(id)}
      />
    </div>
  );
};

export default App;