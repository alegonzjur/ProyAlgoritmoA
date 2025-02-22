MsgBox "🚀 Configurando el entorno para Rutas A*..."

; Verificar si Python está instalado
if !ProcessExist("python.exe") {
    MsgBox "❌ Python no encontrado. Instalando Python..."
    RunWait "ProyAlgoritmoA\data\python-3.13.0-amd64.exe /quiet InstallAllUsers=1 PrependPath=1",, "Hide"
    MsgBox "✅ Python instalado correctamente."
} else {
    MsgBox "✅ Python ya está instalado."
}

; Verificar si Flask está instalado
if !FileExist(A_AppData "\Python\Scripts\pip.exe") {
    MsgBox "❌ Pip no encontrado. Instalando Flask..."
    RunWait "python -m pip install Flask",, "Hide"
    MsgBox "✅ Flask instalado correctamente."
} else {
    MsgBox "✅ Flask ya está instalado."
}

MsgBox "🎉 Configuración completada! Para ejecutar la aplicación: python app.py"
