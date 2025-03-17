import React from 'react';

interface MessageProps {
  text: string;
  isUser: boolean;
}

const Message: React.FC<MessageProps> = ({ text, isUser }) => {
   const copyToClipboard = () => {
      navigator.clipboard.writeText(text);
   }

   return (
      <div
      className={`p-3 rounded-3xl
         ${isUser ? 'ml-auto' : 'mr-auto'}
         ${isUser ? 'max-w-[30%] border' : "max-w-[100%]"}
         ${isUser ? 'bg-gray-200 text-black self-end' : 'self-start'}`
      }
      >
      {text}
      <button onClick={copyToClipboard} className='p-2 ml-2'>
         <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="size-4">
            <path d="M5.5 3.5A1.5 1.5 0 0 1 7 2h2.879a1.5 1.5 0 0 1 1.06.44l2.122 2.12a1.5 1.5 0 0 1 .439 1.061V9.5A1.5 1.5 0 0 1 12 11V8.621a3 3 0 0 0-.879-2.121L9 4.379A3 3 0 0 0 6.879 3.5H5.5Z" />
            <path d="M4 5a1.5 1.5 0 0 0-1.5 1.5v6A1.5 1.5 0 0 0 4 14h5a1.5 1.5 0 0 0 1.5-1.5V8.621a1.5 1.5 0 0 0-.44-1.06L7.94 5.439A1.5 1.5 0 0 0 6.878 5H4Z" />
         </svg>
      </button>
      </div>
   );
};

export default Message;