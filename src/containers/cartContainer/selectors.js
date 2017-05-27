import Immutable from 'immutable'
import { products } from '../productsContainer/selectors'
import { createSelector } from 'reselect'

export function cartProductsIds (state) {
  return state.getIn(['cart', 'data'])
}

const cartProducts = createSelector([products, cartProductsIds], (products, ids) => {
  if (ids.size === 0) {
    return Immutable.List()
  }

  return ids.reduce((acc, count, id) => {
    const product = products.get(id)
    const cartProduct = product.set(
      'count',
      ids.get(id)
    )
    return acc.push(cartProduct)
  }, Immutable.List())
})

export function cartContainerSelector (state) {
  return {
    products: cartProducts(state)
  }
}
