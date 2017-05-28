import Immutable from 'immutable'
import R from 'ramda'
import { SortingConstants } from '../../constants/sortingConstants'

function _addToCart (state, action) {
  const productId = action.payload
  const id = state.getIn(['data', productId])
  return R.isNil(id)
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
  return state.deleteIn(['data', action.payload])
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
  sorting: {}
})

const products = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_TO_CART':
      return _addToCart(state, action)
    case 'BATCH_ADD_TO_CART':
      return _batchAddToCart(state, action)
    case 'REMOVE_FROM_CART':
      return _removeFromCart(state, action)
    case 'CHANGE_SORTING':
      return _changeSorting(state, action)
    case 'CLEAR_CART':
      return initialState
    default:
      return state
  }
}

export default products
