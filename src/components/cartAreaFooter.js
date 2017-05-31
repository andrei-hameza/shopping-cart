import React from 'react'
import PropTypes from 'prop-types'

const CartAreaFooter = ({ children, ...others }) => (
  <div className='cart-area__footer' {...others}>
    {children}
  </div>
)

CartAreaFooter.propTypes = {
  children: PropTypes.node
}

export default CartAreaFooter
