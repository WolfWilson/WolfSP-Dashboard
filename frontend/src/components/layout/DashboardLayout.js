import React from 'react';
import Sidebar from './Sidebar';
import Header from './Header';

const DashboardLayout = ({ children, title, user }) => {
  return (
    <div className="flex h-screen bg-wolf-background">
      <Sidebar />
      
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header title={title} user={user} />
        
        <main className="flex-1 overflow-auto p-6">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
        
        <footer className="bg-white p-4 text-center text-gray-500 text-sm">
          <p>© {new Date().getFullYear()} WolfSP Dashboard. Todos los derechos reservados.</p>
        </footer>
      </div>
    </div>
  );
};

export default DashboardLayout;
