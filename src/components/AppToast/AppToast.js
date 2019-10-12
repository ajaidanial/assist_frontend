import { toast } from 'react-toastify'
import './styles.css'

const TOAST_TIME = 3000

function showAppToast(content, type = null) {
  const toastConfig = {
    position: 'bottom-right',
    autoClose: TOAST_TIME,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true
  }

  if (type === 'success') {
    return new Promise(function(resolve) {
      toast.success(content, toastConfig)
      setTimeout(function() {
        resolve()
      }, TOAST_TIME)
    })
  }
  if (type === 'warning') {
    return new Promise(function(resolve) {
      toast.warning(content, toastConfig)
      setTimeout(function() {
        resolve()
      }, TOAST_TIME)
    })
  }
  if (type === 'error') {
    return new Promise(function(resolve) {
      toast.error(content, toastConfig)
      setTimeout(function() {
        resolve()
      }, TOAST_TIME)
    })
  }
  if (type === 'info') {
    return new Promise(function(resolve) {
      toast.info(content, toastConfig)
      setTimeout(function() {
        resolve()
      }, TOAST_TIME)
    })
  }
  return new Promise(function(resolve) {
    toast.success(content, toastConfig)
    setTimeout(function() {
      resolve()
    }, TOAST_TIME)
  })
}

export default showAppToast
