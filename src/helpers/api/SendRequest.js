const axios = require('axios')
const server = 'http://52.66.73.132'

/**
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

  // Get the authToken and add it to header
  // Skips if includeToken is false
  if (includeToken) {
    // Work on getting data from session storage
    headers.Authorization = `JWT ${localStorage.getItem('token')}`
  }

  axios({
    method,
    url: `${server}${endPoint}`,
    headers,
    data
  })
    .then((response) => {
      if (response.status === 200) {
        alert('Success')
        console.log(response.data, 'received data')
        // TODO: work on getting the data out
      } else {
        alert('Handle other responses.')
      }
      console.log(response)
      console.log(response.data)
    })
    .catch((error) => {
      alert('Handle errors.')
      console.log(error)
      console.log(error.response)
    })
}
