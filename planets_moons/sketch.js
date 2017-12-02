let padding = 0;
const WHITE = 240;

function preload() {
	planets = loadJSON("planets.json");
}

function setup() {
	padding = windowWidth / 13 - 3;
	createCanvas(windowWidth, 1300);
}

function draw() {
	background(20);
	translate(70, 400);
	for (let [i, p] of planets.planets.entries()) {
		drawPlanet(p, i);
		drawLabel(p, i);
	}
	fill(WHITE);
	textFont("Rajdhani", 36);
	textAlign(CENTER);
	text("The planets & moons of the Solar System", windowWidth / 2 - 70, -280);

	if (mouseY > 300) {
		pos = Math.max(Math.round(mouseX / (windowWidth / 13 - 3)) - 1, 0);
		textSize(10);
		noStroke();
		for (let [j, moon] of planets.planets[pos].moons.entries()) {
			if (j % 2) {
				textAlign(LEFT);
				text(moon, pos * padding + 10, 68 + j * 8);
			} else {
				textAlign(RIGHT);
				text(moon, pos * padding - 10, 68 + j * 8);
			}
		}
	}
}

function drawLabel(planet, position) {
	textFont("Rajdhani", 12);
	textAlign(CENTER);
	fill(WHITE);
	text(planet.name, position * padding, 40);
}

function drawPlanet(planet, position) {
	fill(150 + 40 * (position % 3));
	noStroke();
	let r = Math.max(Math.round(planet.diameter / 12742) * 20, 2);
	ellipse(position * padding, 10 - r / 2, r, r);

	for (let [i, moon] of planet.moons.entries()) {
		stroke(WHITE);
		if (i % 10 === 0 && i > 0) {
			ellipse(position * padding + 0.5, i * 8 + 65.5, 2, 2);
		} else {
			point(position * padding, i * 8 + 65);
		}
	}
}
