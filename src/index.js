import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import { createLogger } from 'redux-logger'
import appReducer from './containers/app/reducer'
import App from './containers/app'
import registerServiceWorker from './utils/registerServiceWorker'
import shoppingCartService from './services/shoppingCartService'
import './index.css'

const middleware = []

if (process.env.NODE_ENV !== 'production') {
  middleware.push(createLogger())
}

const store = createStore(
  appReducer,
  applyMiddleware(...middleware)
)

// TODO: move to routing onEnter
shoppingCartService.getData().then((data) => {
  store.dispatch({
    type: 'RECEIVE_DATA',
    payload: data
  })
})

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)

registerServiceWorker()
