// libs
import { createStore, applyMiddleware, compose } from 'redux'
import Immutable from 'immutable'
import { persistStore, autoRehydrate } from 'redux-persist-immutable'
import localForage from 'localforage'

// middlewares
import { createLogger } from 'redux-logger'
import thunk from 'redux-thunk'

// reducer
import rootReducer from './rootReducer'

// helpers
import saveSubsetFilter from '../utils/saveSubsetFilter'

const middleware = [ thunk ]

if (process.env.NODE_ENV !== 'production') {
  middleware.push(createLogger())
}

// enable redux dev tools
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

// store enhancers
const enhancer = composeEnhancers(
  applyMiddleware(...middleware),
  autoRehydrate()
)

/**
 * @description
 * Creates redux store for holding application state
 *
 * @param {Object} [preloadedState] The initial state
 * @return {Object} Redux store
 */

const configureStore = (preloadedState = Immutable.Map()) => {
  const store = createStore(
    rootReducer,
    preloadedState,
    enhancer
  )

  /**
   * Redux-persist-immutable is used as a persistence layer
   */

  persistStore(store, {
    whitelist: ['cart'], // save only cart state
    debounce: 1000, // debounce 1000 ms for better performance
    transforms: [
      saveSubsetFilter(['data']) // save only data from cart
    ],
    storage: localForage // use localForage as a storage
  })

  return store
}

export default configureStore
