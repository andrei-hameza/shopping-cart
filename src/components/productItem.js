import React from 'react'
import PropTypes from 'prop-types'

const ProductItem = ({ product, onAddToCart }) => {
  const name = product.get('name')
  const price = product.get('price')

  return (
    <div className='product'>
      <h4 className='product__name'>
        {name}
      </h4>
      <span className='product__price'>
        {price}
      </span>
      <button onClick={onAddToCart}>
        {'Add'}
      </button>
    </div>
  )
}

ProductItem.propTypes = {
  product: PropTypes.shape({
    name: PropTypes.string,
    price: PropTypes.number
  }),
  onAddToCartClicked: PropTypes.func
}

export default ProductItem
