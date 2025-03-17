import React from 'react';
import MessageList from './MessageList';
import InputBox from './InputBox';

interface ChatWindowProps {
   messages: { text: string; isUser: boolean }[];
   onSendMessage: (data: { text: string; file: File | null }) => void;
}

const ChatWindow: React.FC<ChatWindowProps> = ({ messages, onSendMessage }) => {
  return (
    <div className="h-[80vh] flex flex-col">
      <MessageList messages={messages} />
      <InputBox onSendMessage={onSendMessage} />
    </div>
  );
};

export default ChatWindow;