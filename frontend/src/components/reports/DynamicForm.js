import React, { useState, useEffect } from 'react';
import { reportsAPI } from '../../api/apiClient';
import Card from '../ui/Card';
import FormField from '../ui/FormField';
import Button from '../ui/Button';
import Spinner from '../ui/Spinner';
import Alert from '../ui/Alert';

const DynamicForm = ({ report, onSubmit, loading }) => {
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  const [dynamicOptions, setDynamicOptions] = useState({});
  const [loadingOptions, setLoadingOptions] = useState({});
  
  useEffect(() => {
    // Reset form when report changes
    setFormData({});
    setErrors({});
    
    // Check for params with data sources
    if (report && report.params) {
      const dataSourceParams = report.params.filter(param => param.dataSource);
      
      // Load data for each data source
      dataSourceParams.forEach(param => {
        loadDataSource(param.dataSource, param.name);
      });
    }
  }, [report]);
  
  const loadDataSource = async (sourceName, paramName) => {
    try {
      setLoadingOptions(prev => ({ ...prev, [paramName]: true }));
      
      const data = await reportsAPI.getDataSource(sourceName);
      
      setDynamicOptions(prev => ({ ...prev, [paramName]: data }));
    } catch (error) {
      console.error(`Error loading data source ${sourceName}:`, error);
    } finally {
      setLoadingOptions(prev => ({ ...prev, [paramName]: false }));
    }
  };
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error for this field if it exists
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };
  
  const validateForm = () => {
    const newErrors = {};
    let isValid = true;
    
    // Check required fields (all fields are required for now)
    report.params.forEach(param => {
      if (!formData[param.name] || formData[param.name] === '') {
        newErrors[param.name] = 'Este campo es obligatorio';
        isValid = false;
      }
    });
    
    setErrors(newErrors);
    return isValid;
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      // Format data for the API
      const formattedParams = Object.entries(formData).map(([name, value]) => ({
        name,
        value
      }));
      
      onSubmit(formattedParams);
    }
  };
  
  if (!report) {
    return null;
  }
  
  return (
    <Card title="Parámetros del Informe">
      <form onSubmit={handleSubmit}>
        {report.params.map((param, index) => {
          // Determine field type
          const fieldType = param.type;
          
          // Determine options for select fields
          let options = [];
          if (fieldType === 'select') {
            if (param.dataSource) {
              options = dynamicOptions[param.name] || [];
            } else if (param.options) {
              options = param.options;
            }
          }
          
          return (
            <div key={index} className="mb-4">
              <FormField
                type={fieldType}
                name={param.name}
                label={param.label}
                value={formData[param.name] || ''}
                onChange={handleInputChange}
                options={options}
                required={true}
                error={errors[param.name]}
                disabled={loadingOptions[param.name]}
              />
              
              {loadingOptions[param.name] && (
                <div className="mt-1">
                  <Spinner size="sm" text="Cargando opciones..." />
                </div>
              )}
            </div>
          );
        })}
        
        <div className="mt-6 flex justify-end">
          <Button
            type="submit"
            variant="primary"
            disabled={loading}
          >
            {loading ? 'Ejecutando...' : 'Ejecutar Informe'}
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default DynamicForm;
