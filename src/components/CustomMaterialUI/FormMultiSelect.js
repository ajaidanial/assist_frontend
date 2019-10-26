import React from 'react'
// material components
import {
  FormControl,
  InputLabel,
  Select,
  FormHelperText,
  Chip
} from '@material-ui/core'
// helpers
import { handleChange, hasError } from '../../helpers/form'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(() => ({
  chips: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  chip: {
    margin: 3
  }
}))

const FormMultiSelect = (props) => {
  // get from props
  const { children, className, formState, name, label, setFormState } = props
  // styles
  const classes = useStyles()

  // states and other stuff
  const inputLabel = React.useRef(null)
  const [labelWidth, setLabelWidth] = React.useState(0)
  React.useEffect(() => {
    setLabelWidth(inputLabel.current.offsetWidth)
  }, [])

  // defines the menu size for the select
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: 240
      }
    }
  }

  return (
    <FormControl
      className={className}
      error={hasError(name, formState)}
      fullWidth
      variant="outlined"
    >
      <InputLabel ref={inputLabel}>{label}</InputLabel>
      <Select
        inputProps={{
          name: { name }
        }}
        labelWidth={labelWidth}
        MenuProps={MenuProps}
        multiple
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
        renderValue={(selected) => (
          <div className={classes.chips}>
            {selected.map((value) => (
              <Chip className={classes.chip} key={value} label={value} />
            ))}
          </div>
        )}
        value={formState.values[name] || []}
      >
        {children}
      </Select>
      {hasError(name, formState) && (
        <FormHelperText>{formState.errors[name][0]}</FormHelperText>
      )}
    </FormControl>
  )
}

FormMultiSelect.propTypes = {
  children: PropTypes.any,
  className: PropTypes.any,
  formState: PropTypes.any,
  label: PropTypes.string,
  name: PropTypes.string,
  setFormState: PropTypes.any
}

export default FormMultiSelect
