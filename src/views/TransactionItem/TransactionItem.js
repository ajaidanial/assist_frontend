import React from 'react'
import { makeStyles } from '@material-ui/styles'
import PropTypes from 'prop-types'

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(3)
  }
}))

const TransactionItem = (props) => {
  const classes = useStyles()

  const { params } = props.match

  return <div className={classes.root}>TransactionItem Page {params.id}</div>
}

TransactionItem.propTypes = {
  match: PropTypes.object
}

export default TransactionItem
