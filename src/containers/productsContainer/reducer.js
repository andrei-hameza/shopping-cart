import Immutable from 'immutable'
import R from 'ramda'

function _receiveData (state, action) {
  const data = action.payload
  const mappedData = data.reduce((acc, item) => R.merge(acc, R.objOf(item.id, item)), {})
  return state.set('data', Immutable.fromJS(mappedData))
}

const initialState = Immutable.fromJS({
  data: Immutable.OrderedMap()
})

const products = (state = initialState, action) => {
  switch (action.type) {
    case 'RECEIVE_DATA':
      return _receiveData(state, action)
    default:
      return state
  }
}

export default products
