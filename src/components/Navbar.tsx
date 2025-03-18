import React, { useEffect } from 'react';
import logo from '../assets/logo.svg';

interface NavbarProps {
  onCreateNewConversation: () => void;
  onShowConversations: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onCreateNewConversation, onShowConversations }) => {
  const [darkMode, setDarkMode] = React.useState(false);

  // Apply dark mode styles
  const applyDarkMode = (isDarkMode: boolean) => {
    const htmlElem = document.documentElement;
    if (isDarkMode) {
      htmlElem.classList.add('dark');
      htmlElem.setAttribute('style', 'color-scheme: dark');
    } else {
      htmlElem.classList.remove('dark');
      htmlElem.setAttribute('style', 'color-scheme: light');
    }
  };

  // Save dark mode state to localStorage
  const saveDarkModeToLocalStorage = (isDarkMode: boolean) => {
    localStorage.setItem('darkMode', isDarkMode.toString());
  };

  // Toggle dark mode
  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    applyDarkMode(newDarkMode);
    saveDarkModeToLocalStorage(newDarkMode);
  };

  useEffect(() => {
    // Load dark mode state from localStorage on component mount
    const savedDarkMode = localStorage.getItem('darkMode') === 'true';
    setDarkMode(savedDarkMode);
    applyDarkMode(savedDarkMode);
  }, []);

  return (
    <div className="h-16 flex items-center justify-between w-full">
      <div className="absolute flex flex-row items-center start-1">
        <button className="p-4">
          <img src={logo} alt="Abel Logo" width={50} height={50} />
        </button>
      </div>
      <div className="grow justify-center hidden max-w-[50%] @[640px]/nav:flex"></div>
      <div className="p-4 absolute flex flex-row items-center gap-0.5 ml-auto end-3">
        {/* Dark Mode Toggle Button */}
        <button
          onClick={toggleDarkMode}
          title={darkMode ? 'Enable Light Mode' : 'Enable Dark Mode'}
          className="border rounded-full p-2 hover:bg-blue-500 hover:text-white dark:hover:bg-blue-500 dark:hover:border-blue-400"
        >
          {darkMode ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="size-4"
            >
              <path d="M8 1a.75.75 0 0 1 .75.75v1.5a.75.75 0 0 1-1.5 0v-1.5A.75.75 0 0 1 8 1ZM10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0ZM12.95 4.11a.75.75 0 1 0-1.06-1.06l-1.062 1.06a.75.75 0 0 0 1.061 1.062l1.06-1.061ZM15 8a.75.75 0 0 1-.75.75h-1.5a.75.75 0 0 1 0-1.5h1.5A.75.75 0 0 1 15 8ZM11.89 12.95a.75.75 0 0 0 1.06-1.06l-1.06-1.062a.75.75 0 0 0-1.062 1.061l1.061 1.06ZM8 12a.75.75 0 0 1 .75.75v1.5a.75.75 0 0 1-1.5 0v-1.5A.75.75 0 0 1 8 12ZM5.172 11.89a.75.75 0 0 0-1.061-1.062L3.05 11.89a.75.75 0 1 0 1.06 1.06l1.06-1.06ZM4 8a.75.75 0 0 1-.75.75h-1.5a.75.75 0 0 1 0-1.5h1.5A.75.75 0 0 1 4 8ZM4.11 5.172A.75.75 0 0 0 5.173 4.11L4.11 3.05a.75.75 0 1 0-1.06 1.06l1.06 1.06Z" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="size-4"
            >
              <path d="M14.438 10.148c.19-.425-.321-.787-.748-.601A5.5 5.5 0 0 1 6.453 2.31c.186-.427-.176-.938-.6-.748a6.501 6.501 0 1 0 8.585 8.586Z" />
            </svg>
          )}
        </button>

        {/* Show Conversations Button */}
        <button
          onClick={onShowConversations}
          title='Show Conversations'
          className="border rounded-full p-2 mx-1.5 hover:bg-blue-500 hover:text-white dark:hover:bg-blue-500 dark:hover:border-blue-400"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="size-4"
          >
            <path d="M3 4.75a1 1 0 1 0 0-2 1 1 0 0 0 0 2ZM6.25 3a.75.75 0 0 0 0 1.5h7a.75.75 0 0 0 0-1.5h-7ZM6.25 7.25a.75.75 0 0 0 0 1.5h7a.75.75 0 0 0 0-1.5h-7ZM6.25 11.5a.75.75 0 0 0 0 1.5h7a.75.75 0 0 0 0-1.5h-7ZM4 12.25a1 1 0 1 1-2 0 1 1 0 0 1 2 0ZM3 9a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z" />
          </svg>
        </button>

        {/* Create New Conversation Button */}
        <button
          onClick={onCreateNewConversation}
          title='Create a New Conversation'
          className="border rounded-full p-2 hover:bg-blue-500 hover:text-white dark:hover:bg-blue-500 dark:hover:border-blue-400"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="size-4"
          >
            <path d="M13.488 2.513a1.75 1.75 0 0 0-2.475 0L6.75 6.774a2.75 2.75 0 0 0-.596.892l-.848 2.047a.75.75 0 0 0 .98.98l2.047-.848a2.75 2.75 0 0 0 .892-.596l4.261-4.262a1.75 1.75 0 0 0 0-2.474Z" />
            <path d="M4.75 3.5c-.69 0-1.25.56-1.25 1.25v6.5c0 .69.56 1.25 1.25 1.25h6.5c.69 0 1.25-.56 1.25-1.25V9A.75.75 0 0 1 14 9v2.25A2.75 2.75 0 0 1 11.25 14h-6.5A2.75 2.75 0 0 1 2 11.25v-6.5A2.75 2.75 0 0 1 4.75 2H7a.75.75 0 0 1 0 1.5H4.75Z" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Navbar;