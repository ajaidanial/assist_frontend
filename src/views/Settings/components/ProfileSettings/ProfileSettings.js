import React, { useState } from 'react'
import PropTypes from 'prop-types'
import clsx from 'clsx'
import { makeStyles } from '@material-ui/styles'
import { styles } from './styles'

import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Divider,
  Button,
  TextField
} from '@material-ui/core'

const ProfileSettings = (props) => {
  const { className, ...rest } = props

  const classes = makeStyles(styles)()

  const [values, setValues] = useState({
    password: '',
    confirm: ''
  })

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    })
  }

  return (
    <Card {...rest} className={clsx(classes.root, className)}>
      <form>
        <CardHeader subheader="Update your profile" title="User Profile" />
        <Divider />
        <CardContent>
          <TextField
            fullWidth
            label="Password"
            name="password"
            onChange={handleChange}
            type="password"
            value={values.password}
            variant="outlined"
          />
          <TextField
            fullWidth
            label="Confirm password"
            name="confirm"
            onChange={handleChange}
            style={{ marginTop: '1rem' }}
            type="password"
            value={values.confirm}
            variant="outlined"
          />
        </CardContent>
        <Divider />
        <CardActions>
          <Button color="primary" variant="outlined">
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
