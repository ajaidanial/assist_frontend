/* eslint-disable no-console */
import { SendRequest } from '../api'

/**
 * Checks if the logged in user's token is valid.
 * Used in ProtectedlayoutRoute
 */
export function checkAuth() {
  let user_id = JSON.parse(localStorage.getItem('user_data')).id
  return SendRequest({ user_id: user_id }, 'POST', '/api/check_auth_token/')
    .then((response) => {
      if (response.success) {
        return true
      } else {
        return false
      }
    })
    .catch((error) => {
      console.log(
        'Error from checkAuth func.',
        error,
        error.response,
        error.request
      )
    })
}
