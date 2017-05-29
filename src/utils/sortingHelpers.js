import { SortingConstants } from '../constants/sortingConstants'

function merge (leftPart, rightPart, comparatorValueMapper, comparator) {
  const result = []
  while (leftPart.length > 0 && rightPart.length > 0) {
    const firstLeftPartEl = comparatorValueMapper(leftPart[0])
    const firstRightPartEl = comparatorValueMapper(rightPart[0])
    result.push(comparator(firstLeftPartEl, firstRightPartEl) <= 0
      ? leftPart.shift()
      : rightPart.shift())
  }
  return result.concat(leftPart.length ? leftPart : rightPart)
}

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

export function sortBy (collection, collectionItemProperty, sortDirection) {
  const comparator = sortDirection === SortingConstants.Directions.ASCENDING
  ? (a, b) => a < b ? -1 : a > b ? 1 : 0
  : (b, a) => a < b ? -1 : a > b ? 1 : 0
  return sort(collection, (item) => {
    const value = item[collectionItemProperty]
    return typeof value === 'string' ? value.toUpperCase() : value
  }, comparator)
}
