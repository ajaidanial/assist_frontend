import React from 'react'
import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(3)
  }
}))

const Reminders = () => {
  const classes = useStyles()

  return <div className={classes.root}>Reminders Page</div>
}

export default Reminders
