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
import { SendRequest } from '../../helpers/api' // for api request

class Settings extends Component {
  // state to store the tags_data
  state = {
    tags_data: []
  }

  getTagsData = () => {
    alert('1')
    const { history } = this.props
    SendRequest({}, 'GET', '/api/tags/').then((response) => {
      if (response.success) {
        const { data } = response
        this.setState(
          {
            ...this.state,
            tags_data: data
          },
          () => {
            history.replace('/settings')
          }
        )
      }
    })
  }

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
    // get the tags data from state | to pass as props
    const { tags_data } = this.state

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
            <AddTag history={history} />
          </Grid>
          <Grid item md={6} xs={12}>
            <ModifyTags tagData={tags_data} />
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
