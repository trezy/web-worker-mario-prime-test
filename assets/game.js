const gameState = {
  walkingLeft: false,
  walkingRight: false,
}

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

const character = document.querySelector('.character')
character.style.left = '50%'

const gameLoop = () => {
  const {
    walkingLeft,
    walkingRight,
  } = gameState
  const currentPosition = +character.style.left.replace('%', '')

  if (walkingLeft || walkingRight) {
    let newPosition = null

    if (walkingLeft) {
      newPosition = currentPosition - 1
      character.classList.remove('left')
      character.classList.add('right')
    }

    if (walkingRight) {
      newPosition = currentPosition + 1
      character.classList.remove('right')
      character.classList.add('left')
    }

    character.style.left = `${newPosition}%`
    character.classList.add('walking')
  } else {
    character.classList.remove('walking')
  }

  requestAnimationFrame(gameLoop)
}

requestAnimationFrame(gameLoop)
