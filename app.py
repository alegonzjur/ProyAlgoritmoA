# Modulo de configuración de la aplicación.

# --- Importación de librerias a usar. --- #
from flask import Flask, render_template, request, jsonify
import heapq

# --- Creación de la aplicación --- #
app = Flask(__name__)

# --- Establecemos las variables globales que almacenarán el estado del mapa. --- #
mapa = []
inicio = None
meta = None
filas = 10
columnas = 10

# --- Establecemos el algoritmo A* --- #
def a_estrella(mapa, inicio, meta):
    filas = len(mapa)
    columnas = len(mapa[0]) if filas > 0 else 0
    
    movimientos = [(-1,0), (1,0), (0,-1), (0,1),
                   (-1,-1), (-1,1), (1,-1), (1,1)]
    
    heap = []
    heapq.heappush(heap, (0, inicio[0], inicio[1]))
    
    procedencia = {}
    coste_g = {inicio: 0}
    cerrados = set()
    
    while heap:
        actual_f, x_act, y_act = heapq.heappop(heap)
        actual = (x_act, y_act)
        
        if actual == meta:
            camino = []
            while actual in procedencia:
                camino.append(actual)
                actual = procedencia[actual]
            camino.append(inicio)
            camino.reverse()
            return camino
        
        if actual in cerrados:
            continue
        cerrados.add(actual)
        
        for dx, dy in movimientos:
            nx, ny = x_act + dx, y_act + dy
            vecino = (nx, ny)
            
            if 0 <= nx < filas and 0 <= ny < columnas:
                if mapa[nx][ny] == 1:
                    continue
                
                nuevo_g = coste_g.get(actual, float('inf')) + 1
                
                if nuevo_g < coste_g.get(vecino, float('inf')):
                    procedencia[vecino] = actual
                    coste_g[vecino] = nuevo_g
                    h = max(abs(nx - meta[0]), abs(ny - meta[1]))
                    f = nuevo_g + h
                    heapq.heappush(heap, (f, nx, ny))
    
    return None

# --- Establecemos las rutas de Flask --- #

# --- Ruta de la página principal --- #
@app.route('/')
def index():
    return render_template('index.html', filas=filas, columnas=columnas)

# --- Ruta para los scripts --- #
@app.route('/scripts.js')
def serve_js():
    return render_template('scripts.js', filas=10, columnas=10), 200, {'Content-Type': 'text/javascript'}

# --- Ruta de la página de configuración --- #
@app.route('/configurar', methods=['POST'])
def configurar():
    global mapa, inicio, meta, filas, columnas
    data = request.json 
    # Procesamos configuración desde el frontend.
    filas = data['filas']
    columnas = data['columnas']
    inicio = tuple(data['inicio'])
    meta = tuple(data['meta'])
    mapa = data['mapa']
    return jsonify({"status": "ok"})

# --- Ruta para calcular rutas. --- #
@app.route('/calcular_ruta')
def calcular_ruta():
    global mapa, inicio, meta
    
    # Validar datos esenciales
    if inicio is None or meta is None:
        return jsonify({"error": "Falta configurar inicio o meta"}), 400
    
    if not mapa:
        return jsonify({"error": "El mapa no está configurado"}), 400
    
    camino = a_estrella(mapa, inicio, meta)
    return jsonify({"camino": camino})

# --- Ruta para resetear el algoritmo. --- #
@app.route('/reset', methods=['POST'])
def reset():
    global mapa, inicio, meta, filas, columnas
    mapa = []
    inicio = None
    meta = None
    # Opcional: Mantener el mismo tamaño de cuadrícula
    # mapa = crear_mapa(filas, columnas)  # Si tienes esta función
    return jsonify({"status": "reset exitoso"})

# --- Ruta para obtener el estado del algoritmo. --- #
@app.route('/get_estado')
def get_estado():
    return jsonify({
        "mapa": mapa,
        "inicio": inicio,
        "meta": meta
    })
# --- Ejecución de la aplicación. ---
if __name__ == '__main__':
    app.run(debug=True)