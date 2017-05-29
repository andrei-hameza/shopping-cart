import { createStructuredSelector } from 'reselect'

/**
 * Give the oredered map of all products | { id: product }
 *
 * @param {Immutable.Map} [state]
 * @return {Immutable.OrderedMap}
 */

export function products (state) {
  return state.getIn(['products', 'data'])
}

/**
 * Give the list of all products
 *
 * @param {Immutable.Map} [state]
 * @return {Immutable.List}
 */

export function productsList (state) {
  return state.getIn(['products', 'data']).toList()
}

/**
* Structured selector that returns data for productsContainer compopnent | mapStateToProps
*
* @param {Immutable.Map} [state]
* @return {Object}
*/

export const productsContainerSelector = createStructuredSelector({
  products: productsList
})
