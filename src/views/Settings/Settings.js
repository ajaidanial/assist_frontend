import React, { Component } from 'react'
import { withStyles } from '@material-ui/styles'
import { styles } from './styles'
import { Grid } from '@material-ui/core'
import PropTypes from 'prop-types'
import {
  ProfileSettings,
  Password,
  AddTag,
  ModifyTags,
  ProfilePicture,
  BottomContent
} from './components'

class Settings extends Component {
  render() {
    // get the props
    const { history, classes } = this.props
    // user data | filter out the necessary data
    const user_data_main = JSON.parse(localStorage.getItem('user_data'))
    const user_data = {
      username: user_data_main.username,
      first_name: user_data_main.first_name,
      id: user_data_main.id,
      last_name: user_data_main.last_name,
      email: user_data_main.email
    }
    // temp data for tags
    const data = [
      {
        name: 'test1',
        id: 1
      },
      {
        name: 'test2',
        id: 2
      },
      {
        name: 'test3',
        id: 3
      },
      {
        name: 'test4',
        id: 4
      },
      {
        name: 'test5',
        id: 5
      }
    ]
    return (
      <div className={classes.root}>
        <Grid container spacing={3}>
          <Grid item md={4} xs={12}>
            <Password history={history} user_data={user_data} />
          </Grid>
          <Grid item md={4} xs={12}>
            <ProfilePicture />
          </Grid>
          <Grid item md={4} xs={12}>
            <ProfileSettings history={history} user_data={user_data} />
          </Grid>
          <Grid item md={6} xs={12}>
            <AddTag />
          </Grid>
          <Grid item md={6} xs={12}>
            <ModifyTags tagData={data} />
          </Grid>
          <Grid item md={12} xs={12}>
            <BottomContent />
          </Grid>
        </Grid>
      </div>
    )
  }
}

Settings.propTypes = {
  classes: PropTypes.object,
  history: PropTypes.object
}

export default withStyles(styles)(Settings)
