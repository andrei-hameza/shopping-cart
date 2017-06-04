import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

class CartProduct extends PureComponent {
  handleAddToCart = () => {
    const {
      id,
      onAddToCart
    } = this.props
    onAddToCart(id)
  }

  handleRemoveFromCart = () => {
    const {
      id,
      onRemoveFromCart
    } = this.props
    onRemoveFromCart(id)
  }

  render () {
    const {
      name,
      amount,
      price
    } = this.props

    return (
      <div className='cart-product'>
        <h4 className='cart-product__name'>
          {name}
        </h4>
        <div className='cart-product__counter'>
          <button
            className='cart-product__button'
            onClick={this.handleRemoveFromCart}>
            <i className='fa fa-minus' />
          </button>
          <div className='cart-product__amount'>{amount}</div>
          <button
            className='cart-product__button'
            onClick={this.handleAddToCart}>
            <i className='fa fa-plus' />
          </button>
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
