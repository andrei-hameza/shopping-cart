import shoppingCartService from '../../services/shoppingCartService'
import generateRandomSampleFromCollection from '../../utils/generateRandomSampleFromCollection'

export const removeFromCart = productId => (
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

export const purchaseProducts = () => (dispatch, getState) => {
  const state = getState()
  const products = state.getIn(['products', 'data']).toJS()
  dispatch({ type: 'PURCHASE_IN_PROGRESS' })
  shoppingCartService.sendData(products).then(() => {
    dispatch({ type: 'PURCHASE_SUCCESS' })
    setTimeout(dispatch, 1000, { type: 'CLEAR_PURCHASE_STATUS' })
  }).catch(() => dispatch({ type: 'PURCHASE_FAILED' }))
}

export const changeSort = sortId => (
  {
    type: 'CHANGE_SORTING',
    payload: sortId
  }
)
