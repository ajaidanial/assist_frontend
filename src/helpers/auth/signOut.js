export const signOut = () => {
  sessionStorage.removeItem('token')
  sessionStorage.removeItem('user_data')
  window.location.reload()
}
