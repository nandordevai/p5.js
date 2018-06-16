const pegsPerSide = 20
const pegRadius = 5
const distance = 10

function setup () {
  translate(50, 50)
  createCanvas(800, 600)
  background(0)
}

function draw () {
  noLoop()
  const top = getTopPegs()
  const left = getLeftPegs()
  connect(top, left)
  const bottom = getBottomPegs()
  const right = getRightPegs()
  connect(bottom, right)
  connectEye(getEyePegs())
}

function connectEye (pegs) {
  const getNext = (i) => i + distance < pegs.length
    ? pegs[i + distance]
    : pegs[i + distance - pegs.length]

  const getNeighbour = (i) => i + 1 < pegs.length ? pegs[i + 1] : pegs[0]

  translate(width / 2, height / 2)
  pegs.forEach((a, i) => {
    const b = getNext(i)
    const c = getNeighbour(i)
    stroke(...getColor(i))
    line(...a, ...b)
    line(...a, ...c)
    noStroke()
    fill(160, 160, 160)
    ellipse(a[0], a[1], pegRadius, pegRadius)
  })
}

function getEyePegs () {
  const steps = 24
  const r = 180
  return [...Array(steps).keys()]
    .map(i => [
      r * Math.cos(i * 2 * PI / steps),
      r * Math.sin(i * 2 * PI / steps),
    ])
}

function getTopPegs () {
  return [...Array(pegsPerSide).keys()]
    .map(i => [(i + 1) * (width / pegsPerSide) - pegRadius / 2, pegRadius / 2])
}

function getBottomPegs () {
  return [...Array(pegsPerSide).keys()]
    .map(i => [i * (width / pegsPerSide) - pegRadius / 2, height - pegRadius / 2])
}

function getLeftPegs () {
  return [...Array(pegsPerSide).keys()]
    .map(i => [pegRadius / 2, (i + 1) * (height / pegsPerSide) - pegRadius / 2])
}

function getRightPegs () {
  return [...Array(pegsPerSide).keys()]
    .map(i => [width - pegRadius / 2, i * (height / pegsPerSide) - pegRadius / 2])
}

function connect (a, b) {
  a.reverse()
  a.forEach((aPeg, i) => {
    stroke(...getColor(i))
    line(...aPeg, ...b[i])
    noStroke()
    fill(160, 160, 160)
    ellipse(...aPeg, pegRadius, pegRadius)
    ellipse(...b[i], pegRadius, pegRadius)
  })
}

function getColor (i) {
  return [
    map(i, 0, pegsPerSide, 100, 200),
    map(i, 0, pegsPerSide, 0, 255),
    map(i, 0, pegsPerSide, 255, 0),
  ]
}
