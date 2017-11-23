const PADDING_RIGHT = 30;
const WIDTH = 30;
const earthquakes = [
	{
		"location": "Mariana Islands",
		"magnitude": 4.4,
		"color": "#66c",
		"depth": 10,
		"year": 2010
	},
	{
		"location": "Indonesia",
		"magnitude": 6.1,
		"color": "#c66",
		"depth": 12,
		"year": 2013
	},
	{
		"location": "Chile",
		"magnitude": 8.3,
		"color": "#6c6",
		"depth": 22,
		"year": 2015
	}
];

function setup() {
	createCanvas(windowWidth - 100, windowHeight * 2);
	// background(200, 200, 200);
	noLoop();
}

function draw() {
	// title
	fill(0);
	textSize(30);
	textAlign(CENTER);
	text("Earthquake data visualisations", 600, 50);

	drawBar();
	drawPlot();
	drawHouses();
	drawScatter();
	drawTimeline();
}

function drawTimeline() {
	translate(-600, 260);
	const X_SCALE = 60;
	const M_SCALE = 20;
	const D_SCALE = 5;
	const BAR_WIDTH = 20;
	const yearMin = earthquakes.map(e => e.year).reduce((a, b) => Math.min(a, b));
	const yearMax = earthquakes.map(e => e.year).reduce((a, b) => Math.max(a, b));
	const scaleWidth = yearMax - yearMin + 3;
	const scaleHeight = 10;

	translate(50, 100);

	textSize(10);
    // magnitude scale
	for (let i = 2; i < 10; i+=2) {
		stroke(240);
		line(
			0,
			M_SCALE * i,
			X_SCALE * scaleWidth,
			M_SCALE * i
		);
		noStroke();
		fill(150);
		text(i, X_SCALE * scaleWidth + 13, M_SCALE * (scaleHeight - i) + 4);
	}
	fill(0);
	textAlign(LEFT);
	text("magnitude", X_SCALE * (scaleWidth + 0.75), M_SCALE * scaleHeight / 2);

    // depth scale
	for (let i of [10, 20]) {
		console.log(i);
		stroke(240);
		line(
			0,
			M_SCALE * scaleHeight + i * D_SCALE,
			X_SCALE * scaleWidth,
			M_SCALE * scaleHeight + i * D_SCALE
		);
		noStroke();
		fill(150);
		text(
			i,
			X_SCALE * scaleWidth + 5,
			M_SCALE * scaleHeight + i * D_SCALE + 4
		);
	}
	fill(0);
	textAlign(LEFT);
	text("focal\ndepth\n(km)", X_SCALE * (scaleWidth + 0.75), M_SCALE * scaleHeight + D_SCALE * 13);

    // magnitude & depth
	rectMode(CORNERS);
	for (let e of earthquakes) {
		noFill();
		stroke(color(e.color));
		rect(
			(e.year - yearMin + 1) * X_SCALE - BAR_WIDTH / 2,
			M_SCALE * scaleHeight,
			(e.year - yearMin + 1) * X_SCALE + BAR_WIDTH / 2,
			M_SCALE * scaleHeight - e.magnitude * M_SCALE
		);
		line(
			(e.year - yearMin + 1) * X_SCALE,
			M_SCALE * scaleHeight,
			(e.year - yearMin + 1) * X_SCALE,
			M_SCALE * scaleHeight + e.depth * D_SCALE
		);
		fill(color(e.color));
		ellipse(
			(e.year - yearMin + 1) * X_SCALE,
			M_SCALE * scaleHeight + e.depth * D_SCALE,
			8, 8);
	}

	// timeline
	stroke(0);
	line(
		0,
		M_SCALE * scaleHeight,
		X_SCALE * (scaleWidth + 0.75),
		M_SCALE * scaleHeight
	);
	for (var i = 1; i < scaleWidth; i++) {
		line(i * X_SCALE, M_SCALE * scaleHeight - 3, i * X_SCALE, M_SCALE * scaleHeight + 3);
	}
    // labels
	for (var i = yearMin; i <= yearMax; i+=5) {
		stroke(0);
		noStroke();
		fill(255);
		rect(
			(i - yearMin + 1) * X_SCALE - textWidth(i) / 2 - 10,
			M_SCALE * scaleHeight + 15 - textAscent(i) - 3,
			(i - yearMin + 1) * X_SCALE + textWidth(i) / 2 + 10,
			M_SCALE * scaleHeight + 15 + textDescent(i) + 3
			// 0,
			// M_SCALE * scaleHeight + 3,
			// X_SCALE * (scaleWidth + 0.75),
			// M_SCALE * scaleHeight + 20
		);
		fill(0);
		textAlign(CENTER);
		text(i, (i - yearMin + 1) * X_SCALE, M_SCALE * scaleHeight + 15);
	}
}

function drawScatter() {
	const X_SCALE = 40;
	const Y_SCALE = 10;

    // magnitude scale
	translate(500, -100);
	stroke(0);
	fill(0);
	line(
		-10,
		0,
		10 * X_SCALE,
		0
	);
	textSize(10);
	for (let i = 2; i <= 8; i += 2) {
		let markerX = i * X_SCALE;
		stroke(0);
		line(markerX, -3, markerX, 3);
		noStroke();
		text(i, markerX - 2, -10);
	}
	stroke(0);
	line(10 * X_SCALE - 3, -3, 10 * X_SCALE, 0);
	line(10 * X_SCALE - 3, 3, 10 * X_SCALE, 0);
	noStroke();
	text("magnitude", 10 * X_SCALE, -10);

    // depth scale
	stroke(0);
	line(
		0,
		-10,
		0,
		30 * Y_SCALE
	);
	line(-3, 30 * Y_SCALE -3, 0, 30 * Y_SCALE);
	line(3, 30 * Y_SCALE -3, 0, 30 * Y_SCALE);
	for (let i = 10; i <= 20; i += 10) {
		let markerY = i * Y_SCALE;
		stroke(0);
		line(-3, markerY, 3, markerY);
		noStroke();
		text(i, -18, markerY + 4);
	}
	noStroke();
	text("depth (km)", -55, 30 * Y_SCALE);

	for (e of earthquakes) {
		fill(color(e.color));
		ellipse(e.magnitude * X_SCALE, e.depth * Y_SCALE, 12, 12);
	}
}

function _drawHouse(color, row, count, value=1) {
	const WIDTH = 20;
	const CURRENT_WIDTH = 20 * value;
	const HEIGHT = 26;
	const ROW_PADDING = 12;
	const COL_PADDING = 3;
	fill(color);
	beginShape();
	if (value === 1) {
        // full house, start from the top
		vertex(count * (WIDTH + COL_PADDING) + CURRENT_WIDTH / 2, row * (HEIGHT + ROW_PADDING));
		vertex(count * (WIDTH + COL_PADDING) + CURRENT_WIDTH, row * (HEIGHT + ROW_PADDING) + HEIGHT / 2);
	} else {
		vertex(
			count * (WIDTH + COL_PADDING) + CURRENT_WIDTH,
			row * (HEIGHT + ROW_PADDING) + HEIGHT / 2 - (HEIGHT * value));
	}
	vertex(count * (WIDTH + COL_PADDING) + CURRENT_WIDTH, row * (HEIGHT + ROW_PADDING) + HEIGHT);
	vertex(count * (WIDTH + COL_PADDING), row * (HEIGHT + ROW_PADDING) + HEIGHT);
	vertex(count * (WIDTH + COL_PADDING), row * (HEIGHT + ROW_PADDING) + HEIGHT / 2);
	endShape();
}

function _drawHouseChart(row, data) {
	for (let i = 1; i < data.magnitude; i++) {
		_drawHouse(data.color, row, i);
	}
	let frac = data.magnitude - Math.trunc(data.magnitude);
	if (frac > 0) {
		_drawHouse(data.color, row, Math.floor(data.magnitude) + 1, frac);
	}
}

function drawHouses() {
	translate(-500, 250);
	const SCALE = 40;
	for (let [i, e] of earthquakes.entries()) {
		_drawHouseChart(i, e);
	}
}

function drawPlot() {
	translate(500, -150);
	const SCALE = 40;

	noStroke();
	for (e of earthquakes) {
		fill(color(e.color), 10);
		ellipse(e.magnitude * SCALE, 0, 12, 12);
	}

	stroke(0);
	fill(0);
	line(
		0,
		0,
		10 * SCALE,
		0
	);
	textSize(10);
	for (let i = 0; i <= 8; i += 2) {
		let markerX = i * SCALE;
		stroke(0);
		line(markerX, -3, markerX, 3);
		if (i > 0) {
			noStroke();
			text(i, markerX, 20);
		}
	}
	stroke(0);
	line(10 * SCALE - 3, -3, 10 * SCALE, 0);
	line(10 * SCALE - 3, 3, 10 * SCALE, 0);
	noStroke();
	text("magnitude", 10 * SCALE + 12, 3);
}

function drawBar() {
	const SCALE = 20;
	translate(100, 350);
	stroke(0);

    // x axis
	line(
		- PADDING_RIGHT * 1.5,
		0,
		+ earthquakes.length * (WIDTH + PADDING_RIGHT),
		0
	);
    // y axis
	line(
		- PADDING_RIGHT,
		PADDING_RIGHT / 2,
		- PADDING_RIGHT,
		0 - 10 * SCALE
	);
	textAlign(LEFT);
	noStroke();
	textSize(10);
	text("magnitude", -65, -10 * SCALE - 12);

    // scale
	fill(0);
	for (let i = 2; i <= 8; i += 2) {
		let markerY = - i * SCALE;
		text(i,	- PADDING_RIGHT * 1.5, markerY);
	}

    // bars & legend
	rectMode(CORNERS);
	textSize(12);
	for (let [i, e] of earthquakes.entries()) {
		fill(color(e.color));
		rect(
			i * (WIDTH + PADDING_RIGHT),
			0,
			WIDTH + i * (WIDTH + PADDING_RIGHT),
			- e.magnitude * SCALE
		);
		text(
			e.location,
			earthquakes.length * (WIDTH + PADDING_RIGHT) + PADDING_RIGHT * 4.5,
		 	-i * 30
		);
	}

    // lines
	stroke(255);
	for (let i = 2; i <= 8; i += 2) {
		let markerY = - i * SCALE;
		line(
		 	- PADDING_RIGHT,
			markerY,
			earthquakes.length * (WIDTH + PADDING_RIGHT),
			markerY
		)
	}
}
