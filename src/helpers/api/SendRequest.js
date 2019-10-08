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
    // Work on getting data from session storage
    headers.Authorization = `JWT ${localStorage.getItem('token')}`
  }

  return axios({
    method,
    url: `${server}${endPoint}`,
    headers,
    data
  })
    .then((response) => {
      if (response.status === 200) {
        return response
      } else {
        alert('Handle other responses => SendRequest func.')
      }
      console.log(response)
      console.log(response.data)
    })
    .catch((error) => {
      alert('Handle errors.')
      console.log(
        'Error from SendRequest func.',
        error,
        error.response,
        error.request
      )
    })
}

// TODO: Modals
// TODO: Toast
// TODO: Store Token
