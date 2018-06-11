function setup () {
  createCanvas(1000, 1000)
  loadPixels()

  for (let x = 0; x < width; x++) {
    for (let y = 0; y < height; y++) {
      let a = map(x, 0, width, -2, 2)
      let b = map(y, 0, height, -2, 2)
      let n = 0
      const z = 0
      while (n < 100) {
        const aa = (a * a) - (b * b)
        const bb = 2 * a * b
        a = aa + a
        b = bb + b

        if (abs(a + b) > 16) {
          break
        }

        n++
      }

      let brightness = 0
      if (n === 100) {
        brightness = 255
      }

      const pix = (x + y * width) * 4
      pixels[pix + 0] = brightness
      pixels[pix + 1] = brightness
      pixels[pix + 2] = brightness
      pixels[pix + 3] = 255
    }
  }
  updatePixels()
}
