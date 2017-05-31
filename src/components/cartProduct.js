import React from 'react'
import PropTypes from 'prop-types'

const CartProduct = ({ product }) => {
  const name = product.get('name')
  const amount = product.get('amount')
  const price = product.get('price')

  return (
    <div className='cart-product'>
      <h4 className='cart-product__name'>
        {name}
      </h4>
      <div className='cart-product__counter'>
        <button className='cart-product__button'>
          <i className='fa fa-minus' />
        </button>
        <div className='cart-product__amount'>{amount}</div>
        <button className='cart-product__button'>
          <i className='fa fa-plus' />
        </button>
      </div>
      <div className='cart-product__price'>
        {`$ ${price}`}
      </div>
    </div>
  )
}

CartProduct.propTypes = {
  product: PropTypes.shape({
    name: PropTypes.string,
    amount: PropTypes.number,
    price: PropTypes.number
  })
}

export default CartProduct
