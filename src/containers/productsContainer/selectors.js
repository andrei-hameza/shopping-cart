import { createStructuredSelector } from 'reselect'

/**
 * Gives the oredered map of all products: { id: product }
 *
 * @param {Immutable.Map} state
 * @return {Immutable.OrderedMap} - Products map
 */

export function products (state) {
  return state.getIn(['products', 'data'])
}

/**
* Structured selector that returns data for productsContainer compopnent | mapStateToProps
*
* @param {Immutable.Map} state
* @return {Object} - Data for productsContainer compopnent
*/

export const productsContainerSelector = createStructuredSelector({
  products: products
})
