import React from 'react'
import { connect } from 'react-redux'
import Immutable from 'immutable'
import R from 'ramda'

import ProductsList from '../../components/productsList'
import ProductItem from '../../components/productItem'
import SortingItem from '../../components/sortingItem'

import {
  removeProductFromCart,
  changeSort
} from './actions'
import { cartContainerSelector } from './selectors'
import { SortingConstants } from '../../constants/sortingConstants'

const CartContainer = ({ products = Immutable.List, currentSorting, removeProductFromCart, changeSort }) => {
  const productItems = products.map((product) => (
    <li
      className='products-list__item'
      key={product.get('id')}>
      <ProductItem
        product={product}>
        <span className='product__amount'>
          {`>>${product.get('amount')}<<`}
        </span>
        <span onClick={() => removeProductFromCart(product.get('id'))}>X</span>
      </ ProductItem>
    </li>
  ))

  const sortingItems = R.values(SortingConstants.Types).map((id) => (
    <SortingItem
      key={id}
      id={id}
      title={id}
      sortDirection={currentSorting.get('id') === id ? currentSorting.get('direction') : null}
      onSortChange={changeSort.bind(null, id)} />
  ))

  return (
    <ProductsList>
      {sortingItems}
      <ul className='products-list'>
        {productItems}
      </ul>
    </ProductsList>
  )
}

export default connect(
  cartContainerSelector,
  { removeProductFromCart, changeSort }
)(CartContainer)
