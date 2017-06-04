import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import Button from './button'

class CartProduct extends PureComponent {
  render () {
    const {
      id,
      name,
      amount,
      price,
      onAddToCart,
      onRemoveFromCart
    } = this.props

    return (
      <div className='cart-product'>
        <h4 className='cart-product__name'>
          {name}
        </h4>
        <div className='cart-product__counter'>
          <Button
            className='cart-product__button'
            onClick={onRemoveFromCart}
            onClickParam={id} >
            <i className='fa fa-minus' />
          </Button>
          <div className='cart-product__amount'>{amount}</div>
          <Button
            className='cart-product__button'
            onClick={onAddToCart}
            onClickParam={id} >
            <i className='fa fa-plus' />
          </Button>
        </div>
        <div className='cart-product__price'>
          {`$ ${price}`}
        </div>
      </div>
    )
  }
}

CartProduct.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  amount: PropTypes.number,
  price: PropTypes.number,
  onAddToCart: PropTypes.func,
  onRemoveFromCart: PropTypes.func
}

export default CartProduct
