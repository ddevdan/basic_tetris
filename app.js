
document.addEventListener('DOMContentLoaded', () => {
  const grid = document.querySelector('.grid')
  let squares = Array.from(document.querySelectorAll('.grid div'))
  const Score = document.querySelector("#score")
  const StartBtn = document.querySelector("#start-button")

  const width = 10

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
  console.log(current)
  console.log(random)
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
    console.log(currentPosition)
    undraw()
    currentPosition += width
    draw()
    freeze()
  }


  function freeze() {
    if (current.some(index => squares[currentPosition + index + width].classList.contains("taken"))) {
      current.forEach(index => squares[currentPosition + index].classList.add("taken"))
      random = Math.floor(Math.random() * formas.length)
      current = formas[random][currentRotation]
      currentPosition = 4
      draw()
    }
  }
  draw()
  setInterval(() => moveAutomaticaly(), 100);



})


