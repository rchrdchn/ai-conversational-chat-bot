import React from 'react';
import AbelFull from '../assets/abel-full.svg';

const Navbar: React.FC = () => {
   const showConversations = () => {
      console.log('Show conversations');
   };

   const createNewConversation = () => {
      console.log('Create new conversation');
   };
   return (
      <div className="h-16 flex items-center justify-between w-full">
         <div className='absolute flex flex-row items-center start-1'>
            <button className='p-4'>
               <img src={AbelFull} alt="Abel Logo" className="h-6 w-auto" />
            </button>
         </div>
         <div className='grow justify-center hidden max-w-[50%] @[640px]/nav:flex'></div>
         <div className='p-4 absolute flex flex-row items-center gap-0.5 ml-auto end-3'>
            <button onClick={showConversations} className='border rounded-full p-2 hover:bg-gray-200 mr-2'>
               <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="size-4">
                  <path d="M3 4.75a1 1 0 1 0 0-2 1 1 0 0 0 0 2ZM6.25 3a.75.75 0 0 0 0 1.5h7a.75.75 0 0 0 0-1.5h-7ZM6.25 7.25a.75.75 0 0 0 0 1.5h7a.75.75 0 0 0 0-1.5h-7ZM6.25 11.5a.75.75 0 0 0 0 1.5h7a.75.75 0 0 0 0-1.5h-7ZM4 12.25a1 1 0 1 1-2 0 1 1 0 0 1 2 0ZM3 9a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z" />
               </svg>
            </button>
            <button onClick={createNewConversation} className='border rounded-full p-2 hover:bg-gray-200'>
               <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="size-4">
                  <path d="M13.488 2.513a1.75 1.75 0 0 0-2.475 0L6.75 6.774a2.75 2.75 0 0 0-.596.892l-.848 2.047a.75.75 0 0 0 .98.98l2.047-.848a2.75 2.75 0 0 0 .892-.596l4.261-4.262a1.75 1.75 0 0 0 0-2.474Z" />
                  <path d="M4.75 3.5c-.69 0-1.25.56-1.25 1.25v6.5c0 .69.56 1.25 1.25 1.25h6.5c.69 0 1.25-.56 1.25-1.25V9A.75.75 0 0 1 14 9v2.25A2.75 2.75 0 0 1 11.25 14h-6.5A2.75 2.75 0 0 1 2 11.25v-6.5A2.75 2.75 0 0 1 4.75 2H7a.75.75 0 0 1 0 1.5H4.75Z" />
               </svg>
            </button>
         </div>
      </div>
   );
};

export default Navbar;