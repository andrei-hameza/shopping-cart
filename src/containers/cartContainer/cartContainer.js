import React from 'react'
import { connect } from 'react-redux'
import Immutable from 'immutable'
import R from 'ramda'

import List from '../../components/list'
import ListItem from '../../components/listItem'
import CartProduct from '../../components/cartProduct'
import SortingItem from '../../components/sortingItem'

import {
  addToCart,
  removeFromCart,
  changeSort,
  clearCart,
  autofillCart,
  purchaseProducts
} from './actions'
import { cartContainerSelector } from './selectors'
import { SortingConstants } from '../../constants/sortingConstants'

const CartContainer = ({
  products = Immutable.List(),
  currentSorting,
  productsTotalCost,
  status,
  addToCart,
  removeFromCart,
  changeSort,
  clearCart,
  purchaseProducts,
  autofillCart
}) => {
  const productItems = products.map((product) => (
    <ListItem key={product.get('id')}>
      <CartProduct
        product={product}
        addToCart={addToCart}
        removeFromCart={removeFromCart} />
    </ListItem>
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

    <List className='cart-area__list l-sidebar grid-item'>
      <button
        className='cart-area__button'
        onClick={autofillCart}>
        Random
      </button>
      <button onClick={clearCart}>
        Clear
      </button>
      {sortingItems}
      <ul className='products-list'>
        {productItems}
      </ul>
      <span>
        Total: {productsTotalCost}
      </span>
      <button onClick={purchaseProducts}>
        Purchase
      </button>
      <span>
        {status}
      </span>
    </List>
  )
}

export default connect(
  cartContainerSelector,
  {
    addToCart,
    removeFromCart,
    changeSort,
    clearCart,
    purchaseProducts,
    autofillCart
  }
)(CartContainer)
