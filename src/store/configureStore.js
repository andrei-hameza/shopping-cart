// libs
import { createStore, applyMiddleware, compose } from 'redux'
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

// enable redux dev tools
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

// store enhancers
const enhancer = composeEnhancers(
  applyMiddleware(...middleware),
  localStorageEnhancer({})
)

/**
 * Creates redux store for holding application state
 *
 * @param {Object} [preloadedState]
 * @return {Object} store
 */

const configureStore = (preloadedState = {}) => {
  const store = createStore(
    rootReducer,
    preloadedState,
    enhancer
  )
  return store
}

export default configureStore
