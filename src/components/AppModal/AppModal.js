/* eslint-disable react/jsx-boolean-value */
/* eslint-disable react/jsx-boolean-value */

import React, { Component } from 'react'
import { styles } from './styles'
import { withStyles } from '@material-ui/styles'
import Modal from '@material-ui/core/Modal'
import Backdrop from '@material-ui/core/Backdrop'
import Fade from '@material-ui/core/Fade'
import PropTypes from 'prop-types'
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Button,
  Divider
} from '@material-ui/core'
import { connect } from 'react-redux'
// test
import { toggleAppModal } from './actions'

class AppModal extends Component {
  render() {
    const { classes, toggleAppModal } = this.props
    return (
      <Modal
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 1000
        }}
        className={classes.modal}
        closeAfterTransition
        open={true}
      >
        <Fade in={true}>
          <Card className={classes.card}>
            <CardHeader title="Error" />
            <Divider />

            <CardContent className={classes.cardContent}>
              <h1>test</h1>
            </CardContent>

            <Divider />
            <CardActions className={classes.cardFooter}>
              <Button
                color="primary"
                onClick={toggleAppModal}
                size="small"
                variant="text"
              >
                close
              </Button>
            </CardActions>
          </Card>
        </Fade>
      </Modal>
    )
  }
}

AppModal.propTypes = {
  classes: PropTypes.func,
  state: PropTypes.object,
  toggleAppModal: PropTypes.func
}

const mapStateToProps = (state) => {
  return {
    state: state.appModalReducer
  }
}

export default withStyles(styles)(
  connect(
    mapStateToProps,
    {
      toggleAppModal
    }
  )(AppModal)
)
