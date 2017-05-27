export const removeProductFromCart = productId => (
  {
    type: 'REMOVE_FROM_CART',
    payload: productId
  }
)

export const addToCart = id => (
  {
    type: 'ADD_TO_CART',
    payload: id
  }
)
