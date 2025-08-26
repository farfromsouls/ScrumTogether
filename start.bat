@echo off
setlocal enabledelayedexpansion

echo ========================================
echo   Starting ScrumTogether Development
echo ========================================

rem Проверка необходимых программ
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

rem Определение путей
set "BACKEND_DIR=%~dp0backend"
set "FRONTEND_DIR=%~dp0frontend"

rem Проверка существования директорий
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

rem Установка зависимостей фронтенда, если нужно
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

rem Установка зависимостей бэкенда, если нужно
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

rem Запуск бэкенда
echo Starting Django backend...
start "Backend" cmd /k "cd /d "%BACKEND_DIR%" && call venv\Scripts\activate && python manage.py runserver"

rem Запуск фронтенда
echo Starting React frontend...
start "Frontend" cmd /k "cd /d "%FRONTEND_DIR%" && npm start"

rem Ожидание запуска серверов и открытие в браузере
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