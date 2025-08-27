import time
import json
from typing import Dict, List, Any, Tuple, Optional
import pandas as pd
from core.config import get_config
from data.database import DatabaseManager

class ReportService:
    """
    Service for handling report operations.
    """
    
    @staticmethod
    def get_report_config(report_id: str) -> Optional[Dict[str, Any]]:
        """
        Get the configuration for a specific report.
        
        Args:
            report_id: Internal ID of the report
            
        Returns:
            Report configuration or None if not found
        """
        config = get_config()
        
        for report in config:
            if report.get("internalID") == report_id:
                return report
                
        return None
    
    @staticmethod
    def execute_report(report_id: str, params: Dict[str, Any]) -> Tuple[Optional[Dict[str, Any]], Optional[str]]:
        """
        Execute a report with the given parameters.
        
        Args:
            report_id: Internal ID of the report
            params: Dictionary of parameter names and values
            
        Returns:
            Tuple containing results dictionary and optional error message
        """
        # Get report configuration
        report_config = ReportService.get_report_config(report_id)
        if not report_config:
            return None, f"Report with ID '{report_id}' not found"
        
        # Get stored procedure name
        stored_proc_name = report_config.get("storedProcedure")
        if not stored_proc_name:
            return None, "Stored procedure name not defined for this report"
        
        # Execute the stored procedure
        start_time = time.time()
        df, error = DatabaseManager.execute_stored_procedure(stored_proc_name, params)
        execution_time = time.time() - start_time
        
        if error:
            return None, error
        
        # Convert results to dict
        columns = df.columns.tolist()
        data = df.to_dict('records')
        
        result = {
            "columns": columns,
            "data": data,
            "totalRows": len(data),
            "executionTime": round(execution_time, 2)
        }
        
        return result, None
    
    @staticmethod
    def get_data_source(source_name: str) -> List[Dict[str, Any]]:
        """
        Get data for a dynamic data source.
        
        Args:
            source_name: Name of the data source
            
        Returns:
            List of items for the data source
        """
        if source_name == "getOperatorsList":
            return DatabaseManager.get_operators_list()
        
        # Add more data sources as needed
        
        return []
