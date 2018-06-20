function setup () {
  createCanvas(windowWidth, windowHeight)
}

function draw () {
  background('#1D1F21')
  stroke(230, 230, 230)
  const length = 200
  translate(windowWidth / 2, windowHeight)
  branch(length)
}

function branch (length) {
  const angle = PI / 7
  line(0, 0, 0, -length)
  translate(0, -length)
  if (length > 2) {
    push()
    rotate(angle)
    branch(length * 0.67)
    pop()
    push()
    rotate(-angle)
    branch(length * 0.67)
    pop()
  }
}
