import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import clsx from 'clsx'
import validate from 'validate.js'
import { makeStyles } from '@material-ui/styles'
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Divider,
  Button
} from '@material-ui/core'
// custom material components
import { FormTextField } from '../../../../components/CustomMaterialUI'
import { styles } from './styles' // styles for the form
import { schema } from './schema' // schema for the form data
import { SendRequest } from '../../../../helpers/api' // for api request
import { showAppToast } from '../../../../components' // for toast

const Password = (props) => {
  // get props
  const { className, user_data, history, ...rest } = props
  // get the styles
  const classes = makeStyles(styles)()
  // the state for the whole component
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
  const handlePasswordChange = (event) => {
    event.preventDefault()
    SendRequest(formState.values, 'PATCH', `/api/users/${user_data.id}/`).then(
      (response) => {
        if (response.success) {
          // reset the set values
          setFormState({
            isValid: false,
            values: {},
            touched: {},
            errors: {}
          })
          showAppToast('Successfully updated password.').then(() => {
            history.replace('/settings')
          })
        }
      }
    )
  }

  return (
    <Card {...rest} className={clsx(classes.root, className)}>
      <form onSubmit={handlePasswordChange}>
        <CardHeader
          subheader="Update your password here"
          title="User Password"
        />
        <Divider />
        <CardContent>
          <FormTextField
            formState={formState}
            label="New Password"
            name="password"
            setFormState={setFormState}
            type="password"
          />
          <FormTextField
            className={clsx(classes.textField)}
            formState={formState}
            label="Confirm password"
            name="confirm_password"
            setFormState={setFormState}
            type="password"
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

Password.propTypes = {
  className: PropTypes.string,
  history: PropTypes.object,
  user_data: PropTypes.object
}

export default Password
