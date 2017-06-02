// libs
import { createStore, applyMiddleware, compose } from 'redux'
import Immutable from 'immutable'
import localStorageEnhancer from './localStorageEnhancer'

// middlewares
import { createLogger } from 'redux-logger'
import thunk from 'redux-thunk'

// reducer
import rootReducer from './rootReducer'

const middleware = [ thunk ]

if (process.env.NODE_ENV !== 'production') {
  middleware.push(createLogger())
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const enhancer = composeEnhancers(
  applyMiddleware(...middleware),
  localStorageEnhancer({})
)

const configureStore = () => {
  const store = createStore(
    rootReducer,
    Immutable.Map(),
    enhancer
  )
  return store
}

export default configureStore
