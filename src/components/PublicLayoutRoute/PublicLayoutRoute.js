import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import PropTypes from 'prop-types'

const PublicLayoutRoute = (props) => {
  /**
   * This `Route` verifies if the verified users is signed in or not.
   *
   * If the sign in page or any other page that can be accessed publically by users
   * is opened directly, this checks the token if not verified redirects to the home page.
   *
   * This will not allow the user to visit the public user pages => if the user is verified
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
          /**
           * Auth token is in sessionStorage.
           * Redirect to home page.
           */
          return (
            <Redirect
              to={{
                pathname: '/',
                state: { from: props.location }
              }}
            />
          )
        } else {
          // Renders the current page with the layout.
          return (
            <Layout>
              <Component {...props} />
            </Layout>
          )
        }
      }}
    />
  )
}

PublicLayoutRoute.propTypes = {
  component: PropTypes.func,
  layout: PropTypes.func,
  location: PropTypes.object
}

export default PublicLayoutRoute
