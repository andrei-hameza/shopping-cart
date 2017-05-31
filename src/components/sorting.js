import React from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'

const Sorting = ({ children, className, ...others }) => (
  <div className={cn(className, 'sorting')} {...others}>
    {children}
  </div>
)

Sorting.propTypes = {
  children: PropTypes.node
}

export default Sorting
