const pegsPerSide = 20
const pegRadius = 5

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
  function getNext (i) {
    return i + 10 < pegs.length ? pegs[i + 10] : pegs[i + 10 - pegs.length]
  }

  function getNeighbour (i) {
    return i + 1 < pegs.length ? pegs[i + 1] : pegs[0]
  }

  translate(width / 2, height / 2)
  pegs.forEach((a, i) => {
    const red = map(i, 0, pegsPerSide, 100, 200)
    const green = map(i, 0, pegsPerSide, 0, 255)
    const blue = map(i, 0, pegsPerSide, 255, 0)
    const b = getNext(i)
    const c = getNeighbour(i)
    stroke(red, green, blue)
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
    const red = map(i, 0, pegsPerSide, 100, 200)
    const green = map(i, 0, pegsPerSide, 0, 255)
    const blue = map(i, 0, pegsPerSide, 255, 0)
    stroke(red, green, blue)
    line(...aPeg, ...b[i])
    noStroke()
    fill(160, 160, 160)
    ellipse(...aPeg, pegRadius, pegRadius)
    ellipse(...b[i], pegRadius, pegRadius)
  })
}
