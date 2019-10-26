import React, { Component } from 'react'
import { withStyles } from '@material-ui/styles'
import { styles } from './styles'
import { Grid } from '@material-ui/core'
import PropTypes from 'prop-types'
import { AddTransactions } from './components'
// helper to get the tags data
import { getTagsData } from '../../helpers/app'

class Transactions extends Component {
  // state to store the tags_data
  state = {
    tags_data: [], // To store all the tags data
    lastLocationKey: '' // To remember the location.key user in history.listen
  }

  // To Update the tags once page is loaded
  componentDidMount() {
    getTagsData(this)
  }

  render() {
    // get the props
    const { classes, history } = this.props

    /**
     * To listen if history.replace() in AddTags
     * Gets all the tags, if done so, and if the lastLocationKey is not the currentLocationKey
     */
    history.listen((location) => {
      if (this.state.lastLocationKey !== location.key) {
        this.setState(
          {
            lastLocationKey: location.key // To save the location key || Prevents calling multiple times
          },
          () => {
            getTagsData(this)
          }
        )
      }
    })

    return (
      <div className={classes.root}>
        <Grid container spacing={3}>
          <Grid item md={5} xs={12}>
            <AddTransactions
              history={history}
              tags_data={this.state.tags_data}
            />
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
