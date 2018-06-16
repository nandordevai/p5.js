let grid = []
let next = []
const dA = 1
const dB = 0.5
const feedRate = 0.055
const killRate = 0.062

function setup () {
  createCanvas(200, 200)
  pixelDensity(1)
  grid = [...Array(200).keys()].map((y) => {
    return [...Array(200).keys()].map((x) => {
      return {
        a: 1,
        b: 0,
      }
    })
  })
  next = [...Array(200).keys()].map((y) => {
    return [...Array(200).keys()].map((x) => {
      return {
        a: 1,
        b: 0,
      }
    })
  })

  for (let i = 100; i < 110; i++) {
    for (let j = 100; j < 110; j++) {
      grid[i][j].b = 1
    }
  }
}

function draw () {
  // noLoop()
  background(51)
  loadPixels()
  grid.forEach((row, y) => {
    row.forEach((cell, x) => {
      if (x > 0 && y > 0 && x < 199 && y < 199) {
        next[x][y] = {
          a: cell.a + dA * laplaceA(x, y) - cell.a * cell.b * cell.b + feedRate * (1 - cell.a),
          b: cell.b + dB * laplaceB(x, y) + cell.a * cell.b * cell.b - (killRate + feedRate) * cell.b,
        }
        next[x][y].a = constrain(next[x][y].a, 0, 1)
        next[x][y].b = constrain(next[x][y].b, 0, 1)
      }
      let pix = (x + y * 200) * 4
      var c = floor((next[x][y].a - next[x][y].b) * 255)
      c = constrain(c, 0, 255)
      pixels[pix + 0] = c
      pixels[pix + 1] = c
      pixels[pix + 2] = c
      pixels[pix + 3] = 255
    })
  })
  updatePixels()
  const temp = grid
  grid = next
  next = temp
}

function laplaceA (x, y) {
  let sumA = 0
  sumA += grid[x][y].a * -1
  sumA += grid[x - 1][y].a * 0.2
  sumA += grid[x + 1][y].a * 0.2
  sumA += grid[x][y - 1].a * 0.2
  sumA += grid[x][y + 1].a * 0.2
  sumA += grid[x - 1][y - 1].a * 0.05
  sumA += grid[x + 1][y + 1].a * 0.05
  sumA += grid[x + 1][y - 1].a * 0.05
  sumA += grid[x - 1][y + 1].a * 0.05
  return sumA
}

function laplaceB (x, y) {
  let sumB = 0
  sumB += grid[x][y].b * -1
  sumB += grid[x - 1][y].b * 0.2
  sumB += grid[x + 1][y].b * 0.2
  sumB += grid[x][y - 1].b * 0.2
  sumB += grid[x][y + 1].b * 0.2
  sumB += grid[x - 1][y - 1].b * 0.05
  sumB += grid[x + 1][y + 1].b * 0.05
  sumB += grid[x + 1][y - 1].b * 0.05
  sumB += grid[x - 1][y + 1].b * 0.05
  return sumB
}
