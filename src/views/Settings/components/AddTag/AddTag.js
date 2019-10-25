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
          <FormTextField
            formState={formState}
            label="Name"
            name="name"
            setFormState={setFormState}
            type="text"
          />

          <FormTextField
            className={clsx(classes.textField)}
            formState={formState}
            label="Description"
            multiline
            name="description"
            rows="5"
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

AddTag.propTypes = {
  className: PropTypes.string,
  history: PropTypes.object
}

export default AddTag
