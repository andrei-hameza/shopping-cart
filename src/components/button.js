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
      icon
    } = this.props

    const iconItem = icon && (
      <i className={icon}></i>
    )

    return (
      <button
        className={cn(className, 'button')}
        onClick={this.handleClick}>
        {title}
        {iconItem}
      </button>
    )
  }
}

Button.propTypes = {
  children: PropTypes.node,
  title: PropTypes.string,
  icon: PropTypes.string,
  onClick: PropTypes.func,
  onClickParam: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.object,
    PropTypes.bool
  ])
}

export default hideIfNoData(Button)
