import React from 'react';
import { BellIcon } from '@heroicons/react/24/outline';

const Header = ({ title, user }) => {
  return (
    <header className="bg-white shadow">
      <div className="flex justify-between items-center px-4 py-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-semibold text-gray-900">{title}</h1>
        
        <div className="flex items-center space-x-4">
          <button
            type="button"
            className="relative p-1 rounded-full text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-wolf-primary"
          >
            <span className="sr-only">Ver notificaciones</span>
            <BellIcon className="h-6 w-6" aria-hidden="true" />
            <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-white" />
          </button>
          
          <div className="flex items-center">
            <div className="h-8 w-8 rounded-full bg-gray-400 flex items-center justify-center text-white">
              {user?.username?.charAt(0).toUpperCase() || 'U'}
            </div>
            <span className="ml-2 text-sm font-medium text-gray-700">
              {user?.full_name || user?.username || 'Usuario'}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
