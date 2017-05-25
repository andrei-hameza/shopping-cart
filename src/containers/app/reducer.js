import R from 'ramda'
import Immutable from 'immutable'
import products from '../productsContainer/reducer'

const reducers = {
  products
}

const keys = R.keys(reducers)

export default function appReducer (state = Immutable.Map(), action) {
  const newState = R.reduce((currentState, key) => {
    return currentState.update(key, (stateChunk) => reducers[key](stateChunk, action, state))
  }, state, keys)
  return newState
}
