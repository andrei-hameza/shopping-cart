import { cartActionTypes } from '../../constants/actionTypes'
import shoppingCartService from '../../services/shoppingCartService'
import generateRandomSampleFromCollection from '../../utils/generateRandomSampleFromCollection'

// TODO: constants for action types
export const removeFromCart = productId => (
  {
    type: cartActionTypes.REMOVE_FROM_CART,
    payload: productId
  }
)

export const clearCart = () => (
  {
    type: cartActionTypes.CLEAR_CART,
    payload: null
  }
)

export const addToCart = productId => (
  {
    type: cartActionTypes.ADD_TO_CART,
    payload: productId
  }
)

// TODO: constant for products amoint in autofill
export const autofillCart = () => (dispatch, getState) => {
  const state = getState()
  const products = state.getIn(['products', 'data'])
  const randomProducts = generateRandomSampleFromCollection(products.toList().toJS(), 40).map(product => product.id)
  dispatch({
    type: cartActionTypes.BATCH_ADD_TO_CART,
    payload: randomProducts
  })
}

export const purchaseProducts = () => (dispatch, getState) => {
  const state = getState()
  const products = state.getIn(['products', 'data']).toJS()
  dispatch({ type: cartActionTypes.PURCHASE_IN_PROGRESS })
  shoppingCartService.sendData(products).then(() => {
    dispatch({ type: cartActionTypes.PURCHASE_SUCCESS })
    setTimeout(dispatch, 1000, { type: cartActionTypes.CLEAR_PURCHASE_STATUS })
  }).catch(() => {
    dispatch({ type: cartActionTypes.PURCHASE_FAILED })
    setTimeout(dispatch, 1000, { type: cartActionTypes.CLEAR_PURCHASE_STATUS })
  })
}

export const changeSort = sortId => (
  {
    type: cartActionTypes.CHANGE_SORTING,
    payload: sortId
  }
)
