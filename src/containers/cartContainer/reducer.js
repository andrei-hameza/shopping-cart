import Immutable from 'immutable'
import R from 'ramda'

function _addToCart (state, action) {
  const productId = action.payload
  const id = state.getIn(['data', productId])
  return R.isNil(id)
    ? state.setIn(['data', productId], 1)
    : state.updateIn(['data', productId], value => ++value)
}

const initialState = Immutable.fromJS({
  data: Immutable.OrderedMap({})
})

const products = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_TO_CART':
      return _addToCart(state, action)
    default:
      return state
  }
}

export default products
