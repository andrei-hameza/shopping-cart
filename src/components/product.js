import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import Button from './button'

class Product extends PureComponent {
  render () {
    const {
      id,
      name,
      snippet,
      price,
      onAddToCart
    } = this.props

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
          <Button
            className='product__purchase-button'
            title='Add To Cart'
            onClick={onAddToCart}
            onClickParam={id} />
        </div>
      </div>
    )
  }
}

Product.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  snippet: PropTypes.string,
  price: PropTypes.number,
  onAddToCart: PropTypes.func
}

export default Product
