import Immutable from 'immutable'
import R from 'ramda'
import { SortingConstants } from '../../constants/sortingConstants'

function _addToCart (state, action) {
  const productId = action.payload
  const amount = state.getIn(['data', productId])
  return R.isNil(amount)
    ? state.setIn(['data', productId], 1)
    : state.updateIn(['data', productId], value => ++value)
}

function _batchAddToCart (state, action) {
  const productIds = action.payload
  const cartProducts = productIds.reduce((acc, productId) => {
    acc[productId] = R.isNil(acc[productId]) ? 1 : ++acc[productId]
    return acc
  }, {})
  return state.setIn(['data'], Immutable.fromJS(cartProducts))
}

function _removeFromCart (state, action) {
  const productId = action.payload
  const amount = state.getIn(['data', productId])
  return amount === 1
    ? state.deleteIn(['data', productId])
    : state.updateIn(['data', productId], value => --value)
}

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

const initialState = Immutable.fromJS({
  data: Immutable.OrderedMap({}),
  sorting: {},
  status: ''
})

export const cart = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_TO_CART':
      return _addToCart(state, action)
    case 'BATCH_ADD_TO_CART':
      return _batchAddToCart(state, action)
    case 'REMOVE_FROM_CART':
      return _removeFromCart(state, action)
    case 'CHANGE_SORTING':
      return _changeSorting(state, action)
    case 'PURCHASE_IN_PROGRESS':
      return state.set('status', 'Processing...')
    case 'PURCHASE_SUCCESS':
      return initialState.set('status', 'Purchase completed')
    case 'PURCHASE_FAILED':
      return state.set('status', 'Purchase failed')
    case 'CLEAR_PURCHASE_STATUS':
    case 'CLEAR_CART':
      return initialState
    default:
      return state
  }
}
