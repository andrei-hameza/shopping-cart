import React from 'react'
import { connect } from 'react-redux'
import Immutable from 'immutable'

import ProductsList from '../../components/productsList'
import ProductItem from '../../components/productItem'

import { removeProductFromCart } from './actions'
import { cartContainerSelector } from './selectors'

const CartContainer = ({ products = Immutable.List, removeProductFromCart }) => {
  const productItems = products.map((product) => (
    <li
      className='products-list__item'
      key={product.get('id')}>
      <ProductItem
        product={product}>
        <span className='product__count'>
          {`>>${product.get('count')}<<`}
        </span>
        <span onClick={() => removeProductFromCart(product.get('id'))}>X</span>
      </ ProductItem>
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

export default connect(
  cartContainerSelector,
  { removeProductFromCart }
)(CartContainer)
