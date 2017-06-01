import React from 'react'
import PropTypes from 'prop-types'

const TotalPrice = ({ price, ...others }) => (
  <div className='total-price' {...others}>
    <div className='total-price__label'>
      Total:
    </div>
    <div className='total-price__value'>
      {`$ ${price}`}
    </div>
  </div>
)

TotalPrice.propTypes = {
  price: PropTypes.number
}

export default TotalPrice
