import React from 'react'
import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(3)
  }
}))

const Dashboard = () => {
  const classes = useStyles()

  return <div className={classes.root}>Dashboard Page</div>
}

export default Dashboard
