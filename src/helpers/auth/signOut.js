export const signOut = () => {
  localStorage.removeItem('token')
  localStorage.removeItem('user_data')
  window.location.reload()
}
