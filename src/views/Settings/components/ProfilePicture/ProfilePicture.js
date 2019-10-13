import React from 'react'
import PropTypes from 'prop-types'
import clsx from 'clsx'
import { makeStyles } from '@material-ui/styles'
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Divider,
  Button
} from '@material-ui/core'
import { styles } from './styles' // styles for the form

const ProfilePicture = (props) => {
  // get props
  const { className, ...rest } = props
  // get the styles
  const classes = makeStyles(styles)()

  /**
   * Handles the profile picture change.
   */
  const handlePictureChange = () => {
    alert('work here change')
  }

  /**
   * Handles the profile picture remove.
   */
  const handlePictureRemove = () => {
    alert('work here remove')
  }

  return (
    <Card {...rest} className={clsx(classes.root, className)}>
      <CardHeader
        subheader="Update or remove your avatar here"
        title="User Avatar"
      />
      <Divider />
      <CardContent>
        <h1>test</h1>
      </CardContent>
      <Divider />
      <CardActions className={clsx(classes.cardFooter)}>
        <Button onClick={handlePictureRemove} variant="text">
          Remove
        </Button>
        <Button
          color="primary"
          onClick={handlePictureChange}
          variant="outlined"
        >
          Update
        </Button>
      </CardActions>
    </Card>
  )
}

ProfilePicture.propTypes = {
  className: PropTypes.string
}

export default ProfilePicture
