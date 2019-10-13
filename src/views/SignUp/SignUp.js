import React, { useState, useEffect } from 'react'
import { Link as RouterLink, withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import validate from 'validate.js'
import { makeStyles } from '@material-ui/styles'
import { Grid, Button, TextField, Link, Typography } from '@material-ui/core'

import { schema } from './schema' // schema for the form data
import { styles } from './styles' // styles for the components
import { SendRequest } from '../../helpers/api' // To send requests to server
import { showAppToast } from '../../components' // To show toast
// form utilities
import { hasError, handleChange } from '../../helpers/form'

const SignUp = (props) => {
  // The react-router history
  const { history } = props
  // for styling the components
  const classes = makeStyles(styles)()
  // the state for the whole page
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
  const handleSignUp = (event) => {
    const { username, password, firstName, lastName, email } = event.target
    event.preventDefault()
    SendRequest(
      {
        username: username.value,
        password: password.value,
        first_name: firstName.value,
        last_name: lastName.value,
        email: email.value
      },
      'POST',
      '/api/users/',
      false
    )
      .then((response) => {
        // Sign Up operation
        if (response.success) {
          showAppToast('Successfully created user. Sign in to continue.').then(
            () => {
              history.push('/sign-in')
            }
          )
        }
      })
      .catch((error) => {
        console.log(
          'Error from sign up page.',
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
              <form className={classes.form} onSubmit={handleSignUp}>
                <Typography className={classes.title} variant="h2">
                  Create new account
                </Typography>
                <Grid container>
                  <Grid className={classes.rowContainerLeft} item xs={6}>
                    <TextField
                      className={classes.textField}
                      error={hasError('firstName', formState)}
                      fullWidth
                      helperText={
                        hasError('firstName', formState)
                          ? formState.errors.firstName[0]
                          : null
                      }
                      label="First Name"
                      name="firstName"
                      onChange={(e) => {
                        handleChange(e, formState, setFormState)
                      }}
                      type="text"
                      value={formState.values.firstName || ''}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid className={classes.rowContainerRight} item xs={6}>
                    <TextField
                      className={classes.textField}
                      error={hasError('lastName', formState)}
                      fullWidth
                      helperText={
                        hasError('lastName', formState)
                          ? formState.errors.lastName[0]
                          : null
                      }
                      label="Last Name"
                      name="lastName"
                      onChange={(e) => {
                        handleChange(e, formState, setFormState)
                      }}
                      type="text"
                      value={formState.values.lastName || ''}
                      variant="outlined"
                    />
                  </Grid>
                </Grid>
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
                  error={hasError('email', formState)}
                  fullWidth
                  helperText={
                    hasError('email', formState)
                      ? formState.errors.email[0]
                      : null
                  }
                  label="Email Address"
                  name="email"
                  onChange={(e) => {
                    handleChange(e, formState, setFormState)
                  }}
                  type="text"
                  value={formState.values.email || ''}
                  variant="outlined"
                />

                <Grid container>
                  <Grid className={classes.rowContainerLeft} item xs={6}>
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
                  </Grid>
                  <Grid className={classes.rowContainerRight} item xs={6}>
                    <TextField
                      className={classes.textField}
                      error={hasError('confirmPassword', formState)}
                      fullWidth
                      helperText={
                        hasError('confirmPassword', formState)
                          ? formState.errors.confirmPassword[0]
                          : null
                      }
                      label="Confirm Password"
                      name="confirmPassword"
                      onChange={(e) => {
                        handleChange(e, formState, setFormState)
                      }}
                      type="password"
                      value={formState.values.confirmPassword || ''}
                      variant="outlined"
                    />
                  </Grid>
                </Grid>

                <Button
                  className={classes.signUpButton}
                  color="primary"
                  disabled={!formState.isValid}
                  fullWidth
                  size="large"
                  type="submit"
                  variant="contained"
                >
                  Sign up now
                </Button>
                <Typography color="textSecondary" variant="body1">
                  Already have an account?{' '}
                  <Link component={RouterLink} to="/sign-in" variant="h6">
                    Sign in
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

SignUp.propTypes = {
  history: PropTypes.object
}

export default withRouter(SignUp)
