import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const FormField = ({ 
  type, 
  name, 
  label, 
  value, 
  onChange, 
  options = [], 
  required = false, 
  error = null, 
  placeholder = '',
  disabled = false
}) => {
  const [dateValue, setDateValue] = useState(value ? new Date(value) : null);
  
  const handleDateChange = (date) => {
    setDateValue(date);
    onChange({ target: { name, value: date } });
  };
  
  return (
    <div className="mb-4">
      <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">
        {label}
        {required && <span className="text-wolf-error ml-1">*</span>}
      </label>
      
      {type === 'text' && (
        <input
          type="text"
          id={name}
          name={name}
          value={value || ''}
          onChange={onChange}
          required={required}
          disabled={disabled}
          placeholder={placeholder}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-wolf-primary focus:ring-wolf-primary sm:text-sm"
        />
      )}
      
      {type === 'select' && (
        <select
          id={name}
          name={name}
          value={value || ''}
          onChange={onChange}
          required={required}
          disabled={disabled}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-wolf-primary focus:ring-wolf-primary sm:text-sm"
        >
          <option value="">{placeholder || 'Seleccione una opción'}</option>
          {options.map((option, index) => (
            <option key={index} value={typeof option === 'object' ? option.value : option}>
              {typeof option === 'object' ? option.label : option}
            </option>
          ))}
        </select>
      )}
      
      {type === 'date' && (
        <DatePicker
          id={name}
          selected={dateValue}
          onChange={handleDateChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-wolf-primary focus:ring-wolf-primary sm:text-sm"
          dateFormat="dd/MM/yyyy"
          placeholderText={placeholder || 'Seleccione una fecha'}
          disabled={disabled}
        />
      )}
      
      {error && (
        <p className="mt-1 text-sm text-wolf-error">{error}</p>
      )}
    </div>
  );
};

export default FormField;
