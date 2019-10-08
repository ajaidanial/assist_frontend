/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react'
import { Redirect, Route } from 'react-router-dom'
// import RouteWithLayout from '../components/RouteWithLayout'

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

export default ProtectedRoute
