
document.addEventListener('DOMContentLoaded', () => {
  const grid = document.querySelector('.grid')
  let squares = Array.from(document.querySelectorAll('.grid div'))
  const Score = document.querySelector("#score")
  const StartBtn = document.querySelector("#start-button")
  const width = 10
  let nextRandom = 0

  //formas do tetris
  const fTetris = [
    [1, width + 1, width * 2 + 1, 2],
    [width, width + 1, width + 2, width * 2 + 2],
    [1, width + 1, width * 2 + 1, width * 2],
    [width, width * 2, width * 2 + 1, width * 2 + 2]
  ]

  const zTetris = [
    [width * 2, width * 2 + 1, width + 1, width + 2],
    [0, width, width + 1, width * 2 + 1],
    [width * 2, width * 2 + 1, width + 1, width + 2],
    [0, width, width + 1, width * 2 + 1]
  ]
  const tTetris = [
    [1, width, width + 1, width + 2],
    [1, width + 1, width + 2, width * 2 + 1],
    [width, width + 1, width + 2, width * 2 + 1],
    [1, width, width + 1, width * 2 + 1]
  ]
  const sTetris = [
    [0, 1, width, width + 1],
    [0, 1, width, width + 1],
    [0, 1, width, width + 1],
    [0, 1, width, width + 1]
  ]
  const lTetris = [
    [1, width + 1, width * 2 + 1, width * 3 + 1],
    [width, width + 1, width + 2, width + 3],
    [1, width + 1, width * 2 + 1, width * 3 + 1],
    [width, width + 1, width + 2, width + 3]
  ]

  const formas = [fTetris, zTetris, tTetris, sTetris, lTetris]
  let currentPosition = 4
  let currentRotation = 0

  //GERAR FORMA ALEATORIA

  let random = Math.floor(Math.random() * formas.length)
  let current = formas[random][currentRotation]

  function draw() {
    current.forEach(index => {
      squares[currentPosition + index].classList.add('forma')
    })
  }


  function undraw() {
    current.forEach(index => {
      squares[currentPosition + index].classList.remove('forma')
    })
  }

  function moveAutomaticaly() {
    undraw()
    currentPosition += width
    draw()
    freeze()
  }


  function freeze() {
    if (current.some(index => squares[currentPosition + index + width].classList.contains("taken"))) {
      current.forEach(index => squares[currentPosition + index].classList.add("taken"))
      random = nextRandom
      nextRandom = Math.floor(Math.random() * formas.length)
      current = formas[random][currentRotation]
      currentPosition = 4
      draw()
      displayShape()
    }
  }

  function moveLeft() {
    undraw()
    const isAtLeftEdge = current.some(
      index => (currentPosition + index) % width === 0)
    if (!isAtLeftEdge) currentPosition -= 1
    if (current.some(index => squares[currentPosition + index].classList.contains('taken'))) {
      currentPosition += 1
    }
    draw()
  }

  function moveRight() {
    undraw()
    const isAtRighEdge = current.some(index => (currentPosition + index) % width === width - 1)
    if (!isAtRighEdge) currentPosition += 1
    if (current.some(index => squares[currentPosition + index].classList.contains("taken"))) {
      currentPosition -= 1
    }
    draw()
  }

  function rotate() {
    undraw()
    currentRotation++
    if (currentRotation === current.length) {// equals to 4
      currentRotation = 0
    }

    current = formas[random][currentRotation]
    draw()
  }


  const keyPressed = { 37: moveLeft, 38: rotate, 39: moveRight, 40: "pressed 40" }

  function control(e) {
    moveFunction = keyPressed[e.keyCode]
    if (moveFunction) moveFunction()

  }

  document.addEventListener('keyup', control)


  draw()
  setInterval(() => moveAutomaticaly(), 1000);



  const displaySquares = document.querySelectorAll('.mini-grid div')
  const displayWidth = 4
  let displayIndex = 0


  const upNextTetris = [
    [1, displayWidth + 1, displayWidth * 2 + 1, 2], //lTetromino
    [0, displayWidth, displayWidth + 1, displayWidth * 2 + 1], //zTetromino
    [1, displayWidth, displayWidth + 1, displayWidth + 2], //tTetromino
    [0, 1, displayWidth, displayWidth + 1], //oTetromino
    [1, displayWidth + 1, displayWidth * 2 + 1, displayWidth * 3 + 1] //iTetromino
  ]

  function displayShape() {
    displaySquares.forEach((square) => {
      square.classList.remove('mini-grid__forma')
    })

    upNextTetris[nextRandom].forEach(index => {
      displaySquares[displayIndex + index].classList.add('mini-grid__forma')
    })
  }

  draw()
  setInterval(() => moveAutomaticaly(), 500);
})


