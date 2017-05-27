import React from 'react'
import PropTypes from 'prop-types'

const ProductsList = ({ children }) => (
  <div className='products-area'>
    <h3 className='products-area__title'>
      {'Products'}
    </h3>
    <div className='products-area__list'>
      {children}
    </div>
  </div>
)

ProductsList.propTypes = {
  children: PropTypes.node
}

export default ProductsList
