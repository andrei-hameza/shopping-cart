import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'

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
      title
    } = this.props

    return (
      <button
        className={cn(className, 'button')}
        onClick={this.handleClick}>
        {title}
      </button>
    )
  }
}

Button.propTypes = {
  title: PropTypes.string,
  onClick: PropTypes.func,
  onClickParam: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.object,
    PropTypes.bool
  ])
}

export default Button
