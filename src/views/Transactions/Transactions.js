import React, { Component } from 'react'
import { withStyles } from '@material-ui/styles'
import { styles } from './styles'
import { Grid } from '@material-ui/core'
import PropTypes from 'prop-types'
import { AddTransactions } from './components'

class Transactions extends Component {
  render() {
    // get the props
    const { classes } = this.props

    return (
      <div className={classes.root}>
        <Grid container spacing={3}>
          <Grid item md={5} xs={12}>
            <AddTransactions />
          </Grid>
        </Grid>
      </div>
    )
  }
}

Transactions.propTypes = {
  classes: PropTypes.object,
  history: PropTypes.object
}

export default withStyles(styles)(Transactions)
