import pyodbc
import pandas as pd
import logging
from typing import List, Dict, Any, Optional, Tuple
from core.config import get_db_connection_string

# Configure logger
logger = logging.getLogger(__name__)

class DatabaseManager:
    """
    Class to handle database connections and operations.
    """
    
    @staticmethod
    def get_connection():
        """
        Create and return a new connection to the database.
        """
        try:
            connection_string = get_db_connection_string()
            connection = pyodbc.connect(connection_string)
            return connection
        except Exception as e:
            logger.error(f"Error connecting to database: {e}")
            raise
    
    @staticmethod
    def execute_stored_procedure(stored_proc_name: str, params: Dict[str, Any]) -> Tuple[pd.DataFrame, Optional[str]]:
        """
        Execute a stored procedure with the given parameters and return the results as a DataFrame.
        
        Args:
            stored_proc_name: Name of the stored procedure to execute
            params: Dictionary of parameter names and values
            
        Returns:
            Tuple containing DataFrame with results and optional error message
        """
        connection = None
        try:
            connection = DatabaseManager.get_connection()
            
            # Build the SQL command to execute the stored procedure
            sql_params = []
            param_placeholders = []
            
            for param_name, param_value in params.items():
                sql_params.append(param_value)
                param_placeholders.append(f"@{param_name}=?")
            
            sql_command = f"EXEC {stored_proc_name} {', '.join(param_placeholders)}"
            
            # Execute the stored procedure and return results as DataFrame
            df = pd.read_sql(sql_command, connection, params=sql_params)
            return df, None
            
        except Exception as e:
            error_message = f"Error executing stored procedure {stored_proc_name}: {str(e)}"
            logger.error(error_message)
            return pd.DataFrame(), error_message
        finally:
            if connection:
                connection.close()
                
    @staticmethod
    def get_operators_list() -> List[Dict[str, Any]]:
        """
        Fetch the list of operators from the database.
        This is an example of a method to get data for a select dropdown.
        
        Returns:
            List of dictionaries with operator information
        """
        connection = None
        try:
            connection = DatabaseManager.get_connection()
            
            # Example query - modify as needed to match your database schema
            query = """
            SELECT OperatorID as value, OperatorName as label
            FROM Operators
            ORDER BY OperatorName
            """
            
            df = pd.read_sql(query, connection)
            return df.to_dict('records')
            
        except Exception as e:
            logger.error(f"Error fetching operators list: {e}")
            return []
        finally:
            if connection:
                connection.close()
