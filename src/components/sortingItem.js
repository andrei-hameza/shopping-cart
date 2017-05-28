import React from 'react'
import PropTypes from 'prop-types'
import R from 'ramda'
import { SortingConstants } from '../constants/sortingConstants'

const SortingItem = ({ id, title, sortDirection, onSortChange }) => {
  return (
    <span
      className='sorting-item'
      onClick={onSortChange}>
      <span className='sorting-item__title'>
        {` -- ${title} -- `}
      </span>
      <span className='sorting-item__icon'>
        {R.isNil(sortDirection) ? '' : R.ifElse(
          R.equals(SortingConstants.Directions.DESCENDING),
          R.always('↓'),
          R.always('↑')
        )(sortDirection)}
      </span>
    </span>
  )
}

SortingItem.propTypes = {
  title: PropTypes.string,
  id: PropTypes.string,
  sortDirection: PropTypes.string,
  onSortChange: PropTypes.func
}

export default SortingItem
