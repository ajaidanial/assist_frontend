/* eslint-disable react/jsx-sort-props */
import React from 'react'
// material components
import {
  FormControl,
  InputLabel,
  Select,
  FormHelperText
} from '@material-ui/core'
// helpers
import { handleChange, hasError } from '../../helpers/form'
import PropTypes from 'prop-types'

const FormSelect = (props) => {
  // get from props
  const { children, className, formState, name, label, setFormState } = props

  // states and other stuff
  const inputLabel = React.useRef(null)
  const [labelWidth, setLabelWidth] = React.useState(0)
  React.useEffect(() => {
    setLabelWidth(inputLabel.current.offsetWidth)
  }, [])

  return (
    <FormControl
      variant="outlined"
      error={hasError(name, formState)}
      fullWidth
      className={className}
    >
      <InputLabel ref={inputLabel}>{label}</InputLabel>
      <Select
        value={formState.values[name] || ''}
        onChange={(e) => {
          handleChange(e, formState, setFormState)
        }}
        // sets the formState => touched value to true
        onClose={() => {
          setFormState({
            ...formState,
            touched: {
              ...formState.touched,
              [name]: true
            }
          })
        }}
        labelWidth={labelWidth}
        inputProps={{
          name: { name }
        }}
      >
        {children}
      </Select>
      {hasError(name, formState) && (
        <FormHelperText>{formState.errors[name][0]}</FormHelperText>
      )}
    </FormControl>
  )
}

FormSelect.propTypes = {
  children: PropTypes.any,
  className: PropTypes.any,
  formState: PropTypes.any,
  label: PropTypes.string,
  name: PropTypes.string,
  setFormState: PropTypes.any
}

export default FormSelect
