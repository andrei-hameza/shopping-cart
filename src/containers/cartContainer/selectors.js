import Immutable from 'immutable'
import { products } from '../productsContainer/selectors'
import { createSelector, createSelectorCreator, createStructuredSelector } from 'reselect'
import { sortBy } from '../../utils/sortingHelpers'
import R from 'ramda'

/**
 * Give the current products' ids in the cart and their amount
 *
 * @param {Immutable.Map} [state]
 * @return {Immutable.OrderedMap}
 */

export function cartProductsIds (state) {
  return state.getIn(['cart', 'data'])
}

/**
 * Give the current sorting in the cart
 *
 * @param {Immutable.Map} [state]
 * @return {Immutable.Map} Empty object when there is no sort { } or { id: String, direction: String }
 */

export function currentSorting (state) {
  return state.getIn(['cart', 'sorting'])
}

/**
 * Give the current purchase status of the cart
 *
 * @param {Immutable.Map} [state]
 * @return {String}
 */

export function cartPurchaseStatus (state) {
  return state.getIn(['cart', 'status'])
}

/**
 * Give the list of products in the cart together with their amount
 *
 * @param {Immutable.Map} [state]
 * @return {Immutable.List}
 */

export const productsInCart = createSelector(
  [products, cartProductsIds],
  (products, ids) => {
    if (R.pipe(R.prop('size'), R.equals(0))(ids)) {
      return Immutable.List()
    }
    const result = ids.reduce((acc, count, id) => {
      const product = products.get(id)
      return R.isNil(product) ? acc : [...acc, product.set('amount', count)]
    }, [])

    return Immutable.fromJS(result)
  }
)

/**
 * Selector creator with custom memoize function which
 * is used for smart saving the previous order in case of sorting change
 *
 * @param {Function}
 * @return {Function}
 */

const createCustomSelector = createSelectorCreator((selector) => {
  let prevCurrentSorting
  let prevProductsInCart
  let prevResult

  return (productsInCart, currentSorting) => {
    let result
    if (prevCurrentSorting === currentSorting && prevProductsInCart === productsInCart) {
      return prevResult
    }
    if (prevCurrentSorting !== currentSorting && prevProductsInCart === productsInCart) {
      result = selector(prevResult, currentSorting)
    } else {
      result = selector(productsInCart, currentSorting)
    }
    prevResult = result
    prevCurrentSorting = currentSorting
    prevProductsInCart = productsInCart
    return result
  }
})

/**
 * Give the sorted list of products in the cart
 *
 * @param {Immutable.Map} [state]
 * @return {Immutable.List}
 */

export const sortedProductsInCart = createCustomSelector(
  [productsInCart, currentSorting],
  (productsInCart, currentSorting) => {
    if (R.path(['size'])(currentSorting) && R.path(['size'])(productsInCart)) {
      const sortId = currentSorting.get('id')
      const sortDirection = currentSorting.get('direction')
      const sortedProductsInCart = sortBy(
        productsInCart.toJS(),
        sortId,
        sortDirection
      )
      return Immutable.fromJS(sortedProductsInCart)
    }
    return productsInCart
  }
)

/**
 * Give the total cost of products in the cart
 *
 * @param {Immutable.Map} [state]
 * @return {Number}
 */

export const productsTotalCost = createSelector(
  [products, cartProductsIds],
  (products, cartProductsIds) => {
    return cartProductsIds.reduce((acc, productAmount, productId) => (
      acc + products.getIn([productId, 'price']) * productAmount
    ), 0)
  }
)

/**
 * Structured selector that returns data for cartContainer compopnent | mapStateToProps
 *
 * @param {Immutable.Map} [state]
 * @return {Object}
 */

export const cartContainerSelector = createStructuredSelector({
  productsTotalCost: productsTotalCost,
  currentSorting: currentSorting,
  products: sortedProductsInCart,
  status: cartPurchaseStatus
})
