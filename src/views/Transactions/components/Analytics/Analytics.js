import React from 'react'
import clsx from 'clsx'
import PropTypes from 'prop-types'
import { Bar } from 'react-chartjs-2'
import { makeStyles } from '@material-ui/styles'
import {
  Card,
  CardHeader,
  CardContent,
  Divider,
  Button
} from '@material-ui/core'
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown'
import { data, options } from './chart'

const useStyles = makeStyles(() => ({
  root: {},
  chartContainer: {
    height: 260,
    position: 'relative'
  },
  actions: {
    justifyContent: 'flex-end'
  }
}))

const Analytics = (props) => {
  const { className, ...rest } = props
  const classes = useStyles()

  return (
    <Card {...rest} className={clsx(classes.root, className)}>
      <CardHeader
        action={
          // TODO: add options here
          <Button size="small" variant="text">
            Last 7 days <ArrowDropDownIcon />
          </Button>
        }
        title="Transactional Analytics"
      />
      <Divider />
      <CardContent>
        <div className={classes.chartContainer}>
          <Bar data={data} options={options} />
        </div>
      </CardContent>
    </Card>
  )
}

Analytics.propTypes = {
  className: PropTypes.string
}

export default Analytics
