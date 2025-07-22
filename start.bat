@echo off
setlocal

rem checking modules
if not exist "%~dp0frontend/node_modules" (
    start "NodeModulesInstall" cmd /k "cd /d %~dp0frontend && npm i"
)

if not exist "%~dp0backend/venv" (
    start "PythonModulesInstall" cmd /k "cd /d %~dp0backend && python -m venv venv && venv\Scripts\activate && pip install -r requirements.txt"
)

rem starting backend
start "Backend" cmd /k "cd /d %~dp0backend && venv\Scripts\activate && python manage.py runserver && exit"

rem starting frontend
start "Frontend" cmd /k "cd /d %~dp0frontend && npm start && exit"

rem opening API page
timeout /t 5 >nul
start "" "http://127.0.0.1:8000/"

exit