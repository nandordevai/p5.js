var currentStrokeWeight = 6;
var deltaStrokeWeight = .08;
var theta = 0;

//Starting colors
var backgroundR = random(0, 255);
var backgroundG = random(0, 255);
var backgroundB = random(0, 255);

//color change speed
var deltaR = random(2, 3);
var deltaG = random(2, 3);
var deltaB = random(2, 3);

function setup() {
    createCanvas(windowWidth, windowHeight);
    rectMode(CENTER);
}


function draw() {
    //change the currentStrokeWeight below to a fixed int and see what happens
    strokeWeight(currentStrokeWeight);
    stroke(0, 0, 0, 255);
    noFill();
    background(backgroundR, backgroundG, backgroundB);

    for (i = -100; i < 1100; i += 100) {
        for (j = -100; j < 1100; j += 100) {
            translate(i + 50, j + 50);
            rotate(theta);
            rect(0, 0, 200, 200);
            resetMatrix();
        }
    }

    currentStrokeWeight += deltaStrokeWeight;
    theta += 0.005;
    backgroundR += deltaR;
    backgroundG += deltaG;
    backgroundB += deltaB;

    //stroke width flip
    if (currentStrokeWeight > 30 || currentStrokeWeight <3) {
        deltaStrokeWeight *= -1;
    }

    //color flips
    if (backgroundR < 20 || backgroundR > 255) {
        deltaR *= -1;
    }

    if (backgroundG < 20 || backgroundG > 255) {
        deltaG *= -1;
    }

    if (backgroundB < 20 || backgroundB > 255) {
        deltaB *= -1;
    }
}
