const gameState = {
  autorun: false,
  moonwalk: false,
  walkingLeft: false,
  walkingRight: false,
}
const walkSpeed = 0.3

document.addEventListener('keydown', ({ key }) => {
  switch (key) {
    case 'a':
      gameState.walkingLeft = true
      break

    case 'd':
      gameState.walkingRight = true
      break
  }
})

document.addEventListener('keyup', ({ key }) => {
  switch (key) {
    case 'a':
      gameState.walkingLeft = false
      break

    case 'd':
      gameState.walkingRight = false
      break
  }
})

document.querySelector('[name=autorun]').addEventListener('change', ({ target }) => {
  gameState.autorun = target.checked
})

document.querySelector('[name=moonwalk]').addEventListener('change', ({ target }) => {
  gameState.moonwalk = target.checked
})

const character = document.querySelector('.character')
character.style.left = '50%'

const gameLoop = () => {
  const {
    autorun,
    moonwalk,
    walkingLeft,
    walkingRight,
  } = gameState
  const currentPosition = +character.style.left.replace('%', '')
  let newPosition = currentPosition

  const moveLeft = () => {
    newPosition -= walkSpeed

    if (gameState.moonwalk) {
      character.classList.add('right')
      character.classList.remove('left')
    } else {
      character.classList.add('left')
      character.classList.remove('right')
    }
  }

  const moveRight = () => {
    newPosition += walkSpeed

    if (gameState.moonwalk) {
      character.classList.add('left')
      character.classList.remove('right')
    } else {
      character.classList.add('right')
      character.classList.remove('left')
    }
  }

  if (autorun || walkingLeft || walkingRight) {
    if (autorun) {
      moveRight()
    } else if (walkingLeft) {
      moveLeft()
    } else if (walkingRight) {
      moveRight()
    }

    if (newPosition !== currentPosition) {
      if (newPosition >= 100) {
        newPosition = 0
      } else if (newPosition < 0) {
        newPosition = 100
      }
    }

    character.style.left = `${newPosition}%`
    character.classList.add('walking')
  } else {
    character.classList.remove('walking')
  }

  requestAnimationFrame(gameLoop)
}

requestAnimationFrame(gameLoop)
