import React from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'

const CartAreaHeader = ({ children, className, ...others }) => (
  <div className={cn(className, 'cart-header')} {...others}>
    <div className='cart-header__icon'>
      <i className='fa fa-cart-plus' />
    </div>
    {children}
  </div>
)

CartAreaHeader.propTypes = {
  children: PropTypes.node
}

export default CartAreaHeader
