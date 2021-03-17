
document.addEventListener('DOMContentLoaded', () => {
  const grid = document.querySelector('.grid')
  let squares = Array.from(document.querySelectorAll('.grid div'))
  const scoreDisplay = document.querySelector("#score")
  const gameOverDisplay = document.querySelector("#game-over")

  const startBtn = document.querySelector("#start-button")
  const width = 10
  let nextRandom = 0
  let timerId
  let score = 0

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

  function moveDown() {
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
      addScore()
      gameOver()
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

  startBtn.addEventListener('click', () => {
    if (timerId) {
      clearInterval(timerId)
      timerId = null
    }
    else {
      draw()
      timerId = setInterval(moveDown, 1000)
      nextRandom = Math.floor(Math.random() * formas.length)
      displayShape()
    }
  })

  function addScore() {
    for (let i = 0; i < 199; i += width) {
      const row = [i, i + 1, i + 2, i + 3, i + 4, i + 5, i + 6, i + 7, i + 8, i + 9]

      if (row.every(index => squares[index].classList.contains('taken'))) {
        score += 10
        scoreDisplay.innerHTML = score
        row.forEach(index => {
          squares[index].classList.remove('taken')
          squares[index].classList.remove('forma')

        })
        const squaresRemoved = squares.splice(i, width)
        squares = squaresRemoved.concat(squares)
        squares.forEach(cell => grid.appendChild(cell))
      }
    }
  }

  function gameOver() {
    if (current.some(index => squares[currentPosition + index].classList.contains("taken"))) {
      gameOverDisplay.innerHTML = "GAME OVER"
      scoreDisplay.innerHTML = ""
      clearInterval(timerId)
    }

  }

  // setInterval(() => moveDown(), 500);
})


