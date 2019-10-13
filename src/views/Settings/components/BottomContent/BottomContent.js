import React from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/styles'
import { Link, Typography } from '@material-ui/core'
import { styles } from './styles' // styles for the form
import { signOutUser } from '../../../../helpers/auth'

const BottomContent = () => {
  // styles of the component
  const classes = makeStyles(styles)()

  return (
    <>
      <Typography className={classes.mb1} variant="h5">
        <Link color="primary" href="/about">
          About The Application
        </Link>
      </Typography>
      <Typography className={classes.mb1} variant="h5">
        <Link color="primary" href="https://ajaidanial.github.io/">
          About The Developer
        </Link>
      </Typography>
      <Typography variant="h5">
        <Link
          color="primary"
          href="#"
          onClick={(e) => {
            e.preventDefault()
            signOutUser()
          }}
        >
          Sign Out
        </Link>
      </Typography>
    </>
  )
}

BottomContent.propTypes = {
  className: PropTypes.string
}

export default BottomContent
