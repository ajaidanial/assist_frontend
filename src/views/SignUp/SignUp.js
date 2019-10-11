import React, { useState, useEffect } from 'react'
import { Link as RouterLink, withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import validate from 'validate.js'
import { makeStyles } from '@material-ui/styles'
import { Grid, Button, TextField, Link, Typography } from '@material-ui/core'

import { schema } from './schema' // schema for the form data
import { styles } from './styles' // styles for the components
import { SendRequest } from '../../helpers/api' // To send requests to server

const SignUp = () => {
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
   * Called on change of values in input fields.
   * Stores values to the state.
   * @param {form change event} event
   */
  const handleChange = (event) => {
    event.persist()
    setFormState((formState) => ({
      ...formState,
      values: {
        ...formState.values,
        [event.target.name]: event.target.value
      },
      touched: {
        ...formState.touched,
        [event.target.name]: true
      }
    }))
  }

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
      '/api/users/'
    )
      .then((response) => {
        // Sign Up operation
        if (response.success) {
          alert('Success => Sign Up')
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

  /**
   * Returns a bool if the input field has errors
   * @param {`name` of input} field
   */
  const hasError = (field) =>
    formState.touched[field] && formState.errors[field] ? true : false

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
                      error={hasError('firstName')}
                      fullWidth
                      helperText={
                        hasError('firstName')
                          ? formState.errors.firstName[0]
                          : null
                      }
                      label="First Name"
                      name="firstName"
                      onChange={handleChange}
                      type="text"
                      value={formState.values.firstName || ''}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid className={classes.rowContainerRight} item xs={6}>
                    <TextField
                      className={classes.textField}
                      error={hasError('lastName')}
                      fullWidth
                      helperText={
                        hasError('lastName')
                          ? formState.errors.lastName[0]
                          : null
                      }
                      label="Last Name"
                      name="lastName"
                      onChange={handleChange}
                      type="text"
                      value={formState.values.lastName || ''}
                      variant="outlined"
                    />
                  </Grid>
                </Grid>
                <TextField
                  className={classes.textField}
                  error={hasError('username')}
                  fullWidth
                  helperText={
                    hasError('username') ? formState.errors.username[0] : null
                  }
                  label="Username"
                  name="username"
                  onChange={handleChange}
                  type="text"
                  value={formState.values.username || ''}
                  variant="outlined"
                />
                <TextField
                  className={classes.textField}
                  error={hasError('email')}
                  fullWidth
                  helperText={
                    hasError('email') ? formState.errors.email[0] : null
                  }
                  label="Email Address"
                  name="email"
                  onChange={handleChange}
                  type="text"
                  value={formState.values.email || ''}
                  variant="outlined"
                />

                <Grid container>
                  <Grid className={classes.rowContainerLeft} item xs={6}>
                    <TextField
                      className={classes.textField}
                      error={hasError('password')}
                      fullWidth
                      helperText={
                        hasError('password')
                          ? formState.errors.password[0]
                          : null
                      }
                      label="Password"
                      name="password"
                      onChange={handleChange}
                      type="password"
                      value={formState.values.password || ''}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid className={classes.rowContainerRight} item xs={6}>
                    <TextField
                      className={classes.textField}
                      error={hasError('confirmPassword')}
                      fullWidth
                      helperText={
                        hasError('confirmPassword')
                          ? formState.errors.confirmPassword[0]
                          : null
                      }
                      label="Confirm Password"
                      name="confirmPassword"
                      onChange={handleChange}
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
