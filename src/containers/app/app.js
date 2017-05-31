import React, { Component } from 'react'
import ProductsContainer from '../productsContainer'
import CartContainer from '../cartContainer'
import AppHeader from '../../components/appHeader'
import AppMain from '../../components/appMain'

class App extends Component {
  render () {
    return (
      <div className='shoping-cart-application l-wrap'>
        <AppHeader />
        <AppMain>
          <ProductsContainer />
          <CartContainer />
        </AppMain>
      </div>
    )
  }
}

export default App
