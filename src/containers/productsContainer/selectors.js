export function products (state) {
  return state.getIn(['products', 'data'])
}

export function productsContainerSelector (state) {
  return {
    products: products(state)
  }
}
