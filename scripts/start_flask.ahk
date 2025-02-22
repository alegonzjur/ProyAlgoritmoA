SetWorkingDir "C:\Users\Alex\Desktop\Projects\ProyAlgoritmoA"  ; Cambia al directorio del proyecto
Run "cmd /k python app.py", , "Hide"  ; Ejecuta Flask en segundo plano
Sleep 3000  ; Espera 3 segundos para que Flask inicie
Run "http://localhost:5000"  ; Abre el navegador en localhost

; Espera a que se cierre el navegador (ajusta según tu navegador)
ProcessWaitClose "chrome.exe"  ; Usa 'firefox.exe' o 'msedge.exe' si es otro navegador

; Cierra Flask y el terminal una vez que el usuario cierre el navegador
Run "taskkill /IM python.exe /F"

