import React, { useRef, useEffect } from 'react';

interface ConversationsDialogProps {
  messages: { text: string; isUser: boolean }[];
  isOpen: boolean;
  onClose: () => void;
}

const ConversationsDialog: React.FC<ConversationsDialogProps> = ({ messages, isOpen, onClose }) => {
  const dialogRef = useRef<HTMLDialogElement>(null);

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
      className="rounded-lg w-full max-w-md p-6 max-h-[80vh] overflow-y-auto backdrop:bg-black backdrop:bg-opacity-50"
    >
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-bold text-gray-800">Conversation History</h3>
        <button
          onClick={onClose}
          className="text-gray-500 hover:text-gray-700 focus:outline-none"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
      {messages.length > 0 ? (
        <div className="space-y-4">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`p-3 rounded-lg ${
                msg.isUser
                  ? 'bg-blue-100 text-blue-800 self-end'
                  : 'bg-gray-100 text-gray-800 self-start'
              }`}
            >
              {msg.text}
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500">No messages yet.</p>
      )}
    </dialog>
  );
};

export default ConversationsDialog;