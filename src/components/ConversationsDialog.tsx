import React, { useRef, useEffect, useCallback } from 'react';
import { ConversationHistory } from './types';

interface ConversationsDialogProps {
  conversations: ConversationHistory[];
  isOpen: boolean;
  onClose: () => void;
  onSelectConversation: (id: string) => void;
  onDeleteConversation: (id: string) => void;
}

const ConversationsDialog: React.FC<ConversationsDialogProps> = ({
  conversations,
  isOpen,
  onClose,
  onSelectConversation,
  onDeleteConversation
}) => {
  const dialogRef = useRef<HTMLDialogElement>(null);

  const handleClearConversations = () => {
      // alert the user before clearing the conversations
      if (!window.confirm('Are you sure you want to delete all conversations?')) {
         return;
      }
      localStorage.removeItem('conversations');
      window.location.reload();
   };

   const handleNewChat = () => {
      onClose();
      window.location.reload();
   }

   const handleSelectedConversation = (id: string) => {
      onClose();
      onSelectConversation(id);
    };

   const toggleDialogVisibility = useCallback(() => {
    const dialog = dialogRef.current;
    if (dialog) {
      if (isOpen && !dialog.open) {
        dialog.showModal();
      } else if (!isOpen && dialog.open) {
        dialog.close();
      }
    }
  }, [isOpen]);

  useEffect(() => {
    toggleDialogVisibility();
  }, [isOpen, toggleDialogVisibility]);

  return (
    <dialog
      ref={dialogRef}
      className={`${conversations.length === 0 && "h-1/3"} dark:bg-gray-800 rounded-lg w-full md:max-w-xl p-6 max-h-[80vh] overflow-y-auto backdrop:bg-black backdrop:bg-opacity-50`}
    >
      <div className="flex justify-between items-center mb-4">
         <div>
            <h3 className="font-sans dark:text-slate-50 text-xl font-bold text-gray-800">Conversation History</h3>
         </div>
         <div className='flex gap-2'>
            <button
              onClick={handleNewChat}
              title='Start a new chat'
              tabIndex={0}
              className="font-sans transition-all duration-300 bg-blue-600 hover:bg-blue-700 rounded py-1 px-2 mr-1 text-white focus:outline-none">
               New Chat
            </button>
            <button
               onClick={onClose}
               title='Close dialog'
               tabIndex={0}
               className="transition-all duration-300 p-1 rounded-full border hover:bg-gray-200 dark:hover:bg-gray-700 dark:text-slate-100 dark:hover:text-white focus:outline-none mr-1"
            >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="size-5">
                  <path d="M6.28 5.22a.75.75 0 0 0-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 1 0 1.06 1.06L10 11.06l3.72 3.72a.75.75 0 1 0 1.06-1.06L11.06 10l3.72-3.72a.75.75 0 0 0-1.06-1.06L10 8.94 6.28 5.22Z" />
                </svg>
            </button>
         </div>
      </div>
      {conversations.length > 0 ? (
        <div className="space-y-4 pt-2">
          {conversations.map((conversation) => (
            <div>
              <button
                key={conversation.id}
                onClick={() => handleSelectedConversation(conversation.id)}
                title={`Select conversation: ${conversation.firstUserMessage}`}
                className="transition-all duration-300 block w-full text-left py-2 px-4 rounded-lg bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 hover:bg-gray-200"
              >
                <h4 className="font-sans text-sm font-semibold text-slate-900 dark:text-slate-50">
                  {`${conversation.firstUserMessage && conversation.firstUserMessage.length > 125 ?
                      `${conversation.firstUserMessage.substring(0, 125)}...`
                      :
                      conversation.firstUserMessage}
                  `}
                </h4>
                <div className="flex justify-between items-center">
                  <p title={conversation.createdAt} className="font-sans text-xs text-slate-500 dark:text-slate-300 italic">{conversation.createdAt}</p>
                  <button
                      onClick={() => onDeleteConversation(conversation.id)}
                      title="Delete conversation"
                      className="transition-all duration-300 ml-2 p-2 rounded-full hover:text-red-500"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                      </svg>
                    </button>
                </div>
              </button>
          </div>
          ))}
         <div className='mt-4 pt-2'>
            <button
              onClick={handleClearConversations}
              title='Delete all conversations'
              tabIndex={0}
              className="font-sans transition-all duration-300 w-full border border-red-500 text-red-500 hover:bg-red-500 dark:hover:bg-red-600 dark:bg-red-500 dark:text-white rounded py-1 px-2 hover:text-white focus:outline-none">
               Delete All Conversations
            </button>
         </div>
        </div>
      ) : (
        <div className="flex justify-center items-center h-48">
          <p className="font-sans text-gray-500 dark:text-gray-200">No conversations yet.</p>
        </div>
      )}
    </dialog>
  );
};

export default ConversationsDialog;