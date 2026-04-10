console.log("Proyecto inicializado");
console.log("Formulario agregado");
console.log("Canvas inicializado");

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const gridSize = 20;

//Limpia completamente el canvas.
function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

//Dibuja la cuadrícula base del canvas.
function drawGrid() {
    for (let x = 0; x <= canvas.width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
    }

    for (let y = 0; y <= canvas.height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
    }
}

//Dibuja numeración de escala en ejes.
function drawScale() {
    ctx.font = "10px Arial";

    for (let i = 0; i <= canvas.width / gridSize; i++) {
        ctx.fillText(i, i * gridSize + 5, canvas.height - 5);
    }

    for (let i = 0; i <= canvas.height / gridSize; i++) {
        ctx.fillText(i, 5, canvas.height - i * gridSize - 5);
    }
}

/**Dibuja un píxel lógico dentro de la cuadrícula.
 * @param {number} x Coordenada X.
 * @param {number} y Coordenada Y.
 */
function plot(x, y) {
    ctx.fillStyle = "red";

    ctx.fillRect(
        x * gridSize,
        canvas.height - (y + 1) * gridSize,
        gridSize,
        gridSize
    );
}

//Implementación del algoritmo de Bresenham.
function bresenham(x0, y0, x1, y1, plot) {
    let dx = Math.abs(x1 - x0);
    let dy = Math.abs(y1 - y0);
    let sx = (x0 < x1) ? 1 : -1;
    let sy = (y0 < y1) ? 1 : -1;
    let err = dx - dy;

    const tbody = document.querySelector("#stepsTable tbody");
    tbody.innerHTML = "";

    let paso = 0;

    while (true) {
        plot(x0, y0);

        let e2 = 2 * err;

        tbody.innerHTML += `
            <tr>
                <td>${paso}</td>
                <td>${x0}</td>
                <td>${y0}</td>
            </tr>
        `;

        paso++;

        if (x0 === x1 && y0 === y1) break;

        if (e2 > -dy) {
            err -= dy;
            x0 += sx;
        }

        if (e2 < dx) {
            err += dx;
            y0 += sy;
        }
    }
}

//Evento del botón para dibujar la línea.
document.getElementById("drawBtn").addEventListener("click", () => {

    const x0 = parseInt(document.getElementById("x0").value);
    const y0 = parseInt(document.getElementById("y0").value);
    const x1 = parseInt(document.getElementById("x1").value);
    const y1 = parseInt(document.getElementById("y1").value);

    //Se validan campos vacíos o incorrectos antes de dibujar.
    if (
        isNaN(x0) ||
        isNaN(y0) ||
        isNaN(x1) ||
        isNaN(y1)
    ) {
        alert("Ingrese todas las coordenadas correctamente.");
        return;
    }

    clearCanvas();
    drawGrid();
    drawScale();

    bresenham(x0, y0, x1, y1, plot);
});

clearCanvas();
drawGrid();
drawScale();