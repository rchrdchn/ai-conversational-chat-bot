import React, { useState } from 'react';

interface InputBoxProps {
  onSendMessage: (data: { text: string; file: File | null }) => void;
}

const InputBox: React.FC<InputBoxProps> = ({ onSendMessage }) => {
  const [input, setInput] = useState('');
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile); // Store the selected file in state
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const inputText = input.trim();

    if (inputText || file) {
      onSendMessage({ text: inputText, file });
      setInput('');
      setFile(null);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const removeFile = () => setFile(null);

  return (
    <form onSubmit={handleSubmit} className="p-4 gap-2">
      {/* Uploaded file */}
      {file && (
         <div className='transition-all duration-300 bg-gray-200 max-w-max rounded-xl p-1 mb-1.5 flex items-center dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-white'>
            <div className='m-1' title='Attachment'>
               <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="size-4">
                  <path fillRule="evenodd" d="M4 2a1.5 1.5 0 0 0-1.5 1.5v9A1.5 1.5 0 0 0 4 14h8a1.5 1.5 0 0 0 1.5-1.5V6.621a1.5 1.5 0 0 0-.44-1.06L9.94 2.439A1.5 1.5 0 0 0 8.878 2H4Zm1 5.75A.75.75 0 0 1 5.75 7h4.5a.75.75 0 0 1 0 1.5h-4.5A.75.75 0 0 1 5 7.75Zm0 3a.75.75 0 0 1 .75-.75h4.5a.75.75 0 0 1 0 1.5h-4.5a.75.75 0 0 1-.75-.75Z" clipRule="evenodd" />
               </svg>
            </div>
            <p className='text-sm'>{file?.name}</p>
            <button className='m-1' title='Remove attachment' onClick={removeFile}>
               <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="size-4">
                  <path d="M5.28 4.22a.75.75 0 0 0-1.06 1.06L6.94 8l-2.72 2.72a.75.75 0 1 0 1.06 1.06L8 9.06l2.72 2.72a.75.75 0 1 0 1.06-1.06L9.06 8l2.72-2.72a.75.75 0 0 0-1.06-1.06L8 6.94 5.28 4.22Z" />
               </svg>
            </button>
         </div>
      )}
      {/* Input box */}
      <div className='flex-grow flex gap-2'>
      <textarea
        rows={1}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="How can Abel help?"
        className="font-sans flex-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      {/* File upload button */}
      <label title='Select attachment' className="transition-all duration-300 cursor-pointer flex items-center px-4 py-2 bg-gray-200 text-black rounded-md hover:bg-gray-300">
        <input type="file" className="hidden" onChange={handleFileChange}/>
        <span>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="size-4">
           <path fillRule="evenodd" d="M11.914 4.086a2 2 0 0 0-2.828 0l-5 5a2 2 0 1 0 2.828 2.828l.556-.555a.75.75 0 0 1 1.06 1.06l-.555.556a3.5 3.5 0 0 1-4.95-4.95l5-5a3.5 3.5 0 0 1 4.95 4.95l-1.972 1.972a2.125 2.125 0 0 1-3.006-3.005L9.97 4.97a.75.75 0 1 1 1.06 1.06L9.058 8.003a.625.625 0 0 0 .884.883l1.972-1.972a2 2 0 0 0 0-2.828Z" clipRule="evenodd" />
         </svg>
        </span>
      </label>
      {/* Submit button */}
      <button
        type="submit"
        title='Send'
        disabled={!input.trim() && !file}
        className={`transition-all duration-300 px-4 py-2 bg-blue-600 text-white rounded-md ${(input.trim() || file) && `hover:bg-blue-700 dark:hover:bg-blue-700`}`}
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="size-4">
           <path d="M2.87 2.298a.75.75 0 0 0-.812 1.021L3.39 6.624a1 1 0 0 0 .928.626H8.25a.75.75 0 0 1 0 1.5H4.318a1 1 0 0 0-.927.626l-1.333 3.305a.75.75 0 0 0 .811 1.022 24.89 24.89 0 0 0 11.668-5.115.75.75 0 0 0 0-1.175A24.89 24.89 0 0 0 2.869 2.298Z" />
         </svg>
      </button>
      </div>
      
    </form>
  );
};

export default InputBox;