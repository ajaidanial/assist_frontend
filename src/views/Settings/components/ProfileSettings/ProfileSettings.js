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
  Button
} from '@material-ui/core'
// custom material components
import { FormTextField } from '../../../../components/CustomMaterialUI'
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
          const new_user_data = {
            username: data.username,
            first_name: data.first_name,
            id: data.id,
            last_name: data.last_name,
            email: data.email
          }
          setFormState({
            isValid: false,
            values: new_user_data, // for init
            touched: {},
            errors: {},
            saved_values: new_user_data // for later checking
          })
          showAppToast('Successfully updated profile.').then(() => {
            history.replace('/settings')
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
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <FormTextField
                formState={formState}
                label="First Name"
                name="first_name"
                setFormState={setFormState}
                type="text"
              />
            </Grid>
            <Grid item xs={6}>
              <FormTextField
                formState={formState}
                label="Last Name"
                name="last_name"
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
