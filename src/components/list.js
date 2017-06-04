import React from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'
import hideIfNoData from './hideIfNoData'

const List = ({ children, className, ...others }) => (
  <ul className={cn('list', className)} {...others}>
    {children}
  </ul>
)

List.propTypes = {
  children: PropTypes.node
}

export default hideIfNoData(List)
