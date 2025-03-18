import React from 'react';
import MessageList from './MessageList';
import InputBox from './InputBox';

interface ChatWindowProps {
  messages: { text: string; isUser: boolean }[];
  onSendMessage: (data: { text: string; file: File | null }) => void;
  isLoading: boolean;
}

const ChatWindow: React.FC<ChatWindowProps> = ({ messages, onSendMessage, isLoading }) => {
  return (
    <div className="h-[80vh] flex flex-col">
      <MessageList messages={messages} isLoading={isLoading} />
      <InputBox onSendMessage={onSendMessage} />
    </div>
  );
};

export default ChatWindow;