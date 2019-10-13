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
  Button,
  TextField
} from '@material-ui/core'
// form utilities
import { hasError, handleChange } from '../../../../helpers/form'
import { styles } from './styles' // styles for the form
import { schema } from './schema' // schema for the form data

const Password = (props) => {
  // get props
  const { className, ...rest } = props
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
    alert('work here')
  }

  return (
    <Card {...rest} className={clsx(classes.root, className)}>
      <form onSubmit={handlePasswordChange}>
        <CardHeader subheader="Update your password" title="User Password" />
        <Divider />
        <CardContent>
          <TextField
            error={hasError('password', formState)}
            fullWidth
            helperText={
              hasError('password', formState)
                ? formState.errors.password[0]
                : null
            }
            label="New Password"
            name="password"
            onChange={(e) => {
              handleChange(e, formState, setFormState)
            }}
            type="password"
            value={formState.values.password || ''}
            variant="outlined"
          />
          <TextField
            className={clsx(classes.textField)}
            error={hasError('confirm', formState)}
            fullWidth
            helperText={
              hasError('confirm', formState)
                ? formState.errors.confirm[0]
                : null
            }
            label="Confirm password"
            name="confirm"
            onChange={(e) => {
              handleChange(e, formState, setFormState)
            }}
            type="password"
            value={formState.values.confirm || ''}
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

Password.propTypes = {
  className: PropTypes.string
}

export default Password
