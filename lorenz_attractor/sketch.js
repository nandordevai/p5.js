let x = 0.01
let y = 0
let z = 0

let a = 10
let b = 28
let c = 2.6

let dt = 0.01

let points = []

function setup () {
  createCanvas(windowWidth, windowHeight, WEBGL)
  colorMode(HSB)
}

function draw () {
  background(0)
  let camX = map(mouseX, 0, width, 1000, -1000)
  let camY = map(mouseY, 0, height, 1000, -1000)
  camera(camX, camY, (height / 8) / tan(PI * 30 / 180), 0, 0, 0, 0, 1, 0)
  stroke(255)
  strokeWeight(0.5)
  noFill()
  const dx = (a * (y - x)) * dt
  const dy = (x * (b - z) - z) * dt
  const dz = (x * y - c * z) * dt
  x += dx
  y += dy
  z += dz
  points.push(new p5.Vector(x, y, z))
  beginShape()
  hue = 0
  points.forEach(p => {
    stroke(hue, 255, 255)
    vertex(p.x, p.y, p.z)
    const offset = p5.Vector.random3D()
    offset.mult(0.1)
    p.add(offset)
    hue > 255 ? hue = 0 : hue += 0.5
  })
  endShape()
}
