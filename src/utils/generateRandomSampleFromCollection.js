/**
 * Generates a random integer number from interval [min, max]
 *
 * @param  {Number} min - Integer number for interval start
 * @param  {Numner} max - Integer number for interval end
 * @return {Number} - Randomly generated integer number from [min, max] interval
 */

function getRandomInt (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

/**
 * Generates random collection of appropriate size from source collection
 *
 * @param  {Object[]} collection - Source collection
 * @param  {Number} size - Desirable size of randomly generated collection
 * @return {Object[]} - Randomly generated collection
 */

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
