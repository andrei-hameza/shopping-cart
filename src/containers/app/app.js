import React, { Component } from 'react'
import ProductsContainer from '../productsContainer'
import CartContainer from '../cartContainer'
import './app.css'

class App extends Component {
  render () {
    return (
      <div className='shop'>
        <ProductsContainer />
        <CartContainer />
      </div>
    )
  }
}

export default App
