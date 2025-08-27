import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { 
  HomeIcon, 
  ChartBarIcon, 
  Cog6ToothIcon,
  ArrowLeftOnRectangleIcon,
  UserIcon
} from '@heroicons/react/24/outline';

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const isActive = (path) => {
    return location.pathname === path;
  };
  
  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };
  
  const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: HomeIcon, current: isActive('/dashboard') },
    { name: 'Informes', href: '/reports', icon: ChartBarIcon, current: isActive('/reports') },
    { name: 'Perfil', href: '/profile', icon: UserIcon, current: isActive('/profile') },
    { name: 'Configuración', href: '/settings', icon: Cog6ToothIcon, current: isActive('/settings') },
  ];
  
  return (
    <div className="flex flex-col h-full bg-gray-800 text-white w-64 py-6 px-4">
      <div className="flex items-center mb-8">
        <h1 className="text-xl font-bold">WolfSP Dashboard</h1>
      </div>
      
      <nav className="flex-1 space-y-1">
        {navigation.map((item) => (
          <Link
            key={item.name}
            to={item.href}
            className={`${
              item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'
            } group flex items-center px-2 py-2 text-sm font-medium rounded-md`}
          >
            <item.icon className="mr-3 h-6 w-6" aria-hidden="true" />
            {item.name}
          </Link>
        ))}
      </nav>
      
      <div className="mt-auto pt-4 border-t border-gray-700">
        <button
          onClick={handleLogout}
          className="group flex w-full items-center px-2 py-2 text-sm font-medium rounded-md text-gray-300 hover:bg-gray-700 hover:text-white"
        >
          <ArrowLeftOnRectangleIcon className="mr-3 h-6 w-6" aria-hidden="true" />
          Cerrar Sesión
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
