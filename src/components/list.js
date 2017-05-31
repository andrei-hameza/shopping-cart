import React from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'

const List = ({ children, className, ...others }) => (
  <ul className={cn('list', className)} {...others}>
    {children}
  </ul>
)

List.propTypes = {
  children: PropTypes.node
}

export default List
