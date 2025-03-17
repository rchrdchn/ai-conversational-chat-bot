import React, { useRef, useEffect } from 'react';

interface ConversationSummary {
  id: string;
  title: string;
  firstUserMessage: string;
}

interface ConversationsDialogProps {
  conversations: ConversationSummary[];
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
      if (!window.confirm('Are you sure you want to clear all conversations?')) {
         return;
      }
      localStorage.removeItem('conversations');
      window.location.reload();
   };

  useEffect(() => {
    const dialog = dialogRef.current;
    if (dialog) {
      if (isOpen && !dialog.open) {
        dialog.showModal();
      } else if (!isOpen && dialog.open) {
        dialog.close();
      }
    }
  }, [isOpen]);

  return (
    <dialog
      ref={dialogRef}
      className="dark:bg-gray-600 rounded-lg w-full max-w-md p-6 max-h-[80vh] overflow-y-auto backdrop:bg-black backdrop:bg-opacity-50"
    >
      <div className="flex justify-between items-center mb-4">
         <h3 className="dark:text-gray-50 text-xl font-bold text-gray-800">Conversation History</h3>
         <button
            onClick={onClose}
            className="dark:text-white text-gray-500 hover:text-gray-700 focus:outline-none"
         >
               <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
               </svg>
         </button>
      </div>
      {conversations.length > 0 ? (
        <div className="space-y-4">
          {conversations.map((conversation) => (
            <button
              key={conversation.id}
              onClick={() => onSelectConversation(conversation.id)}
              className="block w-full text-left p-2 rounded bg-gray-100 dark:bg-gray-700 hover:bg-gray-200"
            >
              <h4 className="font-bold dark:text-gray-50">{conversation.title}</h4>
              <p className="text-sm text-gray-600 dark:text-gray-100">{conversation.firstUserMessage}</p>
            </button>
          ))}
         <div className='mt-4'>
            <button onClick={handleClearConversations} className="w-full bg-red-500 hover:bg-red-600 rounded py-1 px-2 text-white focus:outline-none">
               Clear
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