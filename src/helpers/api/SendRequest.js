/* eslint-disable no-console */
import { getErrors } from './getErrors'
import { showAppToast } from '../../components'

const axios = require('axios')
// The server address
const server = 'http://localhost:8000'

/**
 * Basically the method used to send requests to the server
 * Returns the data => If response.status === 200
 * Handles the other messages here itelf.
 * Calls the Models, Toasts | if necessary
 *
 * @param {string} method - method of the request => GET, POST, DELETE, PUT, PATCH
 * @param {string} endPoint - the end point of the API
 * @param {object} data - data to be sent
 * @param {boolean} includeToken - specify if the request needs a token
 */
export default function SendRequest(
  data,
  method,
  endPoint,
  includeToken = true
) {
  const headers = {
    'Content-Type': 'application/json'
  }

  // Gets the authToken and add it to header
  // Skiped if includeToken is false
  if (includeToken) {
    headers.Authorization = `Token ${localStorage.getItem('token')}`
  }
  // Constainst the success statuses
  // If response.status is in this object => passes to the outer function
  const successfulStatuses = [200, 201, 204]

  return axios({
    method,
    url: `${server}${endPoint}`,
    headers,
    data
  })
    .then((response) => {
      // console.log('Response from SendRequest func.', response)
      // variable that tells the outer function if request was successfull
      let isSuccessful = false
      // Logics of the requests
      if (successfulStatuses.includes(response.status)) {
        isSuccessful = true
      } else {
        alert('Handle other responses => SendRequest func.')
      }
      return {
        success: isSuccessful,
        ...response
      }
    })
    .catch((error) => {
      console.log(
        'Error from SendRequest func.',
        error,
        error.response,
        error.request
      )

      const { data } = error.response // errors from response
      let errors = [] // the array of errors
      getErrors(data, errors) // the errors will have a list of errors at the end of func

      if (errors.length === 1) {
        showAppToast(errors[0], 'error')
      } else {
        // Use AppModal here
        alert('Handle more errors => SendRequest func')
      }

      return {
        success: false,
        ...error.response
      }
    })
}
