import React from 'react'
import PropTypes from 'prop-types'

const Heading = ({ title, ...others }) => (
  <h3 {...others}>
    {title}
  </h3>
)

Heading.propTypes = {
  title: PropTypes.string
}

export default Heading
