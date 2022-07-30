/** @type {HTMLCanvasElement} */
// above: tell the browser that this is a canvas project => we get intellisense

const canvas = document.querySelector("#canvas1");
const ctx = canvas.getContext("2d");

// set canvas size
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// global variables
let drawing = false;

ctx.fillStyle = "#FFD369";
// create shadow
ctx.shadowOffsetX = 0;
ctx.shadowOffsetY = 10;
ctx.shadowBlur = 20;
ctx.shadowColor = "rgba(0,0,0,0.25)";

class Root {
	constructor(x, y) {
		// initial growth point = maouse current coordinates
		this.x = x;
		this.y = y;
		// to grow random directions
		this.speedX = Math.random() * 4 - 2;
		this.speedY = Math.random() * 4 - 2;
		// setting max and initial size of growing object
		this.maxSize = Math.random() * 7 + 20;
		this.size = Math.random() * 1 + 2;
		// velocity of size -> for different growth speed for each element
		this.vs = Math.random() * 0.2 + 0.5;
		// for curved paths
		this.angleX = Math.random() * 6.2;
		this.angleY = Math.random() * 6.2;
		// velocity of angle
		this.vaX = Math.random() * 0.6 + 0.3;
		this.vaY = Math.random() * 0.6 + 0.3;
		// angle to start grow
		this.angle = 0;
		this.va = Math.random() * 0.02 + 0.05;
	}
	update() {
		// create random vector
		// horizontal axis
		this.x += this.speedX + Math.sin(this.angleX);
		// vertical axis
		this.y += this.speedY + Math.sin(this.angleY);

		// growing details
		this.size += this.vs;
		this.angleX += this.vaX;
		this.angleY += this.vaY;
		this.angle += this.va;

		if (this.size < this.maxSize) {
			// draw element
			ctx.save();

			ctx.translate(this.x, this.y);
			ctx.rotate(this.angle);
			// create rectangle
			ctx.fillRect(0 - this.size / 2, 0 - this.size / 2, this.size, this.size);
			// double sized outline
			let double = this.size * 2;
			ctx.lineWidth = 0.5;
			ctx.strokeStyle = "#FF6363";
			ctx.strokeRect(0 - double / 2, 0 - double / 2, double, double);
			// triple sized outline
			let triple = this.size * 3;
			ctx.lineWidth = 0.25;
			ctx.strokeStyle = "#00FFF5";
			ctx.strokeRect(0 - triple / 2, 0 - triple / 2, triple, triple);
			// we bind the "this" keyword, so javascript remembers that "this" is refers to the root object
			requestAnimationFrame(this.update.bind(this));
			ctx.restore();
		}
	}
}

// start drawing on mouse movement if you hold down the mouse button
window.addEventListener("mousemove", e => {
	if (drawing) {
		const root = new Root(e.x, e.y);
		root.update();
	}
});
// draw if you clicked
window.addEventListener("mousedown", e => {
	drawing = true;
	for (let i = 0; i < 5; i++) {
		const root = new Root(e.x, e.y);
		root.update();
	}
});
// stop drawing if you stop pressing the mouse button
window.addEventListener("mouseup", e => {
	drawing = false;
});
