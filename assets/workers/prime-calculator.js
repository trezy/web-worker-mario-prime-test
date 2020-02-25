const handleMessage = event => {
  const { data: destinationPrime } = event
  const primeNumbers = []
  let currentNumber = 2

  while (currentNumber <= destinationPrime) {
    if (isPrime(currentNumber)) {
      primeNumbers.push(currentNumber)
    }

    currentNumber++
  }

  self.postMessage(primeNumbers)
}





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





self.addEventListener('message', handleMessage)
