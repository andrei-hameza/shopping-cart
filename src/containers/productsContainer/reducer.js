import Immutable from 'immutable'
import R from 'ramda'

/**
 * Adds received data to the store
 *
 * @param {Immutable.Map} [state] old state
 * @param {Object} [action]
 * @return {Immutable.Map} new state
 */

function _receiveData (state, action) {
  const data = action.payload
  const mappedData = data.reduce((acc, item) => R.merge(acc, R.objOf(item.id, item)), {})
  return state.set('data', Immutable.fromJS(mappedData))
}

const initialState = Immutable.fromJS({
  data: Immutable.OrderedMap()
})

/**
 * Products reducer
 *
 * @param {Immutable.Map} [state] old state
 * @param {Object} [action]
 * @return {Immutable.Map} new state
 */

const products = (state = initialState, action) => {
  switch (action.type) {
    case 'RECEIVE_DATA':
      return _receiveData(state, action)
    default:
      return state
  }
}

export default products
