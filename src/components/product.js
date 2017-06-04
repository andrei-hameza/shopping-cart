import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

class Product extends PureComponent {
  handleClick = () => {
    const {
      id,
      onAddToCart
    } = this.props
    onAddToCart(id)
  }

  render () {
    const {
      name,
      snippet,
      price
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
          <button
            className='product__purchase-button'
            onClick={this.handleClick}>
            Add To Cart
          </button>
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
