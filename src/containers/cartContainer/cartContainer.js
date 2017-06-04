// libs
import React from 'react'
import { connect } from 'react-redux'
import Immutable from 'immutable'
import R from 'ramda'

// components
import Button from '../../components/button'
import CartArea from '../../components/cartArea'
import CartAreaHeader from '../../components/cartAreaHeader'
import CartAreaFooter from '../../components/cartAreaFooter'
import CartProduct from '../../components/cartProduct'
import Sorting from '../../components/sorting'
import SortingItem from '../../components/sortingItem'
import List from '../../components/list'
import ListItem from '../../components/listItem'
import TotalPrice from '../../components/totalPrice'

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
  const isHidden = products.size === 0

  // render product items in cart
  const productItems = !isHidden && products.map((product) => {
    const id = product.get('id')
    const name = product.get('name')
    const amount = product.get('amount')
    const price = product.get('price')

    return (
      <ListItem key={id}>
        <CartProduct
          id={id}
          name={name}
          amount={amount}
          price={price}
          onAddToCart={addToCart}
          onRemoveFromCart={removeFromCart} />
      </ListItem>
    )
  })

  // TODO: refactoring Sorting and SortingItem
  // TODO: add status component
  // render sorting items in cart
  const sortingItems = !isHidden && R.values(SortingConstants.Types).map((id) => (
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
      <CartAreaHeader className='cart-area__header'>
        <Button
          className='cart-header__autofill-button'
          title='Autofill'
          onClick={autofillCart} />
        <Button
          className='cart-header__clear-button'
          title='Clear'
          isHidden={isHidden}
          onClick={clearCart} />
      </CartAreaHeader>
      <List
        isHidden={isHidden}
        className='cart-area__list'>
        <ListItem>
          <Sorting>
            {sortingItems}
          </Sorting>
        </ListItem>
        {productItems}
      </List>
      <CartAreaFooter>
        <TotalPrice price={productsTotalCost} />
        <Button
          className='cart-area__purchase-button'
          title='Purchase'
          isHidden={isHidden}
          onClick={purchaseProducts} />
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
