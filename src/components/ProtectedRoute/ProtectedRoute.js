import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import PropTypes from 'prop-types'
// import { RouteWithLayout } from '../'

const ProtectedRoute = ({ component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        if (localStorage.getItem('token')) {
          // TODO: validate auth operations here
          // Renders the current page.
          return React.createElement(component, props)
        } else {
          /**
           * Auth token is not in sessionStorage.
           * Redirect to sign-in page.
           */
          return (
            <Redirect
              to={{
                pathname: '/sign-in',
                state: { from: props.location }
              }}
            />
          )
        }
      }}
    />
  )
}

ProtectedRoute.propTypes = {
  component: PropTypes.object,
  location: PropTypes.object
}

export default ProtectedRoute
