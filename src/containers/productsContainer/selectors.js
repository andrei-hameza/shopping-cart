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
* Structured selector that returns data for productsContainer compopnent | mapStateToProps
*
* @param {Immutable.Map} [state]
* @return {Object}
*/

export const productsContainerSelector = createStructuredSelector({
  products: products
})
