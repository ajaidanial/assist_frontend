/* eslint-disable import/prefer-default-export */
import * as types from './constants'

// call toggleAppModal(title) => to open the Modal
// call toggleAppModal() => to close the Modal
export const toggleAppModal = (title = null) => ({
  type: types.TOGGLE_MODAL,
  title
})
