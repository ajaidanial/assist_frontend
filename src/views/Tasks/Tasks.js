import React from 'react'
import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(3)
  }
}))

const Tasks = () => {
  const classes = useStyles()

  return <div className={classes.root}>Tasks Page</div>
}

export default Tasks
