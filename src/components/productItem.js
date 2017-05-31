import React from 'react'
import PropTypes from 'prop-types'

const ProductItem = ({ product, children }) => {
  const name = product.get('name')
  const price = product.get('price')
  const snippet = product.get('snippet')

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
        {children}
      </div>
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
