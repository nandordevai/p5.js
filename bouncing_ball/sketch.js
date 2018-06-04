const ball = {
  x: 50,
  y: 50,
  xSpeed: 5,
  ySpeed: 9,
  r: 50,
}

function setup () {
  createCanvas(windowWidth, windowHeight)
}

function draw () {
  background(0)
  fill(255)
  ellipse(ball.x, ball.y, ball.r)
  update()
}

function update () {
  ball.x += ball.xSpeed
  ball.y += ball.ySpeed
  if ((ball.x + (ball.r / 2) >= windowWidth) || (ball.x - (ball.r / 2) <= 0)) {
    ball.xSpeed = ball.xSpeed * -1
  }
  if ((ball.y + (ball.r / 2) >= windowHeight) || (ball.y - (ball.r / 2) <= 0)) {
    ball.ySpeed = ball.ySpeed * -1
  }
  console.log(ball)
}
