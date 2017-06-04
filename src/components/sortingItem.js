import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import R from 'ramda'
import { SortingConstants } from '../constants/sortingConstants'
import cn from 'classnames'

class SortingItem extends PureComponent {
  handleSortChange = () => {
    const {
      id,
      onSortChange
    } = this.props

    onSortChange(id)
  }

  render () {
    const {
      className,
      title,
      sortDirection,
    } = this.props

    return (
      <div
        className={cn(className, 'sorting-item')}
        onClick={this.handleSortChange}>
        <span className='sorting-item__title'>
          {title}
          <span className='sorting-item__icon'>
            {R.isNil(sortDirection) ? '' : R.ifElse(
              R.equals(SortingConstants.Directions.DESCENDING),
              R.always('↓'),
              R.always('↑')
            )(sortDirection)}
          </span>
        </span>
      </div>
    )
  }
}

SortingItem.propTypes = {
  title: PropTypes.string,
  id: PropTypes.string,
  sortDirection: PropTypes.string,
  onSortChange: PropTypes.func
}

export default SortingItem
