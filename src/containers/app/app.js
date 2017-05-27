import React, { Component } from 'react'
import ProductsContainer from '../productsContainer'
import './app.css'

class App extends Component {
  render () {
    return (
      <div className='shop'>
        <ProductsContainer />
      </div>
    )
  }
}

export default App
