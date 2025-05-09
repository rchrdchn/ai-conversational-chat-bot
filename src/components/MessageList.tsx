import React, { useRef, useEffect } from 'react';
import Message from './Message';

interface MessageListProps {
  messages: { text: string; isUser: boolean }[];
  isLoading: boolean;
}

const MessageList: React.FC<MessageListProps> = ({ messages, isLoading }) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  return (
    <div
      className="flex-1 overflow-y-auto p-4 space-y-4"
      role="log"
      aria-live="polite"
    >
      {messages.map((msg, index) => (
        <Message key={index} text={msg.text} isUser={msg.isUser} />
      ))}
      {isLoading && (
        <div className="font-sans p-3 rounded-3xl w-fit bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 self-start">
          Typing...
        </div>
      )}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default MessageList;