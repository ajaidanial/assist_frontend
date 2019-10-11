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
import { toggleAppModal } from './actions'

class AppModal extends Component {
  render() {
    // Get from props
    const { classes, toggleAppModal, state } = this.props

    return (
      <Modal
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 1000
        }}
        className={classes.modal}
        closeAfterTransition
        onClose={toggleAppModal}
        open={state.isModalOpen}
      >
        <Fade in={state.isModalOpen}>
          <Card className={classes.card}>
            <CardHeader title={state.title} />
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

// Prop Types
AppModal.propTypes = {
  classes: PropTypes.object,
  state: PropTypes.object,
  toggleAppModal: PropTypes.func
}

// To map the appModalReducer's States to this component
const mapStateToProps = (state) => {
  return {
    state: state.appModalReducer
  }
}

// To map the appModalReducer's State to this component
const mapDispatchToProps = (dispatch) => {
  return {
    toggleAppModal: () => dispatch(toggleAppModal())
  }
}

// Export the styles, state and actions to its props
export default withStyles(styles)(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(AppModal)
)
