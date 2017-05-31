// libs
import React from 'react'
import { connect } from 'react-redux'
import { compose, pure } from 'recompose'
import Immutable from 'immutable'

// components
import ProductsArea from '../../components/productsArea'
import List from '../../components/list'
import ListItem from '../../components/listItem'
import Product from '../../components/product'
import Heading from '../../components/heading'

// actions
import { addToCart } from '../cartContainer/actions'

// selectors
import { productsContainerSelector } from './selectors'

const ProductsContainer = ({ products = Immutable.Map(), addToCart }) => {
  const productItems = products.toList().map((product) => {
    const id = product.get('id')
    return (
      <ListItem key={id}>
        <Product
          product={product}
          addToCart={addToCart.bind(null, id)} />
      </ListItem>
    )
  })

  return (
    <ProductsArea>
      <Heading title='Products' className='products-area__title' />
      <List className='products-area__list'>
        {productItems}
      </List>
    </ProductsArea>
  )
}

export default compose(
  connect(
    productsContainerSelector,
    { addToCart }
  ),
  pure
)(ProductsContainer)
