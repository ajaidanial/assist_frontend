import React from 'react'
// material components
import {
  FormControl,
  InputLabel,
  Select,
  FormHelperText
} from '@material-ui/core'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  formControl: {
    marginTop: theme.spacing(3),
    width: '100%'
  }
}))

const FormSelect = (props) => {
  const {
    children,
    onChange,
    name,
    label,
    value,
    error,
    helperText,
    onClose
  } = props
  // css styles
  const classes = useStyles()
  // states and other stuff
  const inputLabel = React.useRef(null)
  const [labelWidth, setLabelWidth] = React.useState(0)
  React.useEffect(() => {
    setLabelWidth(inputLabel.current.offsetWidth)
  }, [])

  return (
    <FormControl
      className={classes.formControl}
      error={error}
      variant="outlined"
    >
      <InputLabel ref={inputLabel}>{label}</InputLabel>
      <Select
        inputProps={{
          name: { name }
        }}
        labelWidth={labelWidth}
        onChange={onChange}
        onClose={onClose}
        value={value}
      >
        {children}
      </Select>
      {error && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
  )
}

FormSelect.propTypes = {
  children: PropTypes.array,
  error: PropTypes.bool,
  helperText: PropTypes.string,
  label: PropTypes.string,
  name: PropTypes.string,
  onChange: PropTypes.func,
  onClose: PropTypes.func,
  value: PropTypes.string
}

export default FormSelect
