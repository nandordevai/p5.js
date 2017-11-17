let i = 0;

function setup() {
	createCanvas(windowWidth, windowHeight);
}

function draw() {
	const skyTranslate = -100;
	const startFill = 30;

	background(0);

	noFill();
	translate(0, -height / 10)
	for (let x = 0; x < width; x += 20) {
		if (random(10) > 9) {
			stroke(random(100) + 150);
		} else {
			stroke(255);
		}
		point(x, noise(x) * 400);
		
	}

	noStroke();

	translate(i / 4, height / 5);
	beginShape();
	fill(startFill);
	vertex(0, height);
	for (let x = 0; x < width; x++) {
		vertex(x - i / 4, noise((x - i / 4) * 0.01 + 2000) * 300);
	}
	vertex(width - i, height);
	endShape();

	translate(i / 2, height / 6);
	beginShape();
	fill(startFill * 2);
	vertex(0, height);
	for (let x = 0; x < width; x++) {
		vertex(x - i * 0.75, noise((x - i * 0.75) * 0.006 + 1000) * 400);
	}
	vertex(width - i, height);
	endShape();

	translate(i / 4, height / 5);
	beginShape();
	fill(startFill * 4);
	vertex(0, height);
	for (let x = 0; x < width; x++) {
		vertex(x - i, noise((x - i) * 0.004) * 500);
	}
	vertex(width - i, height);
	endShape();
	i -= 2;
}
