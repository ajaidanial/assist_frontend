import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import PropTypes from 'prop-types'

const ProtectedLayoutRoute = (props) => {
  /**
   * This `Route` verifies if the verified users is signed in or not.
   *
   * If the home page or any other page that has to be accessed by verified users
   * is opened directly, this checks the token if not verified redirects to the sign in page.
   *
   * This will not allow the user to visit the protected user pages => if the user is not verified
   *
   * Also verified the token everytime the user vists a route
   */
  const { layout: Layout, component: Component, ...rest } = props

  return (
    <Route
      {...rest}
      render={(props) => {
        if (sessionStorage.getItem('token')) {
          // TODO: validate auth token operations here
          // Renders the current page with the layout.
          return (
            <Layout>
              <Component {...props} />
            </Layout>
          )
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

ProtectedLayoutRoute.propTypes = {
  component: PropTypes.func,
  layout: PropTypes.func,
  location: PropTypes.object
}

export default ProtectedLayoutRoute
