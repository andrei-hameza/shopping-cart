import React from 'react'
import PropTypes from 'prop-types'

const Product = ({ product, addToCart }) => {
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
        <button
          className='product__purchase-button'
          onClick={addToCart}>
          Add To Cart
        </button>
      </div>
    </div>
  )
}

Product.propTypes = {
  product: PropTypes.shape({
    name: PropTypes.string,
    snippet: PropTypes.string,
    price: PropTypes.number
  }),
  addToCart: PropTypes.func.isRequired
}

export default Product
