import React from 'react'
import PropTypes from 'prop-types'

const ProductItem = ({ product, children }) => {
  const name = product.get('name')
  const price = product.get('price')

  return (
    <div className='product'>
      <span className='product__name'>
        {name}
      </span>
      <span className='product__price'>
        {price}
      </span>
      {children}
    </div>
  )
}

ProductItem.propTypes = {
  product: PropTypes.shape({
    name: PropTypes.string,
    price: PropTypes.number
  }),
  children: PropTypes.node
}

export default ProductItem
