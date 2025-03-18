import React, { useRef, useEffect, useCallback } from 'react';
import { ConversationHistory } from './types';

interface ConversationsDialogProps {
  conversations: ConversationHistory[];
  isOpen: boolean;
  onClose: () => void;
  onSelectConversation: (id: string) => void;
}

const ConversationsDialog: React.FC<ConversationsDialogProps> = ({
  conversations,
  isOpen,
  onClose,
  onSelectConversation,
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
      className="dark:bg-gray-800 rounded-lg w-full max-w-xl p-6 max-h-[80vh] overflow-y-auto backdrop:bg-black backdrop:bg-opacity-50"
    >
      <div className="flex justify-between items-center mb-4">
         <div>
            <h3 className="dark:text-slate-50 text-xl font-bold text-gray-800">Conversation History</h3>
         </div>
         <div className='flex gap-2'>
            <button
              onClick={handleNewChat}
              title='Start a new chat'
              tabIndex={0}
              className="bg-blue-600 hover:bg-blue-700 rounded py-1 px-2 mr-1 text-white focus:outline-none">
               New Chat
            </button>
            <button
               onClick={onClose}
               title='Close dialog'
               tabIndex={0}
               className="p-1 rounded-full border hover:bg-gray-200 dark:hover:bg-gray-700 dark:text-slate-100 dark:hover:text-white focus:outline-none mr-1"
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
            <button
              key={conversation.id}
              onClick={() => handleSelectedConversation(conversation.id)}
              title={`Select conversation: ${conversation.firstUserMessage}`}
              className="block w-full text-left py-2 px-4 rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-gray-200"
            >
              <h4 className="font-bold mb-1 text-slate-900 dark:text-slate-50">{conversation.firstUserMessage}</h4>
              <p className="text-xs text-slate-500 dark:text-slate-300">{conversation.createdAt}</p>
            </button>
          ))}
         <div className='mt-4 pt-2'>
            <button
              onClick={handleClearConversations}
              title='Delete all conversations'
              tabIndex={0}
              className="w-full border border-red-500 text-red-500 hover:bg-red-500 dark:hover:bg-red-600 dark:bg-red-500 dark:text-white rounded py-1 px-2 hover:text-white focus:outline-none">
               Delete All Conversations
            </button>
         </div>
        </div>
      ) : (
        <p className="text-gray-500 dark:text-gray-200">No conversations yet.</p>
      )}
    </dialog>
  );
};

export default ConversationsDialog;