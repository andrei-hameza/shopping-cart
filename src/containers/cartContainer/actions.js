export const removeProductFromCart = productId => (
  {
    type: 'REMOVE_FROM_CART',
    payload: productId
  }
)

export const addToCart = productId => (
  {
    type: 'ADD_TO_CART',
    payload: productId
  }
)

export const changeSort = sortId => (
  {
    type: 'CHANGE_SORTING',
    payload: sortId
  }
)
