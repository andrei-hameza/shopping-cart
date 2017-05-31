import React from 'react'
import PropTypes from 'prop-types'

const CartProduct = ({ product }) => {
  const name = product.get('name')
  const snippet = product.get('snippet')
  const price = product.get('price')

  return (
    <div className='product'>
      <div className='product__left'>
        <h4 className='product__name'>
          {name}
        </h4>
        <p className='product__info'>
          {snippet}
        </p>
      </div>
      <div className='product__right'>
        <span className='product__price'>
          {`$ ${price}`}
        </span>
      </div>
    </div>
  )
}

CartProduct.propTypes = {
  product: PropTypes.shape({
    name: PropTypes.string,
    snippet: PropTypes.string,
    price: PropTypes.number
  })
}

export default CartProduct
