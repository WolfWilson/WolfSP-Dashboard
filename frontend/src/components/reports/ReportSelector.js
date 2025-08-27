import React, { useState, useEffect } from 'react';
import { reportsAPI } from '../../api/apiClient';
import Card from '../ui/Card';
import FormField from '../ui/FormField';
import Button from '../ui/Button';
import Spinner from '../ui/Spinner';
import Alert from '../ui/Alert';

const ReportSelector = ({ onSelectReport, selectedReport }) => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchReports = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const reportConfig = await reportsAPI.getConfig();
        setReports(reportConfig);
      } catch (err) {
        setError('Error al cargar los informes. Por favor, inténtelo de nuevo más tarde.');
        console.error('Error fetching reports:', err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchReports();
  }, []);
  
  if (loading) {
    return (
      <Card>
        <div className="py-4 flex justify-center">
          <Spinner text="Cargando informes..." />
        </div>
      </Card>
    );
  }
  
  if (error) {
    return (
      <Card>
        <Alert type="error" message={error} />
      </Card>
    );
  }
  
  return (
    <Card title="Seleccionar Informe">
      <div className="mb-4">
        <FormField
          type="select"
          name="report"
          label="Informe"
          value={selectedReport?.internalID || ''}
          onChange={(e) => {
            const selectedID = e.target.value;
            const reportData = reports.find(r => r.internalID === selectedID);
            onSelectReport(reportData);
          }}
          options={reports.map(report => ({
            value: report.internalID,
            label: report.displayName
          }))}
          placeholder="Seleccione un informe"
          required
        />
      </div>
    </Card>
  );
};

export default ReportSelector;
