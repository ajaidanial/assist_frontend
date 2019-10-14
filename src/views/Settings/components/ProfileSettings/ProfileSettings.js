import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import clsx from 'clsx'
import { makeStyles } from '@material-ui/styles'
import validate from 'validate.js'
import {
  Grid,
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Divider,
  Button,
  TextField
} from '@material-ui/core'
// form utilities
import { hasError, handleChange } from '../../../../helpers/form'
import { schema } from './schema' // schema for the form data
import { styles } from './styles' // styles for the components
import { SendRequest } from '../../../../helpers/api' // for api request
import { showAppToast } from '../../../../components' // for toast

const ProfileSettings = (props) => {
  const { className, history, user_data, ...rest } = props
  // for styling the components
  const classes = makeStyles(styles)()
  // the state for the whole page
  const [formState, setFormState] = useState({
    isValid: false,
    values: user_data, // for init
    touched: {},
    errors: {},
    saved_values: user_data // for later checking
  })

  /**
   * Validates the given data against the `schema`.
   * Sets the errors in the state.
   */
  useEffect(() => {
    const errors = validate(formState.values, schema)

    // check if the entered values are same as the saved values in db
    let isFormValid = false
    if (!errors) {
      if (
        JSON.stringify(formState.values) !==
        JSON.stringify(formState.saved_values)
      )
        isFormValid = true
    }

    setFormState((formState) => ({
      ...formState,
      isValid: isFormValid,
      errors: errors || {}
    }))
  }, [formState.values, formState.saved_values])

  /**
   * Handles the successful form submit.
   * @param {form submit event} event
   */
  const handleProfileSave = (event) => {
    event.preventDefault()
    SendRequest(formState.values, 'PATCH', `/api/users/${user_data.id}/`).then(
      (response) => {
        if (response.success) {
          const { data } = response
          // save to localstorage
          localStorage.setItem('user_data', JSON.stringify(data))
          // reset the set values
          setFormState({
            isValid: false,
            values: data, // for init
            touched: {},
            errors: {},
            saved_values: data // for later checking
          })
          showAppToast('Successfully updated profile.').then(() => {
            history.push('/settings/')
          })
        }
      }
    )
  }

  return (
    <Card {...rest} className={clsx(classes.root, className)}>
      <form onSubmit={handleProfileSave}>
        <CardHeader subheader="Update your profile here" title="User Profile" />
        <Divider />
        <CardContent>
          <Grid container>
            <Grid className={classes.rowContainerLeft} item xs={6}>
              <TextField
                error={hasError('first_name', formState)}
                fullWidth
                helperText={
                  hasError('first_name', formState)
                    ? formState.errors.first_name[0]
                    : null
                }
                label="First Name"
                name="first_name"
                onChange={(e) => {
                  handleChange(e, formState, setFormState)
                }}
                type="text"
                value={formState.values.first_name || ''}
                variant="outlined"
              />
            </Grid>
            <Grid className={classes.rowContainerRight} item xs={6}>
              <TextField
                error={hasError('last_name', formState)}
                fullWidth
                helperText={
                  hasError('last_name', formState)
                    ? formState.errors.last_name[0]
                    : null
                }
                label="Last Name"
                name="last_name"
                onChange={(e) => {
                  handleChange(e, formState, setFormState)
                }}
                type="text"
                value={formState.values.last_name || ''}
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
              hasError('email', formState) ? formState.errors.email[0] : null
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
        </CardContent>
        <Divider />
        <CardActions className={clsx(classes.cardFooter)}>
          <Button
            color="primary"
            disabled={!formState.isValid}
            type="submit"
            variant="outlined"
          >
            Update
          </Button>
        </CardActions>
      </form>
    </Card>
  )
}

ProfileSettings.propTypes = {
  className: PropTypes.string,
  history: PropTypes.object,
  user_data: PropTypes.object
}

export default ProfileSettings
