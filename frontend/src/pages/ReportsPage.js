import React, { useState, useEffect } from 'react';
import DashboardLayout from '../components/layout/DashboardLayout';
import ReportSelector from '../components/reports/ReportSelector';
import DynamicForm from '../components/reports/DynamicForm';
import DataTable from '../components/ui/DataTable';
import Card from '../components/ui/Card';
import Spinner from '../components/ui/Spinner';
import Alert from '../components/ui/Alert';
import { reportsAPI, authAPI } from '../api/apiClient';

const ReportsPage = () => {
  const [user, setUser] = useState(null);
  const [selectedReport, setSelectedReport] = useState(null);
  const [reportResults, setReportResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loadingUser, setLoadingUser] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        setLoadingUser(true);
        const userData = await authAPI.getUserProfile();
        setUser(userData);
      } catch (err) {
        console.error('Error fetching user profile:', err);
      } finally {
        setLoadingUser(false);
      }
    };
    
    fetchUserProfile();
  }, []);
  
  const handleReportSelection = (reportData) => {
    setSelectedReport(reportData);
    setReportResults(null);
    setError(null);
  };
  
  const handleExecuteReport = async (params) => {
    try {
      setLoading(true);
      setError(null);
      
      const results = await reportsAPI.executeReport(selectedReport.internalID, params);
      setReportResults(results);
    } catch (err) {
      let errorMessage = 'Error al ejecutar el informe';
      
      if (err.response && err.response.data && err.response.data.detail) {
        errorMessage = err.response.data.detail;
      }
      
      setError(errorMessage);
      console.error('Error executing report:', err);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <DashboardLayout title="Informes" user={user}>
      {loadingUser ? (
        <div className="flex justify-center items-center h-64">
          <Spinner size="lg" text="Cargando..." />
        </div>
      ) : (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1">
              <ReportSelector 
                onSelectReport={handleReportSelection}
                selectedReport={selectedReport}
              />
              
              {selectedReport && (
                <div className="mt-6">
                  <DynamicForm 
                    report={selectedReport}
                    onSubmit={handleExecuteReport}
                    loading={loading}
                  />
                </div>
              )}
            </div>
            
            <div className="lg:col-span-2">
              {error && (
                <Alert 
                  type="error" 
                  message={error} 
                  onClose={() => setError(null)}
                />
              )}
              
              {loading && (
                <Card>
                  <div className="py-10 flex justify-center">
                    <Spinner text="Ejecutando informe..." />
                  </div>
                </Card>
              )}
              
              {reportResults && !loading && (
                <Card title="Resultados">
                  <div className="mb-4">
                    <div className="text-sm text-gray-500">
                      Total de filas: {reportResults.totalRows}
                    </div>
                    <div className="text-sm text-gray-500">
                      Tiempo de ejecución: {reportResults.executionTime} segundos
                    </div>
                  </div>
                  
                  <DataTable 
                    columns={reportResults.columns}
                    data={reportResults.data}
                  />
                </Card>
              )}
              
              {!reportResults && !loading && !error && selectedReport && (
                <Card>
                  <div className="py-10 text-center text-gray-500">
                    Complete los parámetros y ejecute el informe para ver los resultados.
                  </div>
                </Card>
              )}
              
              {!selectedReport && !loading && (
                <Card>
                  <div className="py-10 text-center text-gray-500">
                    Seleccione un informe para comenzar.
                  </div>
                </Card>
              )}
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
};

export default ReportsPage;
