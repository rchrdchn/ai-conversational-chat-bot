import React from 'react';
import MessageList from './MessageList';
import InputBox from './InputBox';
import Navbar from './Navbar';

interface ChatWindowProps {
  messages: { text: string; isUser: boolean }[];
  onSendMessage: (text: string) => void;
}

const ChatWindow: React.FC<ChatWindowProps> = ({ messages, onSendMessage }) => {
  return (
    <div className="h-[80vh] flex flex-col">
      <Navbar />
      <MessageList messages={messages} />
      <InputBox onSendMessage={onSendMessage} />
    </div>
  );
};

export default ChatWindow;