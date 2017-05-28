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

export function sortBy (collection, comparatorValueMapper, comparator) {
  if (collection.length < 2) {
    return collection
  }

  const middle = Math.floor(collection.length / 2)
  const leftPart = collection.slice(0, middle)
  const rightPart = collection.slice(middle)

  return merge(
    sortBy(leftPart, comparatorValueMapper, comparator),
    sortBy(rightPart, comparatorValueMapper, comparator),
    comparatorValueMapper,
    comparator
  )
}
