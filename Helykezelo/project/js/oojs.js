class Shape {
    constructor(x, y, color = "black") {
        this.x = x;
        this.y = y;
        this.color = color;
    }
    draw(ctx) {}
}

class Circle extends Shape {
    constructor(x, y, radius = 30, color = "red") {
        super(x, y, color);
        this.radius = radius;
    }
    draw(ctx) {
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
    }
}

class Square extends Shape {
    constructor(x, y, size = 50, color = "green") {
        super(x, y, color);
        this.size = size;
    }
    draw(ctx) {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x - this.size/2, this.y - this.size/2, this.size, this.size);
    }
}

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let shapes = [];
let currentShape = "circle";
let currentSize = 40;

document.getElementById("circleBtn").onclick = () => currentShape = "circle";
document.getElementById("squareBtn").onclick = () => currentShape = "square";

document.getElementById("sizeInput").oninput = (e) => {
    currentSize = parseInt(e.target.value);
};

document.getElementById("resetBtn").onclick = () => {
    shapes = [];
    drawAll();
};

canvas.addEventListener("click", (e) => {
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    let shape;

    if (currentShape === "circle") {
        shape = new Circle(x, y, currentSize);
    } else {
        shape = new Square(x, y, currentSize);
    }

    shapes.push(shape);
    drawAll();
});

function drawAll() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    shapes.forEach(s => s.draw(ctx));
}

drawAll();
