import React from 'react'
import PropTypes from 'prop-types'
import R from 'ramda'
import { SortingConstants } from '../constants/sortingConstants'
import cn from 'classnames'

const SortingItem = ({ className, id, title, sortDirection, onSortChange }) => {
  return (
    <div
      className={cn(className, 'sorting-item')}
      onClick={onSortChange}>
      <span className='sorting-item__title'>
        {title}
        <span className='sorting-item__icon'>
          {R.isNil(sortDirection) ? ' ' : R.ifElse(
            R.equals(SortingConstants.Directions.DESCENDING),
            R.always('↓'),
            R.always('↑')
          )(sortDirection)}
        </span>
      </span>
    </div>
  )
}

SortingItem.propTypes = {
  title: PropTypes.string,
  id: PropTypes.string,
  sortDirection: PropTypes.string,
  onSortChange: PropTypes.func
}

export default SortingItem
