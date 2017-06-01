import React from 'react'
import ReactDOM from 'react-dom'
import Immutable from 'immutable'
import { createStore, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux'
import { createLogger } from 'redux-logger'
import thunk from 'redux-thunk'
import appReducer from './containers/app/reducer'
import App from './containers/app'
import registerServiceWorker from './utils/registerServiceWorker'
import './styles/index.css'

const middleware = [ thunk ]

if (process.env.NODE_ENV !== 'production') {
  middleware.push(createLogger())
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const enhancer = composeEnhancers(
  applyMiddleware(...middleware)
)

let persistedState

// TODO: move to separate enhancer and check private mode
try {
  persistedState = window.localStorage.getItem('shoppingCartApp')
    ? JSON.parse(window.localStorage.getItem('shoppingCartApp')) || {}
    : {}
} catch (e) {
  persistedState = {}
}

const store = createStore(
  appReducer,
  Immutable.fromJS(persistedState),
  enhancer
)

store.subscribe(() => {
  window.localStorage
    .setItem('shoppingCartApp', JSON.stringify({
      cart: {
        data: store.getState().getIn(['cart', 'data']).toJS(),
        sorting: {},
        status: ''
      }
    })
  )
})

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)

registerServiceWorker()
