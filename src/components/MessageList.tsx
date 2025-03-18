import React, { useRef, useEffect } from 'react';
import Message from './Message';

interface MessageListProps {
  messages: { text: string; isUser: boolean }[];
  isLoading: boolean;
}

const MessageList: React.FC<MessageListProps> = ({ messages, isLoading }) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const scrollToBottomIfNeeded = () => {
    const list = listRef.current;
    if (list) {
      const isAtBottom = list.scrollHeight - list.scrollTop <= list.clientHeight + 50;
      if (isAtBottom) {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  useEffect(() => {
    scrollToBottomIfNeeded();
  }, [messages, isLoading]);

  return (
    <div
      ref={listRef}
      className="flex-1 overflow-y-auto p-4 space-y-4"
      role="log"
      aria-live="polite"
    >
      {messages.map((msg, index) => (
        <Message key={index} text={msg.text} isUser={msg.isUser} />
      ))}
      {isLoading && (
        <div className="p-3 rounded-3xl w-fit bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 self-start">
          Typing...
        </div>
      )}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default MessageList;