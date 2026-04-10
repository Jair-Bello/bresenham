console.log("Proyecto inicializado");
console.log("Formulario agregado");
console.log("Canvas inicializado");

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const tablesContainer = document.getElementById("tablesContainer");

let gridSize = 20;

//Limpia completamente el canvas.
function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

// funcion para calcular la escala basada en los números ingresados
function calculateScale(x0, y0, x1, y1) {
    // se busca el valor más alto para que quepa en los 600px del canvas
    const maxVal = Math.max(x0, y0, x1, y1, 20); 
    gridSize = canvas.width / (maxVal + 2); 
}

//Dibuja la cuadrícula base del canvas.
function drawGrid(xMax, yMax) {
      ctx.strokeStyle = "#e2e2e2"; // Color gris claro
    for (let x = 0; x <= (xMax + 2) * gridSize; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
    }

    for (let y = 0; y <= (yMax + 2) * gridSize; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
    }
}

//Dibuja numeración de escala en ejes.
function drawScale(xMax, yMax) {
    ctx.fillStyle = "black";
    // Ajuste dinámico del tamaño de fuente
    ctx.font = Math.max(8, gridSize * 0.4) + "px Arial";
    
    let saltar = gridSize < 10 ? 5 : 1; 

    for (let i = 0; i <= xMax + 1; i += saltar) {
        ctx.fillText(i, i * gridSize + 2, canvas.height - 2);
    }
    for (let i = 0; i <= yMax + 1; i += saltar) {
        ctx.fillText(i, 2, canvas.height - i * gridSize - 2);
    }
}

/**Dibuja un píxel lógico dentro de la cuadrícula.
 * @param {number} x Coordenada X.
 * @param {number} y Coordenada Y.
 */
function plot(x, y) {
    ctx.fillStyle = "red";
    ctx.fillRect(x * gridSize, canvas.height - (y + 1) * gridSize, gridSize, gridSize);
}

// Crea una nueva tabla pequeña (cada 20 pasos)
function createNewTable() {
    const table = document.createElement("table");
    table.setAttribute("border", "1");
    table.innerHTML = `<thead><tr><th>Paso</th><th>X</th><th>Y</th></tr></thead><tbody></tbody>`;
    tablesContainer.appendChild(table);
    return table.querySelector("tbody");
}

//Implementación del algoritmo de Bresenham.
function bresenham(x0, y0, x1, y1) {
    calculateScale(x0, y0, x1, y1);
    clearCanvas();
    
    let maxX = Math.max(x0, x1);
    let maxY = Math.max(y0, y1);
    
    drawGrid(maxX, maxY);
    drawScale(maxX, maxY);

    let dx = Math.abs(x1 - x0);
    let dy = Math.abs(y1 - y0);
    let sx = (x0 < x1) ? 1 : -1;
    let sy = (y0 < y1) ? 1 : -1;
    let err = dx - dy;

    tablesContainer.innerHTML = ""; // Limpia las tablas anteriores
    let currentTbody = createNewTable();
    let paso = 0;

    while (true) {
        plot(x0, y0);

        // Si llegamos a 20 filas, creamos otra tabla a la derecha
        if (paso > 0 && paso % 20 === 0) {
            currentTbody = createNewTable();
        }

        currentTbody.innerHTML += `<tr><td>${paso}</td><td>${x0}</td><td>${y0}</td></tr>`;

        if (x0 === x1 && y0 === y1) break;
        let e2 = 2 * err;
        if (e2 > -dy) { err -= dy; x0 += sx; }
        if (e2 < dx) { err += dx; y0 += sy; }
        paso++;
    }
}

//Evento del botón para dibujar la línea.
document.getElementById("drawBtn").addEventListener("click", () => {

    const x0 = parseInt(document.getElementById("x0").value);
    const y0 = parseInt(document.getElementById("y0").value);
    const x1 = parseInt(document.getElementById("x1").value);
    const y1 = parseInt(document.getElementById("y1").value);

    // Verificamos que no falten números
    if (isNaN(x0) || isNaN(y0) || isNaN(x1) || isNaN(y1)) {
        alert("Por favor, ingresa todas las coordenadas.");
        return;
    }

    bresenham(x0, y0, x1, y1);
});

// FUNCIÓN INICIAL: Esto hace que el canvas empiece vacío
function init() {
    clearCanvas();
    gridSize = 20; 
    drawGrid(28, 28); 
    drawScale(28, 28); 
}

// Llamamos a la función de inicio al cargar el archivo
init();