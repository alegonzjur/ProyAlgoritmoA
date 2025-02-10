let modo = 'start';
let mapa = Array({{filas}}).fill().map(() => Array({{columnas}}).fill(0));
let inicio = null;
let meta = null;
let historial = [];
let currentStep = -1;

// ========== MANEJO DE EVENTOS ==========
function setStart() { 
    modo = 'start'; 
    document.querySelectorAll('button').forEach(btn => btn.classList.remove('active'));
    document.querySelector('[onclick="setStart()"]').classList.add('active');
}

function setEnd() { 
    modo = 'end'; 
    document.querySelectorAll('button').forEach(btn => btn.classList.remove('active'));
    document.querySelector('[onclick="setEnd()"]').classList.add('active');
}

function setBlocked() { 
    modo = 'blocked'; 
    document.querySelectorAll('button').forEach(btn => btn.classList.remove('active'));
    document.querySelector('[onclick="setBlocked()"]').classList.add('active');
}

function handleClick(x, y) {
    guardarEnHistorial();
    const cell = document.getElementById(`cell-${x}-${y}`);
    
    switch(modo) {
        case 'start':
            if (inicio) document.getElementById(`cell-${inicio[0]}-${inicio[1]}`).classList.remove('start');
            inicio = [x, y];
            cell.classList.add('start');
            break;
            
        case 'end':
            if (meta) document.getElementById(`cell-${meta[0]}-${meta[1]}`).classList.remove('end');
            meta = [x, y];
            cell.classList.add('end');
            break;
            
        case 'blocked':
            mapa[x][y] = mapa[x][y] === 1 ? 0 : 1;
            cell.classList.toggle('blocked');
            break;
    }
    actualizarBotonesHistorial();
}

// ========== ALGORITMO Y COMUNICACIÓN ==========
async function calcularRuta() {
    try {
        // Enviar configuración al backend
        await fetch('/configurar', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                filas: {{ filas }},
                columnas: {{ columnas }},
                inicio: inicio,
                meta: meta,
                mapa: mapa
            })
        });

        // Obtener ruta
        const response = await fetch('/calcular_ruta');
        const data = await response.json();
        
        // Limpiar ruta anterior
        document.querySelectorAll('.path').forEach(cell => cell.classList.remove('path'));
        
        // Mostrar nueva ruta con animación
        if (data.camino) {
            data.camino.forEach(([x, y], index) => {
                setTimeout(() => {
                    const cell = document.getElementById(`cell-${x}-${y}`);
                    cell.classList.add('path');
                }, index * 50);
            });
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

// ========== HISTORIAL ==========
function guardarEnHistorial() {
    historial = historial.slice(0, currentStep + 1);
    historial.push({
        mapa: JSON.parse(JSON.stringify(mapa)),
        inicio: inicio ? [...inicio] : null,
        meta: meta ? [...meta] : null
    });
    currentStep++;
    actualizarBotonesHistorial();
}

function deshacer() {
    if (currentStep <= 0) return;
    currentStep--;
    cargarEstado(historial[currentStep]);
}

function rehacer() {
    if (currentStep >= historial.length - 1) return;
    currentStep++;
    cargarEstado(historial[currentStep]);
}

function cargarEstado(estado) {
    mapa = estado.mapa;
    inicio = estado.inicio;
    meta = estado.meta;
    
    document.querySelectorAll('.cell').forEach((cell, index) => {
        const x = Math.floor(index / {{ columnas }});
        const y = index % {{ columnas }};
        
        cell.className = 'cell';
        if (inicio && x === inicio[0] && y === inicio[1]) cell.classList.add('start');
        if (meta && x === meta[0] && y === meta[1]) cell.classList.add('end');
        if (mapa[x][y] === 1) cell.classList.add('blocked');
    });
    actualizarBotonesHistorial();
}

function actualizarBotonesHistorial() {
    document.getElementById('undoBtn').disabled = currentStep <= 0;
    document.getElementById('redoBtn').disabled = currentStep >= historial.length - 1;
}

// ========== REINICIO ==========
async function resetMapa() {
    if (!confirm('¿Estás seguro de querer reiniciar el mapa?')) return;
    
    // Animación de limpieza
    document.querySelectorAll('.cell').forEach((cell, index) => {
        setTimeout(() => {
            cell.classList.add('clearing');
            setTimeout(() => cell.classList.remove('clearing'), 500);
        }, index * 5);
    });
    
    // Resetear backend
    await fetch('/reset', { method: 'POST' });
    
    // Resetear frontend
    mapa = Array({{filas}}).fill().map(() => Array({{columnas}}).fill(0));
    inicio = null;
    meta = null;
    historial = [];
    currentStep = -1;
    
    document.querySelectorAll('.cell').forEach(cell => {
        cell.classList.remove('start', 'end', 'blocked', 'path');
    });
    actualizarBotonesHistorial();
}

// Inicialización
document.addEventListener('DOMContentLoaded', () => {
    actualizarBotonesHistorial();
    setStart(); // Modo inicial
});