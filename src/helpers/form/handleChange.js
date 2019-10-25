/**
 * Called on change of values in input fields.
 * Stores values to the state.
 * @param {form change event} event
 * @param {`state`} formState
 * @param {`func` that changes formState} formStateAction
 * formState {
 *  touched: {},
 *  values: {},
 *  errors: {},
 *  isValid: bool,
 * }
 */
export const handleChange = (event, formState, formStateAction) => {
  // init works
  let name = event.target.name
  if (typeof event.target.name === 'object') {
    name = event.target.name.name
  }
  // main work starts
  event.persist()
  formStateAction({
    ...formState,
    values: {
      ...formState.values,
      [name]: event.target.value
    },
    touched: {
      ...formState.touched,
      [name]: true
    }
  })
}
