// libs
import Immutable from 'immutable'
import R from 'ramda'

// constants
import { SortingConstants } from '../../constants/sortingConstants'
import { PurchaseStatusConstants } from '../../constants/purchaseStatusConstants'
import { cartActionTypes } from '../../constants/actionTypes'

/**
 * Adds product to the cart
 *
 * @param {Immutable.Map} state - Old state
 * @param {Object} action
 * @return {Immutable.Map} - New state
 */

function _addToCart (state, action) {
  const productId = action.payload
  const amount = state.getIn(['data', productId])
  return R.isNil(amount)
    ? state.setIn(['data', productId], 1)
    : state.updateIn(['data', productId], value => ++value)
}

/**
 * Adds batch of products to the cart
 *
 * @param {Immutable.Map} state - Old state
 * @param {Object} action
 * @return {Immutable.Map} - New state
 */

function _batchAddToCart (state, action) {
  const productIds = action.payload
  const cartProducts = productIds.reduce((acc, productId) => {
    acc[productId] = R.isNil(acc[productId]) ? 1 : ++acc[productId]
    return acc
  }, {})
  return state.setIn(['data'], Immutable.fromJS(cartProducts))
}

/**
 * Removes product from the cart
 *
 * @param {Immutable.Map} state - Old state
 * @param {Object} action
 * @return {Immutable.Map} - New state
 */

function _removeFromCart (state, action) {
  const productId = action.payload
  const amount = state.getIn(['data', productId])
  return amount === 1
    ? state.deleteIn(['data', productId])
    : state.updateIn(['data', productId], value => --value)
}

/**
 * Changes sorting in the cart
 *
 * @param {Immutable.Map} state - Old state
 * @param {Object} action
 * @return {Immutable.Map} - New state
 */

function _changeSorting (state, action) {
  const sortId = action.payload
  const currentSortId = state.getIn(['sorting', 'id'])

  if (currentSortId === sortId) {
    const currentSortDirection = state.getIn(['sorting', 'direction'])
    return state.setIn(['sorting'], Immutable.fromJS({
      id: sortId,
      direction: R.ifElse(
        R.equals(SortingConstants.Directions.DESCENDING),
        R.always(SortingConstants.Directions.ASCENDING),
        R.always(SortingConstants.Directions.DESCENDING)
      )(currentSortDirection)
    }))
  }
  return state.setIn(['sorting'], Immutable.fromJS({
    id: sortId,
    direction: SortingConstants.Directions.DESCENDING
  }))
}

// initial state
const initialState = Immutable.fromJS({
  data: Immutable.OrderedMap({}),
  sorting: {},
  status: ''
})

/**
 * Cart reducer
 *
 * @param {Immutable.Map} state - Old state
 * @param {Object} action
 * @return {Immutable.Map} - New state
 */

const cart = (state = initialState, action) => {
  switch (action.type) {
    case cartActionTypes.ADD_TO_CART:
      return _addToCart(state, action)
    case cartActionTypes.BATCH_ADD_TO_CART:
      return _batchAddToCart(initialState, action)
    case cartActionTypes.REMOVE_FROM_CART:
      return _removeFromCart(state, action)
    case cartActionTypes.CHANGE_SORTING:
      return _changeSorting(state, action)
    case cartActionTypes.PURCHASE_IN_PROGRESS:
      return state.set('status', PurchaseStatusConstants.PURCHASE_IN_PROGRESS)
    case cartActionTypes.PURCHASE_SUCCESS:
      return initialState.set('status', PurchaseStatusConstants.PURCHASE_SUCCESS)
    case cartActionTypes.PURCHASE_FAILED:
      return state.set('status', PurchaseStatusConstants.PURCHASE_FAILED)
    case cartActionTypes.CLEAR_PURCHASE_STATUS:
      return state.set('status', '')
    case cartActionTypes.CLEAR_CART:
      return initialState
    default:
      return state
  }
}

export default cart
