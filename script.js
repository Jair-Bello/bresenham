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

clearCanvas();
drawGrid();
drawScale();