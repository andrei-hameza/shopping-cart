import React from 'react'
import PropTypes from 'prop-types'

import hideIfNoData from './hideIfNoData'

const Status = ({ status, ...others }) => (
  <div {...others}>
    {status}
  </div>
)

Status.propTypes = {
  status: PropTypes.string
}

export default hideIfNoData(Status)
