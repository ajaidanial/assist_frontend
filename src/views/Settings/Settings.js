import React from 'react'
import { makeStyles } from '@material-ui/styles'
import { styles } from './styles'
import { Grid } from '@material-ui/core'
import { ProfileSettings, Password, AddTag } from './components'

const Settings = () => {
  // for the layout style of the page
  const classes = makeStyles(styles)()

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item md={7} xs={12}>
          <ProfileSettings />
        </Grid>
        <Grid item md={5} xs={12}>
          <Password />
        </Grid>
        <Grid item md={6} xs={12}>
          <AddTag />
        </Grid>
      </Grid>
    </div>
  )
}

export default Settings
