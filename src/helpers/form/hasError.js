/**
 * Returns a bool if the input field has errors
 * And if the given input field is already touch
 * @param {`name` of input} field
 * @param {`state`} formState
 * formState {
 *  touched: {},
 *  values: {},
 *  errors: {},
 *  isValid: bool,
 * }
 */
export const hasError = (field, formState) =>
  formState.touched[field] && formState.errors[field] ? true : false
