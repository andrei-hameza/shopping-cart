import Immutable from 'immutable'
import { products } from '../productsContainer/selectors'
import { createSelector, createSelectorCreator } from 'reselect'
import { SortingConstants } from '../../constants/sortingConstants'
import { sortBy } from '../../utils/sortBy'
import R from 'ramda'

export function cartProductsIds (state) {
  return state.getIn(['cart', 'data'])
}

export function currentSorting (state) {
  return state.getIn(['cart', 'sorting'])
}

export function cartPurchaseStatus (state) {
  return state.getIn(['cart', 'status'])
}

export const productsInCart = createSelector(
  [products, cartProductsIds],
  (products, ids) => {
    if (ids.size === 0) {
      return Immutable.List()
    }

    return ids.reduce((acc, count, id) => {
      const product = products.get(id)

      if (R.isNil(product)) {
        return acc
      }

      const cartProduct = product.set(
        'amount',
        ids.get(id)
      )
      return acc.push(cartProduct)
    }, Immutable.List())
  }
)

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

const sortedProductsInCart = createCustomSelector(
  [productsInCart, currentSorting],
  (productsInCart, currentSorting) => {
    if (R.path(['size'], currentSorting) && R.path(['size'], productsInCart)) {
      const sortDirection = currentSorting.get('direction')
      const comparator = sortDirection === SortingConstants.Directions.ASCENDING
        ? (a, b) => a < b ? -1 : a > b ? 1 : 0
        : (b, a) => a < b ? -1 : a > b ? 1 : 0
      const sortId = currentSorting.get('id')
      const sortedProductsInCart = sortBy(productsInCart.toJS(), product => {
        const field = product[sortId]
        return typeof field === 'string' ? field.toUpperCase() : field
      }, comparator)
      return Immutable.fromJS(sortedProductsInCart)
    }
    return productsInCart
  }
)

export const productsTotalCost = createSelector(
  [products, cartProductsIds],
  (products, cartProductsIds) => {
    return cartProductsIds.reduce((acc, productAmount, productId) => (
      acc + products.getIn([productId, 'price']) * productAmount
    ), 0)
  }
)

// TODO: replace with structuredSelector
export function cartContainerSelector (state) {
  return {
    productsTotalCost: productsTotalCost(state),
    currentSorting: currentSorting(state),
    products: sortedProductsInCart(state),
    status: cartPurchaseStatus(state)
  }
}
