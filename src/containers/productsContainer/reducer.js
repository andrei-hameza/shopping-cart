import Immutable from 'immutable'

function _receiveData (state, action) {
  return state.set('data', Immutable.fromJS(action.payload))
}

const initialState = Immutable.fromJS({
  data: []
})

const products = (state = initialState, action) => {
  switch (action.type) {
    case 'TEST':
      return _receiveData(state, action)
    default:
      return state
  }
}

export default products
