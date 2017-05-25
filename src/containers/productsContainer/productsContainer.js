import React from 'react'
import { connect } from 'react-redux'
import {
  productsContainerSelector
} from './selectors'

const ProductsContainer = ({ products }) => {
  const items = products.map((product) => (<div key={product.get('id')}>{product.get('name')}</div>))
  return (<div>{items}</div>)
}

export default connect(
  productsContainerSelector
)(ProductsContainer)
