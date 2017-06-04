import { compose, mapProps, branch, renderNothing } from 'recompose'
import R from 'ramda'

const omitProps = keys => mapProps(props => R.omit(keys)(props))

const hideIfNoData = hasNoData =>
  branch(
    hasNoData,
    renderNothing,
    omitProps('isHidden')
  )

export default compose(hideIfNoData(props => props.isHidden))
