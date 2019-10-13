/* eslint-disable no-console */
import React, { useState, useEffect } from 'react'
import { Link as RouterLink, withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import validate from 'validate.js'
import { makeStyles } from '@material-ui/styles'
import { Grid, Button, TextField, Link, Typography } from '@material-ui/core'

import { schema } from './schema' // for form validation
import { styles } from './styles' // for styling the components
import { SendRequest } from '../../helpers/api' // To send requests to server
import { showAppToast } from '../../components' // To make toasts
// form utilities
import { hasError, handleChange } from '../../helpers/form'

const SignIn = (props) => {
  // The react-router history
  const { history } = props
  // The styles for the components
  const classes = makeStyles(styles)()
  // The state for the whole page
  const [formState, setFormState] = useState({
    isValid: false,
    values: {},
    touched: {},
    errors: {}
  })

  /**
   * Validates the given data against the `schema`.
   * Sets the errors in the state.
   */
  useEffect(() => {
    const errors = validate(formState.values, schema)
    setFormState((formState) => ({
      ...formState,
      isValid: errors ? false : true,
      errors: errors || {}
    }))
  }, [formState.values])

  /**
   * Handles the successful form submit.
   * @param {form submit event} event
   */
  const handleSignIn = (event) => {
    const { username, password } = event.target
    event.preventDefault()
    SendRequest(
      {
        username: username.value,
        password: password.value
      },
      'POST',
      '/api/get_auth_token/',
      false
    )
      .then((response) => {
        // Sign In operation
        if (response.success) {
          const { token, user_data } = response.data
          localStorage.setItem('user_data', JSON.stringify(user_data))
          localStorage.setItem('token', token)
          showAppToast('Successfully signed in.').then(() => {
            history.push('/sign-in')
          })
        }
      })
      .catch((error) => {
        console.log(
          'Error from sign in page.',
          error,
          error.response,
          error.request
        )
      })
  }

  return (
    <div className={classes.root}>
      <Grid className={classes.grid} container>
        <Grid className={classes.content} item xs={12}>
          <div className={classes.content}>
            <div className={classes.contentBody}>
              <form className={classes.form} onSubmit={handleSignIn}>
                <Typography className={classes.title} variant="h2">
                  Sign in
                </Typography>
                <TextField
                  className={classes.textField}
                  error={hasError('username', formState)}
                  fullWidth
                  helperText={
                    hasError('username', formState)
                      ? formState.errors.username[0]
                      : null
                  }
                  label="Username"
                  name="username"
                  onChange={(e) => {
                    handleChange(e, formState, setFormState)
                  }}
                  type="text"
                  value={formState.values.username || ''}
                  variant="outlined"
                />
                <TextField
                  className={classes.textField}
                  error={hasError('password', formState)}
                  fullWidth
                  helperText={
                    hasError('password', formState)
                      ? formState.errors.password[0]
                      : null
                  }
                  label="Password"
                  name="password"
                  onChange={(e) => {
                    handleChange(e, formState, setFormState)
                  }}
                  type="password"
                  value={formState.values.password || ''}
                  variant="outlined"
                />
                <Button
                  className={classes.signInButton}
                  color="primary"
                  disabled={!formState.isValid}
                  fullWidth
                  size="large"
                  type="submit"
                  variant="contained"
                >
                  Sign in now
                </Button>
                <Typography color="textSecondary" variant="body1">
                  Don't have an account?{' '}
                  <Link component={RouterLink} to="/sign-up" variant="h6">
                    Sign up
                  </Link>
                </Typography>
              </form>
            </div>
          </div>
        </Grid>
      </Grid>
    </div>
  )
}

SignIn.propTypes = {
  history: PropTypes.object
}

export default withRouter(SignIn)
