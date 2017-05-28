import React, { Component } from 'react'
import ProductsContainer from '../productsContainer'
import CartContainer from '../cartContainer'
import AppHeader from '../../components/appHeader'

class App extends Component {
  render () {
    return (
      <div className='shoping-cart-application'>
        <AppHeader />
        <ProductsContainer />
        <CartContainer />
      </div>
    )
  }
}

export default App
