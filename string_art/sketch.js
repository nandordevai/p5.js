const pegsPerSide = 20
const pegRadius = 5

function setup () {
  translate(50, 50)
  createCanvas(800, 600)
  background(0)
}

function draw () {
  noLoop()
  const top = createTopPegs()
  const left = createLeftPegs()
  connect(top, left)
  const bottom = createBottomPegs()
  const right = createRightPegs()
  connect(bottom, right)
}

function createTopPegs () {
  return [...Array(pegsPerSide).keys()]
    .map(i => [(i + 1) * (width / pegsPerSide) - pegRadius / 2, pegRadius / 2])
}

function createBottomPegs () {
  return [...Array(pegsPerSide).keys()]
    .map(i => [i * (width / pegsPerSide) - pegRadius / 2, height - pegRadius / 2])
}

function createLeftPegs () {
  return [...Array(pegsPerSide).keys()]
    .map(i => [pegRadius / 2, (i + 1) * (height / pegsPerSide) - pegRadius / 2])
}

function createRightPegs () {
  return [...Array(pegsPerSide).keys()]
    .map(i => [width - pegRadius / 2, i * (height / pegsPerSide) - pegRadius / 2])
}

function connect (a, b) {
  a.reverse()
  a.forEach((aPeg, i) => {
    const green = map(i, 0, pegsPerSide, 30, 255)
    const blue = map(i, 0, pegsPerSide, 255, 30)
    stroke(255, green, blue)
    line(...aPeg, ...b[i])
    noStroke()
    fill(160, 160, 160)
    ellipse(...aPeg, pegRadius, pegRadius)
    ellipse(...b[i], pegRadius, pegRadius)
  })
}
