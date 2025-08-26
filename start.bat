@echo off
setlocal enabledelayedexpansion

echo ========================================
echo   Starting ScrumTogether Development
echo ========================================

where python >nul 2>nul
if errorlevel 1 (
    echo ERROR: Python is not installed or not in PATH
    pause
    exit /b 1
)

where npm >nul 2>nul
if errorlevel 1 (
    echo ERROR: Node.js/npm is not installed or not in PATH
    pause
    exit /b 1
)

set "BACKEND_DIR=%~dp0backend"
set "FRONTEND_DIR=%~dp0frontend"

if not exist "%BACKEND_DIR%" (
    echo ERROR: Backend directory not found: %BACKEND_DIR%
    pause
    exit /b 1
)

if not exist "%FRONTEND_DIR%" (
    echo ERROR: Frontend directory not found: %FRONTEND_DIR%
    pause
    exit /b 1
)

rem Создаем .env файл для отключения автозапуска браузера
if not exist "%FRONTEND_DIR%\.env" (
    echo BROWSER=none > "%FRONTEND_DIR%\.env"
    echo Created .env file to prevent browser auto-open
)

if not exist "%FRONTEND_DIR%/node_modules" (
    echo Installing frontend dependencies...
    cd /d "%FRONTEND_DIR%"
    call npm install
    if errorlevel 1 (
        echo ERROR: npm install failed
        pause
        exit /b 1
    )
    cd /d "%~dp0"
)

if not exist "%BACKEND_DIR%/venv" (
    echo Setting up Python virtual environment...
    cd /d "%BACKEND_DIR%"
    call python -m venv venv
    if errorlevel 1 (
        echo ERROR: Failed to create virtual environment
        pause
        exit /b 1
    )
    
    echo Installing backend dependencies...
    call venv\Scripts\activate && pip install -r requirements.txt
    if errorlevel 1 (
        echo ERROR: pip install failed
        pause
        exit /b 1
    )
    cd /d "%~dp0"
)

echo Starting Django backend...
start "Backend_Server" cmd /k "title Backend_Server && cd /d "%BACKEND_DIR%" && call venv\Scripts\activate && python manage.py runserver"

echo Starting React frontend...
start "Frontend_Server" cmd /k "title Frontend_Server && cd /d "%FRONTEND_DIR%" && npm start"

echo Waiting for servers to start...
timeout /t 8 /nobreak >nul

echo.
echo ========================================
echo   Development servers are starting...
echo   - Frontend: http://localhost:3000
echo   - Backend:  http://127.0.0.1:8000
echo ========================================
echo.

exit /b 0