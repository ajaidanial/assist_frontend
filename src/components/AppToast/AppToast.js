import { toast } from 'react-toastify'
import './styles.css'

/**
 * This function on called show the bottom toast for the application
 * @param {the content for the toast} content
 * @param {type of toast => color | success, warning, error, info} type
 * @param {the time to show to toast => 1500s by default} toast_time
 */
function showAppToast(content, type = null, toast_time = 1500) {
  const toastConfig = {
    position: 'bottom-right',
    autoClose: toast_time,
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
      }, toast_time)
    })
  }
  if (type === 'warning') {
    return new Promise(function(resolve) {
      toast.warning(content, toastConfig)
      setTimeout(function() {
        resolve()
      }, toast_time)
    })
  }
  if (type === 'error') {
    return new Promise(function(resolve) {
      toast.error(content, toastConfig)
      setTimeout(function() {
        resolve()
      }, toast_time)
    })
  }
  if (type === 'info') {
    return new Promise(function(resolve) {
      toast.info(content, toastConfig)
      setTimeout(function() {
        resolve()
      }, toast_time)
    })
  }
  return new Promise(function(resolve) {
    toast.success(content, toastConfig)
    setTimeout(function() {
      resolve()
    }, toast_time)
  })
}

export default showAppToast
