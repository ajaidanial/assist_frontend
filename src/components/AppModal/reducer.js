import { TOGGLE_MODAL } from './constants'

const initialState = {
  isModalOpen: false // for opening and closing the modal
}

export function appModalReducer(state = initialState, action) {
  switch (action.type) {
    case TOGGLE_MODAL:
      return {
        ...state,
        isModalOpen: !state.isModalOpen
      }

    default:
      return state
  }
}
