import React from 'react'
import { connect } from 'react-redux'
import Immutable from 'immutable'

import ProductsList from '../../components/productsList'
import ProductItem from '../../components/productItem'

import {
  productsContainerSelector
} from './selectors'

const ProductsContainer = ({ products = Immutable.List, addToCart }) => {
  const productItems = products.map((product) => (
    <li
      className='products-list__item'
      key={product.get('id')}>
      <ProductItem
        product={product}>
        <button onClick={() => addToCart(product.get('id'))}>
          {'Add'}
        </button>
      </ProductItem>
    </li>
  ))

  return (
    <ProductsList>
      <ul className='products-list'>
        {productItems}
      </ul>
    </ProductsList>
  )
}

const addToCart = id => (
  {
    type: 'ADD_TO_CART',
    payload: id
  }
)

export default connect(
  productsContainerSelector,
  {
    addToCart
  }
)(ProductsContainer)
