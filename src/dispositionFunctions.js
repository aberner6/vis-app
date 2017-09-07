export function squareGetCoordinates(i, cols) {
  const x = i % cols
  const y = Math.floor(i / cols)

  return [ x, y ]
}

export function squareSpiralGetCoordinates(i) {
  // given i an index in the squared spiral
// p the sum of point in inner square
// a the position on the current square
// i = p + a

  var r = Math.floor((Math.sqrt(i + 1) - 1) / 2) + 1

// compute radius : inverse arithmetic sum of 8+16+24+...=
  var p = (8 * r * (r - 1)) / 2
// compute total point on radius -1 : arithmetic sum of 8+16+24+...

  var en = r * 2
// points by face

  var a = (1 + i - p) % (r * 8)
// compute de position and shift it so the first is (-r,-r) but (-r+1,-r)
// so square can connect

  var pos = [0, 0]
  switch (Math.floor(a / (r * 2))) {
    // find the face : 0 top, 1 right, 2, bottom, 3 left
    case 0:
      {
        pos[0] = a - r
        pos[1] = -r
      }
      break
    case 1:
      {
        pos[0] = r
        pos[1] = (a % en) - r
      }
      break
    case 2:
      {
        pos[0] = r - (a % en)
        pos[1] = r
      }
      break
    case 3:
      {
        pos[0] = -r
        pos[1] = r - (a % en)
      }
      break
  }
  return pos
}

export function snakeGetCoordinates(i, cols) {
  const y = Math.floor(i / cols)
  const x = y % 2 ? cols - (i % cols) - 1 : i % cols

  return [ x, y ]
}
