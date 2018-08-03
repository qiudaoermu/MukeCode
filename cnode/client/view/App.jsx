import React from 'react'
import PropTypes from 'prop-types'
import Route from '../config/router'
import MainAppbar from './layout/app-bar'

export default class App extends React.Component { //eslint-disable-line
  static contextTypes = {
    router: PropTypes.object,
  };
  render() {
    return (
      <div>
        <MainAppbar />,
        <Route key="routers" />
      </div>)
  }
}
