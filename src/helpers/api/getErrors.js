// Check if a variable is dict or not
// Returns true || false
function isDict(v) {
  return (
    typeof v === 'object' &&
    v !== null &&
    !(v instanceof Array) &&
    !(v instanceof Date)
  )
}

/**
 * A helper function for SendRequest => gets the error object and returns the error array
 * @param {Object} error_object Gets the errors as an object
 * @param {Array} store The array that is passed => the list of string errors
 */
export const getErrors = (error_object, store) => {
  if (isDict(error_object)) {
    // is a dict
    let dict_values_as_array = Object.values(error_object) // returns array
    getErrors(dict_values_as_array, store)
  } else if (Array.isArray(error_object)) {
    // is a array
    for (let array_index in error_object) {
      getErrors(error_object[array_index], store)
    }
  } else {
    // is a string
    store.push(error_object)
  }
}
