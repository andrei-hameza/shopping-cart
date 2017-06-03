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
 * Creates redux store for holding application state
 *
 * @param {Object} [preloadedState]
 * @return {Object} store
 */

const configureStore = (preloadedState = Immutable.Map()) => {
  const store = createStore(
    rootReducer,
    preloadedState,
    enhancer
  )

  persistStore(store, {
    whitelist: ['cart'],
    debounce: 1000,
    transforms: [
      saveSubsetFilter(['data'])
    ],
    storage: localForage
  })

  return store
}

export default configureStore
