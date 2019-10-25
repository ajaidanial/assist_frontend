/* eslint-disable no-console */
import React, { useState, useEffect } from 'react'
import { Link as RouterLink, withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import validate from 'validate.js'
import { makeStyles } from '@material-ui/styles'
// material components
import { Grid, Button, Link, Typography } from '@material-ui/core'
// custom material components
import { FormTextField } from '../../components/CustomMaterialUI'

import { schema } from './schema' // schema for the form data
import { styles } from './styles' // styles for the components
import { SendRequest } from '../../helpers/api' // To send requests to server
import { showAppToast } from '../../components' // To show toast

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
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <FormTextField
                      className={classes.textField}
                      formState={formState}
                      label="First Name"
                      name="firstName"
                      setFormState={setFormState}
                      type="text"
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <FormTextField
                      className={classes.textField}
                      formState={formState}
                      label="Last Name"
                      name="lastName"
                      setFormState={setFormState}
                      type="text"
                    />
                  </Grid>
                </Grid>
                <FormTextField
                  className={classes.textField}
                  formState={formState}
                  label="Username"
                  name="username"
                  setFormState={setFormState}
                  type="text"
                />
                <FormTextField
                  className={classes.textField}
                  formState={formState}
                  label="Email Address"
                  name="email"
                  setFormState={setFormState}
                  type="text"
                />
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <FormTextField
                      className={classes.textField}
                      formState={formState}
                      label="Password"
                      name="password"
                      setFormState={setFormState}
                      type="password"
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <FormTextField
                      className={classes.textField}
                      formState={formState}
                      label="Confirm Password"
                      name="confirmPassword"
                      setFormState={setFormState}
                      type="password"
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
