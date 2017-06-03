// services
import shoppingCartService from '../../services/shoppingCartService'

// constants
import { cartActionTypes } from '../../constants/actionTypes'
import { randomSampleSize } from '../../constants/config'

// helpers
import generateRandomSampleFromCollection from '../../utils/generateRandomSampleFromCollection'

/**
 * Adds product to the cart
 *
 * @param  {String} productId - Product id
 * @return {Object} - Action
 */

export const addToCart = productId => (
  {
    type: cartActionTypes.ADD_TO_CART,
    payload: productId
  }
)

/**
 * Removes product from the cart
 *
 * @param  {String} productId - Product id
 * @return {Object} - Action
 */

export const removeFromCart = productId => (
  {
    type: cartActionTypes.REMOVE_FROM_CART,
    payload: productId
  }
)

/**
 * Clears the cart
 *
 * @return {Object} - Action
 */

export const clearCart = () => (
  {
    type: cartActionTypes.CLEAR_CART,
    payload: null
  }
)

/**
 * Changes the sorting in the cart
 * @param  {String} sortId - Sorting id: 'ascending' or 'descending'
 * @return {Object} - Action
 */

export const changeSort = sortId => (
  {
    type: cartActionTypes.CHANGE_SORTING,
    payload: sortId
  }
)

/**
 * Automatically fills the cart with random products
 *
 * @return {Function}
 */

export const autofillCart = () => (dispatch, getState) => {
  const state = getState()
  const products = state.getIn(['products', 'data'])
  const randomProducts = generateRandomSampleFromCollection(
    products.toList().toJS(), randomSampleSize
  ).map(product => product.id)

  dispatch({
    type: cartActionTypes.BATCH_ADD_TO_CART,
    payload: randomProducts
  })
}

/**
 * Performs products purchase via appropriate service
 *
 * @return {Function}
 */

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
