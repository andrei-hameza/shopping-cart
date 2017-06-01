// libs
import React from 'react'
import { connect } from 'react-redux'
import Immutable from 'immutable'
import R from 'ramda'

// components
import CartArea from '../../components/cartArea'
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
      className={`sorting__${id}`}
      id={id}
      title={id}
      sortDirection={currentSorting.get('id') === id ? currentSorting.get('direction') : null}
      onSortChange={changeSort.bind(null, id)} />
  ))

  return (
    <CartArea>
      <button
        className='cart-area__button'
        onClick={autofillCart}>
        Random
      </button>
      <button onClick={clearCart}>
        Clear
      </button>
      <List className='cart-area__list'>
        <ListItem>
          <Sorting>
            {sortingItems}
          </Sorting>
        </ListItem>
        {productItems}
      </List>
      <CartAreaFooter>
        <TotalPrice price={productsTotalCost} />
        <button
          className='cart-area__purchase-button'
          onClick={purchaseProducts}>
          Purchase
        </button>
        <span>
          {status}
        </span>
      </CartAreaFooter>
    </CartArea>
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
