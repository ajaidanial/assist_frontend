import React from 'react'
// material components
import { TextField } from '@material-ui/core'
import PropTypes from 'prop-types'
// helpers
import { hasError, handleChange } from '../../helpers/form'

/**
 * The TextField material ui component user everywhere.
 */
const FormSelect = (props) => {
  const { className, formState, name, label, setFormState, type } = props

  return (
    <TextField
      className={className}
      error={hasError(name, formState)}
      fullWidth
      helperText={hasError(name, formState) ? formState.errors[name][0] : null}
      label={label}
      name={name}
      onChange={(e) => {
        handleChange(e, formState, setFormState)
      }}
      type={type}
      value={formState.values[name] || ''}
      variant="outlined"
    />
  )
}

FormSelect.propTypes = {
  className: PropTypes.any,
  formState: PropTypes.any,
  label: PropTypes.string,
  name: PropTypes.string,
  setFormState: PropTypes.any,
  type: PropTypes.string
}

export default FormSelect
