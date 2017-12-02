const boxes = [];
const boxSize = 50;
const movementScale = 80;

function setup() {
	createCanvas(windowWidth, windowHeight + 20, WEBGL);
	for (let i of Array(5).keys()) {
		for (let j of Array(10).keys()) {
			boxes.push({
				x: i * boxSize,
				y: j * boxSize,
				height: random(12) * 25 + 200
			});
		}
	}
}

function draw() {
	background(10);
	translate(-100, -200, -100);
	ambientLight(100, 100, 100);
    directionalLight(226, 226, 226, 0.5, 0.5, 0.25);
	for (b of boxes) {
		push();
		translate(b.x, b.y, b.height / 2);
		box(boxSize, boxSize, b.height);
		pop();
	}
	camera(
		0 - xPos * movementScale, 0 + yPos * movementScale, 1000,
		0, 0, 0,
		0, 1, 0
	);
}
