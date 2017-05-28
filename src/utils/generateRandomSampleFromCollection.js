function getRandomInt (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

export default function generateRandomSampleFromCollection (collection, size) {
  const min = 0
  const max = collection.length - 1
  let i = 0
  let result = []
  while (i < size) {
    const randomInt = getRandomInt(min, max)
    result.push(collection[randomInt])
    i++
  }
  return result
}
