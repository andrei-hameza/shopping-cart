import React from 'react'
import { connect } from 'react-redux'
import Immutable from 'immutable'

import ProductsList from '../../components/productsList'
import ProductItem from '../../components/productItem'

import { addToCart, autofillCart } from '../cartContainer/actions'
import { productsContainerSelector } from './selectors'

const ProductsContainer = ({ products = Immutable.List, addToCart, autofillCart }) => {
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
      <button
        onClick={() => autofillCart()}>
        Random
      </button>
      <ul className='products-list'>
        {productItems}
      </ul>
    </ProductsList>
  )
}

export default connect(
  productsContainerSelector,
  { addToCart, autofillCart }
)(ProductsContainer)
