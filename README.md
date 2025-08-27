# WolfSP Dashboard

WolfSP Dashboard es una aplicación web completa que permite a usuarios autenticados ejecutar Stored Procedures (SP) de una base de datos SQL Server, introducir parámetros y visualizar los resultados en un formato claro y elegante.

## Arquitectura

La aplicación utiliza una arquitectura desacoplada cliente-servidor:

- **Backend**: API RESTful construida con Python y el framework FastAPI
- **Frontend**: Single Page Application (SPA) construida con React y estilizada con Tailwind CSS
- **Base de Datos**: Microsoft SQL Server (versión 2008 o superior)

## Características Principales

- Autenticación segura con JSON Web Tokens (JWT)
- Interfaz de usuario moderna y responsiva
- Ejecución dinámica de Stored Procedures
- Visualización de resultados en tablas
- Gestión de parámetros de informes
- Configuración basada en archivos JSON

## Requisitos Previos

### Backend
- Python 3.8 o superior
- ODBC Driver para SQL Server
- Acceso a una base de datos SQL Server

### Frontend
- Node.js 14 o superior
- npm o yarn

## Instalación

### Backend

1. Navegar a la carpeta del backend:
   ```
   cd backend
   ```

2. Crear un entorno virtual:
   ```
   python -m venv venv
   ```

3. Activar el entorno virtual:
   - Windows: `venv\\Scripts\\activate`
   - Linux/Mac: `source venv/bin/activate`

4. Instalar dependencias:
   ```
   pip install -r requirements.txt
   ```

5. Crear un archivo `.env` basado en `.env.example`:
   ```
   cp .env.example .env
   ```

6. Editar el archivo `.env` con las configuraciones correctas.

7. Iniciar el servidor:
   ```
   uvicorn main:app --reload
   ```

### Frontend

1. Navegar a la carpeta del frontend:
   ```
   cd frontend
   ```

2. Instalar dependencias:
   ```
   npm install
   ```

3. Crear un archivo `.env` para configurar la URL de la API:
   ```
   echo "REACT_APP_API_URL=http://localhost:8000" > .env
   ```

4. Iniciar la aplicación en modo desarrollo:
   ```
   npm start
   ```

## Uso

1. Acceder a la aplicación en: http://localhost:3000
2. Iniciar sesión con las credenciales proporcionadas
3. Seleccionar un informe en la sección de informes
4. Ingresar los parámetros requeridos
5. Ejecutar el informe y visualizar los resultados

## Seguridad

- La aplicación implementa autenticación basada en JWT
- Las contraseñas se almacenan hasheadas usando bcrypt
- La conexión a la base de datos utiliza un usuario específico con permisos limitados
- Todos los secretos se gestionan a través de variables de entorno

## Licencia

Este proyecto está licenciado bajo la Licencia MIT - ver el archivo LICENSE para más detalles.
