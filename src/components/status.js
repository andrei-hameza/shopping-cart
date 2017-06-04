import React from 'react'
import PropTypes from 'prop-types'

import { compose, pure } from 'recompose'
import hideIfNoData from './hideIfNoData'

const Status = ({ status, ...others }) => (
  <div {...others}>
    {status}
  </div>
)

Status.propTypes = {
  status: PropTypes.string
}

export default compose(hideIfNoData, pure)(Status)
