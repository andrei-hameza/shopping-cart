// libs
import React, { Component } from 'react'
import { connect } from 'react-redux'

// components
import ProductsContainer from '../productsContainer'
import CartContainer from '../cartContainer'
import AppHeader from '../../components/appHeader'
import AppMain from '../../components/appMain'

// actions
import { setData } from '../productsContainer/actions'

// services
import shoppingCartService from '../../services/shoppingCartService'

class App extends Component {
  componentDidMount () {
    const { setData } = this.props

    // fetch fake data
    shoppingCartService
      .getData()
      .then(setData)
  }

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

export default connect(null, { setData })(App)
