@echo off
cd /d "%~dp0"
start cmd /k "python app.py"
timeout /t 3 >nul
start /wait http://localhost:5000
taskkill /IM python.exe /F
taskkill /IM cmd.exe /F
