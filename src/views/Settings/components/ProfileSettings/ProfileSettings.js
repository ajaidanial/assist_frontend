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

const ProfileSettings = (props) => {
  const { className, ...rest } = props
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
  const handleProfileSave = (event) => {
    event.preventDefault()
    alert('work here')
  }

  return (
    <Card {...rest} className={clsx(classes.root, className)}>
      <form onSubmit={handleProfileSave}>
        <CardHeader subheader="Update your profile" title="User Profile" />
        <Divider />
        <CardContent>
          <Grid container>
            <Grid className={classes.rowContainerLeft} item xs={6}>
              <TextField
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
  className: PropTypes.string
}

export default ProfileSettings
