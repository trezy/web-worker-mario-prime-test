// Spin up a new worker
const primeUpperBoundary = document.querySelector('[name="prime-upper-boundary"]')
const primeCalculatorForm = document.querySelector('form')

let worker = new Worker('assets/workers/prime-calculator.js')

const isPrime = number => {
  let denominator = 2

  while (denominator <= Math.sqrt(number)) {
    if ((number % denominator) === 0) {
      return false
    }

    denominator++
  }

  return true
}

const calculatePrimes = destinationPrime => {
  const primeNumbers = []
  let currentNumber = 2

  while (currentNumber <= destinationPrime) {
    if (isPrime(currentNumber)) {
      primeNumbers.push(currentNumber)
    }

    currentNumber++
  }

  console.log(primeNumbers)
}

const disableForm = () => {
  const elementsToDisable = primeCalculatorForm.querySelectorAll('input, button')
  elementsToDisable.forEach(element => element.setAttribute('disabled', true))
}

const enableForm = () => {
  const elementsToEnable = primeCalculatorForm.querySelectorAll('input, button')
  elementsToEnable.forEach(element => element.removeAttribute('disabled'))
}

const handleMessage = ({ data }) => {
  console.log(data)
  worker.removeEventListener('message', handleMessage)
  enableForm()
}

// Listen for messages from the worker
primeCalculatorForm.addEventListener('submit', event => {
  const useWorker = Boolean(event.explicitOriginalTarget.getAttribute('data-worker'))

  event.preventDefault()

  disableForm()

  if (useWorker) {
    // Listen for messages from the worker
    worker.addEventListener('message', handleMessage)

    // Tell the worker to start calculating primes!
    worker.postMessage(primeUpperBoundary.value)
  } else {
    calculatePrimes(primeUpperBoundary.value)
    enableForm()
  }
})
