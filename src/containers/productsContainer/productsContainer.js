// libs
import React from 'react'
import { connect } from 'react-redux'
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
  const isHidden = products.size === 0

  const productItems = products.toList().map((product) => {
    const id = product.get('id')
    const name = product.get('name')
    const snippet = product.get('snippet')
    const price = product.get('price')
    return (
      <ListItem key={id}>
        <Product
          id={id}
          name={name}
          snippet={snippet}
          price={price}
          onAddToCart={addToCart} />
      </ListItem>
    )
  })

  return (
    <ProductsArea>
      <Heading
        title='Products'
        className='products-area__title' />
      <List
        isHidden={isHidden}
        className='products-area__list'>
        {productItems}
      </List>
    </ProductsArea>
  )
}

export default connect(
  productsContainerSelector,
  { addToCart }
)(ProductsContainer)
