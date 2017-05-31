import React from 'react'
import { connect } from 'react-redux'
import { compose, pure } from 'recompose'
import Immutable from 'immutable'

import ProductsArea from '../../components/productsArea'
import ProductsList from '../../components/productsList'
import ProductItem from '../../components/productItem'
import Heading from '../../components/heading'

import { addToCart, autofillCart } from '../cartContainer/actions'
import { productsContainerSelector } from './selectors'

const ProductsContainer = ({ products = Immutable.Map(), addToCart, autofillCart }) => {
  const productItems = products.toList().map((product) => {
    const id = product.get('id')
    return (
      <li
        className='products-list__item'
        key={id}>
        <ProductItem
          product={product}>
          <button
            className='product__purchase-button'
            onClick={addToCart.bind(null, id)}>
            Add To Cart
          </button>
        </ProductItem>
      </li>
    )
  })

  return (
    <ProductsArea>
      <button
        className='products-area__button'
        onClick={autofillCart}>
        Random
      </button>
      <Heading title='Products' className='products-area__title' />
      <ProductsList className='products-area__list'>
        <ul className='products-list'>
          {productItems}
        </ul>
      </ProductsList>
    </ProductsArea>
  )
}

export default compose(
  connect(
    productsContainerSelector,
    { addToCart, autofillCart }
  ),
  pure
)(ProductsContainer)
