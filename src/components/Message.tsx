import React from 'react';

interface MessageProps {
  text: string;
  isUser: boolean;
}

const Message: React.FC<MessageProps> = ({ text, isUser }) => {
   const [isCopied, setIsCopied] = React.useState(false);

   const copyToClipboard = () => {
      navigator.clipboard.writeText(text);
      setIsCopied(true);
      setTimeout(() => {
         setIsCopied(false);
      }
      , 1050);
   }

   return (
      <div>
         <div className={`rounded-3xl
            ${isUser ? 'ml-auto' : 'mr-auto'}
            ${isUser ? 'w-fit' : "max-w-[100%]"}
            ${isUser ? 'py-2 px-4 bg-gray-200 dark:bg-slate-700 dark:border-gray-400 dark:text-gray-100 text-black whitespace-pre-wrap self-end rounded-br-lg break-words' : 'self-start'}`
         }>
         {text}
         </div>
         <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
            <button onClick={copyToClipboard} className='hover:bg-gray-200 hover:rounded-full p-1.5 mt-1' title='Copy'>
               {isCopied ?
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="size-4">
                     <path fillRule="evenodd" d="M12.416 3.376a.75.75 0 0 1 .208 1.04l-5 7.5a.75.75 0 0 1-1.154.114l-3-3a.75.75 0 0 1 1.06-1.06l2.353 2.353 4.493-6.74a.75.75 0 0 1 1.04-.207Z" clipRule="evenodd" />
                  </svg>
                  :             
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="size-4">
                     <path fillRule="evenodd" d="M11.986 3H12a2 2 0 0 1 2 2v6a2 2 0 0 1-1.5 1.937V7A2.5 2.5 0 0 0 10 4.5H4.063A2 2 0 0 1 6 3h.014A2.25 2.25 0 0 1 8.25 1h1.5a2.25 2.25 0 0 1 2.236 2ZM10.5 4v-.75a.75.75 0 0 0-.75-.75h-1.5a.75.75 0 0 0-.75.75V4h3Z" clipRule="evenodd" />
                     <path fillRule="evenodd" d="M3 6a1 1 0 0 0-1 1v7a1 1 0 0 0 1 1h7a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1H3Zm1.75 2.5a.75.75 0 0 0 0 1.5h3.5a.75.75 0 0 0 0-1.5h-3.5ZM4 11.75a.75.75 0 0 1 .75-.75h3.5a.75.75 0 0 1 0 1.5h-3.5a.75.75 0 0 1-.75-.75Z" clipRule="evenodd" />
                  </svg>
               }
            </button>
         </div>
      </div>
   );
};

export default Message;