Este fichero registrará el avance del proyecto en cada día. El proyecto debe cumplir los siguientes objetivos mínimos:
- Se debe generar un mapa en forma de cuadrícula, cuyas porciones representarán las áreas de una ciudad.
- Un token/figura/símbolo representará un automóvil, el cual debe ser capaz de ir desde el área de origen 0 hasta cualquier otro área del mapa.
- Se deben establecer zonas por las que poder transitar (callez o áreas) y zonas bloqueadas (edificios o calles cortadas).
- El programa debe ejecutarse de forma interactiva, pidiendo al usuario la posición de salida y meta. Además las casillas transitables y bloqueadas también deben poder ser configuradas.
- El programa debe ser capaz de realizar rutas en forma de zig-zag y no solo yendo a las esquinas o extremos de la cuadrícula.
- Los resultados deben ser representados en forma de ruta visible en la imagen o cuadrícula resultante.

# --- 03/02/2025--- #
Planificación del proyecto. 
El primer objetivo del proyecto será crear una interfaz web que permita al usuario interactuar visualmente con el proyecto. Para la códificación del backend de esta interfaz, 
utilizaremos Flask, una librería de Python que facilita la creación de interfaces web. 
El frontend de esta página web se realizará mediante HTML y CSS.
El IDE utilizado para codificar será Visual Studio Code. P

Se comienza por crear la estructura inicial del proyecto. 

/ProyAlgoritmoA

   ├── app.py              # Backend con Flask y lógica del A*

   ├── templates/

   │    └── index.html     # Interfaz gráfica

   └── static/

        └── styles.css     # Estilos CSS

    ├── data               # Guarda archivos y datos para el modulo.

    ├── doc                # Documentación del proyecto.


# --- 04/02/2025 --- #
Comienza la codificación del backend de Flask. Instalamos flask y jsonify, en el terminal de VSCode. Jsonify convierte objetos de Java en cadenas de caracteres JSON.
Tras terminar el primer prototipo del backend, se procede a codificar el archivo HTML que funcionará como frontend, exponiendo la información del backend. 
Además, se utilizará CSS para animar el algoritmo, sin decorar inicialmente la interfaz (se realizará posteriormente).

La ejecución del programa inicialmente se realiza a través del CMD. Nos dirigimos al directorio del proyecto, y ejecutamos el archivo Python app.py con python. 
Una vez efectuado, nos dirijimos al navegador, concretamente a "localhost:5000". A partir de ahí, podremos interactuar con el prototipo. 
La primera ejecución ha producido un error al calcular la ruta.
EL error ha sido identificado y corregido. Resulta que el frontend no estaba enviando correctamente la ubicación de las rutas al backend. Una vez corregido, el prototipo funciona correctamente.
No se ha provisto de un botón que reinicie el algoritmo, más allá de recargar la página. El siguiente objetivo será este.

Tras modificar el backend y el frontend, se ha añadido correctamente un botón de reinicio para el algoritmo. Además, se han asignado estilos concretos con CSS para los botones.
Las siguientes funcionalidades que se añadirán serán un mensaje de confirmación del reinicio del algoritmo, animaciones de borrado y un historial. Para ello, se utilizarán JavaScript.
Anteriormente, se ejecutaban los scripts en el HTML debido a que eran bastante sencillos, por ello ahora añadiremos esa configuración a un archivo JavaScript llamado "scripts.js".

La estructura del proyecto pasa a ser: 
/ProyAlgoritmoA

   ├── app.py

   ├── templates/

   │    
   
        └── index.html

   └── static/

        ├── styles.css

        └── scripts.js # Nuevo archivo para JavaScript

    ├── doc 

    ├── data  

Tras la aplicación de los scripts, se ha comprobado el funcionamiento de las nuevas funcionalidades. El botón de deshacer acción funciona, el de rehacer también, pero ahora no se muestra la ruta. 
Se investigará el error.

# --- 10/02/2025 --- #
El error provenía de un fallo de escritura en una funcion de los scripts de javascript. Proseguimos añadiendo estilos CSS a la interfaz.

# --- 11/02/2025 --- #
Procedemos a crear un script que instale las dependencias en el PC para su uso. Se ha llevado a cabo correctamente. No se ha podido comprobar el funcionamiento en un entorno en el que no se tiene Python instalado. El último objetivo es crear un script que abra la aplicación automáticamente, sin necesidad de acceder al PowerShell y ejecutar "python app.py". 
El script se ha codificado correctamente. La ventana de PowerShell y el servidor de Flask se cierra automáticamente cuando cierras la ventana del navegador en la que se ejecuta la app.

La estructura final del proyecto es:

   ├── app.py

   ├── templates/

   │    
   
        └── index.html

   └── static/

        ├── styles.css

        └── scripts.js 

    ├── doc 

    ├── data  

    ├── instalar_dependencias.bat # Script que detecta dependencias.

    ├── RutasA.bat # Script que ejecuta la aplicación.

# --- 15/02/2025 --- #
Se crea la documentación del proyecto, explicando el funcionamiento y distribución de los archivos.
