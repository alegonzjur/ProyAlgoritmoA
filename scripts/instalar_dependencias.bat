@echo off
echo 🚀 Configurando el entorno para Rutas A*...

REM Verificar si Python esta instalado
python --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Python no encontrado. Instalando Python...
    start /wait ProyAlgoritmoA\data\python-3.13.0-amd64.exe /quiet InstallAllUsers=1 PrependPath=1
    echo ✅ Python instalado correctamente.
) else (
    echo ✅ Python ya esta instalado.
)

REM Verificar si Flask esta instalado
pip show Flask >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Flask no encontrado. Instalando Flask...
    pip install Flask
    echo ✅ Flask instalado correctamente.
) else (
    echo ✅ Flask ya esta instalado.
)

echo 🎉 Configuracion completada!
echo Para ejecutar la aplicacion:
echo python app.py
pause