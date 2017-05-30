import React from 'react'
import PropTypes from 'prop-types'

const AppMain = ({children}) => (
  <main className='app-content l-wrap l-app'>
    {children}
  </main>
)

AppMain.propTypes = {
  children: PropTypes.node
}

export default AppMain
