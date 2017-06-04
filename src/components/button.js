import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'
import hideIfNoData from './hideIfNoData'

class Button extends PureComponent {
  handleClick = (e) => {
    const {
      onClick,
      onClickParam
    } = this.props
    e.preventDefault()
    onClick(onClickParam)
  }

  render () {
    const {
      className,
      title,
      children
    } = this.props

    return (
      <button
        className={cn(className, 'button')}
        onClick={this.handleClick}>
        {title}
        {children}
      </button>
    )
  }
}

Button.propTypes = {
  children: PropTypes.node,
  title: PropTypes.string,
  onClick: PropTypes.func,
  onClickParam: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.object,
    PropTypes.bool
  ])
}

export default hideIfNoData(Button)
