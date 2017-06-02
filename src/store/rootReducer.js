// libs
import Immutable from 'immutable'
import { combineReducers } from 'redux-immutable'

// reducers
import productsReducer from '../containers/productsContainer/reducer'
import cartReducer from '../containers/cartContainer/reducer'

const initialState = Immutable.Map({
  products: {},
  cart: {}
})

const rootReducer = combineReducers({
  products: productsReducer,
  cart: cartReducer
}, initialState)

export default rootReducer
