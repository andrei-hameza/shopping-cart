import React from 'react'
import PropTypes from 'prop-types'

const CartArea = ({ children, ...others }) => (
  <div className='cart-area l-sidebar grid-item' {...others}>
    {children}
  </div>
)

CartArea.propTypes = {
  children: PropTypes.node
}

export default CartArea
