import React from 'react'
import clsx from 'clsx'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/styles'
import { Card, CardContent, Grid, Typography, Avatar } from '@material-ui/core'
import MoneyIcon from '@material-ui/icons/Money'
import AttachMoneyIcon from '@material-ui/icons/AttachMoney'

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100%'
  },
  content: {
    alignItems: 'center',
    display: 'flex'
  },
  title: {
    fontWeight: 700
  },
  icon: {
    height: 32,
    width: 32
  },
  difference: {
    marginTop: theme.spacing(1),
    display: 'flex',
    alignItems: 'center'
  },
  // Classes based on the `type` passed | for avatars
  avatar1: {
    backgroundColor: theme.palette.error.main,
    height: 56,
    width: 56
  },
  avatar2: {
    backgroundColor: theme.palette.success.main,
    height: 56,
    width: 56
  }
}))

const InfoBox = (props) => {
  const { className, sub_title, title, avatar_type, value, ...rest } = props
  // styles
  const classes = useStyles()
  // The dict which decides the types based on the type
  const AVATAR_TYPES = {
    1: (
      <Avatar className={classes.avatar1}>
        <MoneyIcon className={classes.icon} />
      </Avatar>
    ),
    2: (
      <Avatar className={classes.avatar2}>
        <AttachMoneyIcon className={classes.icon} />
      </Avatar>
    )
  }

  return (
    <Card {...rest} className={clsx(classes.root, className)}>
      <CardContent>
        <Grid container justify="space-between">
          <Grid item>
            <Typography
              className={classes.title}
              color="textSecondary"
              gutterBottom
              variant="body2"
            >
              {title}
            </Typography>
            <Typography variant="h3">₹{value}</Typography>
          </Grid>
          <Grid item>{AVATAR_TYPES[avatar_type]}</Grid>
        </Grid>
        <div className={classes.difference}>
          <Typography className={classes.caption} variant="caption">
            {sub_title}
          </Typography>
        </div>
      </CardContent>
    </Card>
  )
}

InfoBox.propTypes = {
  avatar_type: PropTypes.any,
  className: PropTypes.string,
  sub_title: PropTypes.string,
  title: PropTypes.string,
  value: PropTypes.string
}

export default InfoBox
