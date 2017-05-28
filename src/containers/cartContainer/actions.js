import generateRandomSampleFromCollection from '../../utils/generateRandomSampleFromCollection'

export const removeProductFromCart = productId => (
  {
    type: 'REMOVE_FROM_CART',
    payload: productId
  }
)

export const clearCart = () => (
  {
    type: 'CLEAR_CART',
    payload: null
  }
)

export const addToCart = productId => (
  {
    type: 'ADD_TO_CART',
    payload: productId
  }
)

export const autofillCart = () => (dispatch, getState) => {
  const state = getState()
  const products = state.getIn(['products', 'data'])
  const randomProducts = generateRandomSampleFromCollection(products.toList().toJS(), 40).map(product => product.id)
  dispatch({
    type: 'BATCH_ADD_TO_CART',
    payload: randomProducts
  })
}

export const changeSort = sortId => (
  {
    type: 'CHANGE_SORTING',
    payload: sortId
  }
)
