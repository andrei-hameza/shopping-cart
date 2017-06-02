// libs
import React from 'react'
import { connect } from 'react-redux'
import Immutable from 'immutable'
import R from 'ramda'
import { compose, pure } from 'recompose'

// components
import CartArea from '../../components/cartArea'
import CartAreaHeader from '../../components/cartAreaHeader'
import CartAreaFooter from '../../components/cartAreaFooter'
import List from '../../components/list'
import ListItem from '../../components/listItem'
import CartProduct from '../../components/cartProduct'
import TotalPrice from '../../components/totalPrice'
import Sorting from '../../components/sorting'
import SortingItem from '../../components/sortingItem'

// actions
import {
  addToCart,
  removeFromCart,
  changeSort,
  clearCart,
  autofillCart,
  purchaseProducts
} from './actions'

// selectors
import { cartContainerSelector } from './selectors'

// constants
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

  console.log(products)
  // render product items in cart
  const productItems = products.map((product) => (
    <ListItem key={product.get('id')}>
      <CartProduct
        product={product}
        addToCart={addToCart}
        removeFromCart={removeFromCart} />
    </ListItem>
  ))

  // render sorting items in cart
  const sortingItems = R.values(SortingConstants.Types).map((id) => (
    <SortingItem
      key={id}
      className={`sorting__${id}`}
      id={id}
      title={id}
      sortDirection={currentSorting.get('id') === id ? currentSorting.get('direction') : null}
      onSortChange={changeSort.bind(null, id)} />
  ))

  // render products list in cart
  const productsList = R.ifElse(
    R.equals(0),
    R.always(null),
    R.always(
      <List className='cart-area__list'>
        <ListItem>
          <Sorting>
            {sortingItems}
          </Sorting>
        </ListItem>
        {productItems}
      </List>
    )
  )(products.size)

  // render purchase button in cart
  const purchaseButton = R.ifElse(
    R.equals(0),
    R.always(null),
    R.always(
      <button
        className='cart-area__purchase-button'
        onClick={purchaseProducts}>
        Purchase
      </button>
    )
  )(products.size)

  return (
    <CartArea>
      <CartAreaHeader className='cart-area__header'>
        <button
          className='cart-header__autofill-button'
          onClick={autofillCart}>
          Autofill
        </button>
        <button
          className='cart-header__clear-button'
          onClick={clearCart}>
          Clear
        </button>
      </CartAreaHeader>
      {productsList}
      <CartAreaFooter>
        <TotalPrice price={productsTotalCost} />
        {purchaseButton}
        <span>
          {status}
        </span>
      </CartAreaFooter>
    </CartArea>
  )
}

export default compose(
  connect(
    cartContainerSelector,
    {
      addToCart,
      removeFromCart,
      changeSort,
      clearCart,
      purchaseProducts,
      autofillCart
    }
  ),
  pure
)(CartContainer)
