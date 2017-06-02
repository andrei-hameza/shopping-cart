import { createLogger } from 'redux-logger'
import thunk from 'redux-thunk'
import Immutable from 'immutable'
import { createStore, applyMiddleware, compose } from 'redux'
import rootReducer from './rootReducer'

const middleware = [ thunk ]

if (process.env.NODE_ENV !== 'production') {
  middleware.push(createLogger())
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const enhancer = composeEnhancers(
  applyMiddleware(...middleware)
)

const configureStore = () => {
  let persistedState

  // TODO: move to separate enhancer and check private mode
  try {
    const serializedState = window.localStorage.getItem('shoppingCartApp')

    if (serializedState === null) {
      persistedState = undefined
    } else {
      persistedState = JSON.parse(window.localStorage.getItem('shoppingCartApp'))
    }
  } catch (e) {
    persistedState = undefined
  }

  const store = createStore(
    rootReducer,
    Immutable.fromJS(persistedState),
    enhancer
  )

  store.subscribe(() => {
    window
      .localStorage
      .setItem('shoppingCartApp', JSON.stringify({
        cart: {
          data: store.getState().getIn(['cart', 'data']).toJS(),
          sorting: {},
          status: ''
        }
      }))
  })

  return store
}

export default configureStore
