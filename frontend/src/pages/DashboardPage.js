import React, { useState, useEffect } from 'react';
import DashboardLayout from '../components/layout/DashboardLayout';
import Card from '../components/ui/Card';
import Spinner from '../components/ui/Spinner';
import Alert from '../components/ui/Alert';
import { authAPI } from '../api/apiClient';

const DashboardPage = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const userData = await authAPI.getUserProfile();
        setUser(userData);
      } catch (err) {
        setError('Error al cargar los datos del usuario');
        console.error('Error fetching user profile:', err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchUserProfile();
  }, []);
  
  return (
    <DashboardLayout title="Dashboard" user={user}>
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <Spinner size="lg" text="Cargando..." />
        </div>
      ) : error ? (
        <Alert type="error" message={error} />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card title="Bienvenido" className="md:col-span-2 lg:col-span-3">
            <p className="text-lg">
              Bienvenido al Panel de Control WolfSP, {user?.full_name || user?.username}.
            </p>
            <p className="mt-2 text-gray-600">
              Esta aplicación te permite ejecutar Stored Procedures (SP) de la base de datos
              y visualizar los resultados en un formato claro y elegante.
            </p>
          </Card>
          
          <Card title="Acceso Rápido">
            <ul className="space-y-2">
              <li>
                <a
                  href="/reports"
                  className="text-wolf-primary hover:text-blue-700 block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-100"
                >
                  Ejecutar Informes
                </a>
              </li>
              <li>
                <a
                  href="/profile"
                  className="text-wolf-primary hover:text-blue-700 block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-100"
                >
                  Mi Perfil
                </a>
              </li>
              <li>
                <a
                  href="/settings"
                  className="text-wolf-primary hover:text-blue-700 block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-100"
                >
                  Configuración
                </a>
              </li>
            </ul>
          </Card>
          
          <Card title="Estadísticas">
            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-md">
                <p className="text-sm font-medium text-gray-500">Total de Informes</p>
                <p className="mt-1 text-2xl font-semibold">2</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-md">
                <p className="text-sm font-medium text-gray-500">Último Acceso</p>
                <p className="mt-1 text-md font-semibold">
                  {new Date().toLocaleDateString()}
                </p>
              </div>
            </div>
          </Card>
          
          <Card title="Ayuda">
            <p className="text-gray-600">
              Para cualquier duda o problema con la aplicación, contacte con el
              administrador del sistema.
            </p>
            <div className="mt-4">
              <p className="text-sm font-medium text-gray-500">Email de Contacto</p>
              <p className="mt-1">soporte@example.com</p>
            </div>
          </Card>
        </div>
      )}
    </DashboardLayout>
  );
};

export default DashboardPage;
