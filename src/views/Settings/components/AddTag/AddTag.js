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
import { SendRequest } from '../../../../helpers/api' // for api request
import { showAppToast } from '../../../../components' // for toast

const AddTag = (props) => {
  // get props
  const { className, history, ...rest } = props
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
  const handleTagAdd = (event) => {
    event.preventDefault()
    SendRequest(formState.values, 'POST', '/api/tags/').then((response) => {
      if (response.success) {
        // reset the set values
        setFormState({
          isValid: false,
          values: {},
          touched: {},
          errors: {}
        })
        showAppToast('Successfully created your tag.').then(() => {
          history.replace('/settings')
        })
      }
    })
  }

  return (
    <Card {...rest} className={clsx(classes.root, className)}>
      <form onSubmit={handleTagAdd}>
        <CardHeader subheader="Add a new tag here" title="New Tag" />
        <Divider />
        <CardContent>
          <TextField
            error={hasError('name', formState)}
            fullWidth
            helperText={
              hasError('name', formState) ? formState.errors.name[0] : null
            }
            label="Name"
            name="name"
            onChange={(e) => {
              handleChange(e, formState, setFormState)
            }}
            type="text"
            value={formState.values.name || ''}
            variant="outlined"
          />
          <TextField
            className={clsx(classes.textField)}
            error={hasError('description', formState)}
            fullWidth
            helperText={
              hasError('description', formState)
                ? formState.errors.description[0]
                : null
            }
            label="Description"
            multiline
            name="description"
            onChange={(e) => {
              handleChange(e, formState, setFormState)
            }}
            rows="5"
            type="text"
            value={formState.values.description || ''}
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

AddTag.propTypes = {
  className: PropTypes.string,
  history: PropTypes.object
}

export default AddTag
