import React from 'react'
import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(3)
  }
}))

const Settings = () => {
  const classes = useStyles()

  return <div className={classes.root}>Settings Page</div>
}

export default Settings
