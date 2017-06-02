// libs
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'

// components
import App from './containers/app'

// helpers
import registerServiceWorker from './utils/registerServiceWorker'
import configureStore from './store/configureStore'

// styles
import './styles/index.css'

const store = configureStore()

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)

registerServiceWorker()
