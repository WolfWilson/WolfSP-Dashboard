import os
import json
from typing import Dict, List, Any, Optional
from pydantic_settings import BaseSettings
from pathlib import Path

# Get the base directory of the project
BASE_DIR = Path(__file__).resolve().parent.parent

class Settings(BaseSettings):
    # Database settings
    DB_SERVER: str = "localhost"  # Valor por defecto para desarrollo
    DB_NAME: str = "wolfsp_db"    # Valor por defecto para desarrollo
    DB_USER: str = "wolfsp_dashboard_user"  # Valor por defecto para desarrollo
    DB_PASSWORD: str = "StrongP@ssw0rd123"  # Valor por defecto para desarrollo
    
    # Security settings
    SECRET_KEY: str = "dev_secret_key_for_testing_only_replace_in_production"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30
    
    # CORS settings
    FRONTEND_URL: str = "http://localhost:3000"
    
    # Application settings
    APP_NAME: str = "WolfSP Dashboard"
    APP_VERSION: str = "1.0.0"
    DEBUG: bool = True  # Por defecto en modo desarrollo
    
    class Config:
        env_file = os.path.join(BASE_DIR, ".env")
        env_file_encoding = "utf-8"
        env_file_encoding = "utf-8"

def get_settings() -> Settings:
    """
    Get the application settings from environment variables.
    """
    return Settings()

def get_config() -> List[Dict[str, Any]]:
    """
    Load and return the configuration from config.json file.
    """
    config_path = os.path.join(BASE_DIR, "config.json")
    
    try:
        with open(config_path, "r", encoding="utf-8") as config_file:
            config_data = json.load(config_file)
            return config_data
    except (FileNotFoundError, json.JSONDecodeError) as e:
        # In a production environment, you might want to log this error
        print(f"Error loading config.json: {e}")
        return []

def get_db_connection_string() -> str:
    """
    Build and return the database connection string.
    """
    settings = get_settings()
    
    # Build the connection string using the settings
    connection_string = (
        f"DRIVER={{ODBC Driver 17 for SQL Server}};"
        f"SERVER={settings.DB_SERVER};"
        f"DATABASE={settings.DB_NAME};"
        f"UID={settings.DB_USER};"
        f"PWD={settings.DB_PASSWORD};"
    )
    
    return connection_string
