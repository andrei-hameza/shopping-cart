import React from 'react'
import PropTypes from 'prop-types'

const AppMain = ({children}) => (
  <main className='app-content'>
    {children}
  </main>
)

AppMain.propTypes = {
  children: PropTypes.node
}

export default AppMain
