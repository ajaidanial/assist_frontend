import React from 'react'
import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(3)
  }
}))

const Transactions = () => {
  const classes = useStyles()

  return <div className={classes.root}>Transactions Page</div>
}

export default Transactions
