var planets;
const padding = 95;

function preload() {
	p_data = loadJSON("planets.json");
}

function setup() {
	createCanvas(windowWidth, windowHeight);
	background(0);
}

function draw() {
	translate(70, 50);
	noLoop();
	for (let [i, p] of p_data.planets.entries()) {
		p.position = i + 1;
	}
	let planets = p_data.planets;
	planets.sort((a, b) => a.diameter < b.diameter ? 1 : (a. diameter > b.diameter ? -1 : 0));
	console.log(planets);

	for (p of planets) {
		drawPlanet(p);
		drawLabel(p);
	}
}

function drawLabel(p) {
	textAlign(CENTER);
	fill(255);
	text(p.name, (p.position - 1) * padding, 30);
}

function drawPlanet(p) {
	let i = p.position - 1;
	fill(100 + 50 * (i % 2));
	noStroke();
	let r = Math.max(Math.round(p.diameter / 12756 * 8), 2);
	ellipse(i * padding, 10 - r / 2, r, r);
	for (let [j, m] of p.moons.entries()) {
		stroke(200);
		if (j % 10 === 0 && j > 0) {
			ellipse(i * padding + 0.5, j * 8 + 45.5, 2, 2);
		} else {
			point(i * padding, j * 8 + 45);
		}
	}
}
