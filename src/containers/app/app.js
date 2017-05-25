import React, { Component } from 'react'
import ProductsContainer from '../productsContainer'
import './app.css'

class App extends Component {
  render () {
    return (
      <div className='App'>
        <div className='App-header'>
          <h2>Welcome to React</h2>
        </div>
        <ProductsContainer />
      </div>
    )
  }
}

export default App
