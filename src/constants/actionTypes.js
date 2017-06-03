import nsKeyMirror from 'nskeymirror'

export const cartActionTypes = nsKeyMirror({
  ADD_TO_CART: null,
  BATCH_ADD_TO_CART: null,
  REMOVE_FROM_CART: null,
  CLEAR_CART: null,
  CHANGE_SORTING: null,
  PURCHASE_IN_PROGRESS: null,
  PURCHASE_SUCCESS: null,
  PURCHASE_FAILED: null,
  CLEAR_PURCHASE_STATUS: null
}, 'CART')

export const productsActionTypes = nsKeyMirror({
  SET_DATA: null
}, 'PRODUCTS')
