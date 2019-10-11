import { TOGGLE_MODAL } from './constants'

const initialState = {
  isModalOpen: false, // for opening and closing the modal
  title: null // for title of the modal
}

export function appModalReducer(state = initialState, action) {
  switch (action.type) {
    case TOGGLE_MODAL:
      // The split here helps in setting the title without delay
      if (state.isModalOpen) {
        // Modal is open | close it
        return {
          ...state,
          isModalOpen: !state.isModalOpen
        }
      }
      // Modal is close | open it
      return {
        ...state,
        title: action.title,
        isModalOpen: !state.isModalOpen
      }

    default:
      return state
  }
}
