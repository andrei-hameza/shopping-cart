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
  return products
    .filter(product => ids.get(product.get('id')))
    .map(product => product.set('count', ids.get(product.get('id'))))
})

export function cartContainerSelector (state) {
  return {
    products: cartProducts(state)
  }
}
