import React from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'

const ListItem = ({ children, className, ...others }) => (
  <li className={cn('list__item', className)} {...others}>
    {children}
  </li>
)

ListItem.propTypes = {
  children: PropTypes.node
}

export default ListItem
