import { SortingConstants } from '../constants/sortingConstants'

/**
 * Merges the left and right subarrays
 *
 * @param  {Object[]} leftPart  - Left subarray
 * @param  {Object[]} rightPart - Right subarray
 * @param  {Function} comparatorValueMapper - Function that helps to extract the value for comparator
 * @param  {Function} comparator - Function that defines the sort order
 * @return {Object[]} - Sorted merged array that contains elements from left and right subarrays
 */

function merge (leftPart, rightPart, comparatorValueMapper, comparator) {
  const result = []

  while (leftPart.length > 0 && rightPart.length > 0) {
    const firstLeftPartEl = comparatorValueMapper(leftPart[0])
    const firstRightPartEl = comparatorValueMapper(rightPart[0])
    const element = comparator(firstLeftPartEl, firstRightPartEl) <= 0
      ? leftPart.shift()
      : rightPart.shift()

    result.push(element)
  }

  const remainingPart = leftPart.length ? leftPart : rightPart

  return result.concat(remainingPart)
}

/**
 * Sorts the collection according to the supplied function.
 * Implementation is based on mergesort sorting algorithm.
 *
 * @param  {Object[]} collection - The collection to sort
 * @param  {Funciton} comparatorValueMapper - Function that helps to extract the value for comparator
 * @param  {Funciton} comparator - Function that defines the sort order
 * @return {Object[]} - New sorted collection
 */

function sort (collection, comparatorValueMapper, comparator) {
  if (collection.length < 2) {
    return collection
  }

  const middle = Math.floor(collection.length / 2)
  const leftPart = collection.slice(0, middle)
  const rightPart = collection.slice(middle)

  return merge(
    sort(leftPart, comparatorValueMapper, comparator),
    sort(rightPart, comparatorValueMapper, comparator),
    comparatorValueMapper,
    comparator
  )
}

function ascComparator (a, b) {
  return a < b ? -1 : a > b ? 1 : 0
}

function descComparator (a, b) {
  return a > b ? -1 : a < b ? 1 : 0
}

/**
 * Sorts the collection according to the supplied function
 *
 * @param  {Object[]} collection - The collection to sort
 * @param  {String} collectionItemProperty - Object property for sorting
 * @param  {String} sortDirection - Sort direction
 * @return {Object[]} - New sorted collection
 */

export function sortBy (collection, collectionItemProperty, sortDirection) {
  const comparator = sortDirection === SortingConstants.Directions.ASCENDING
    ? ascComparator
    : descComparator

  return sort(collection, (item) => {
    const value = item[collectionItemProperty]
    return typeof value === 'string' ? value.toUpperCase() : value
  }, comparator)
}
