// libs
import Immutable from 'immutable'
import { combineReducers } from 'redux-immutable'

// reducers
import productsReducer from '../containers/productsContainer/reducer'
import cartReducer from '../containers/cartContainer/reducer'

// application initial state
const initialState = Immutable.Map({
  products: {},
  cart: {}
})

// application root reducer
const rootReducer = combineReducers({
  products: productsReducer,
  cart: cartReducer
}, initialState)

export default rootReducer
