import { toast } from 'react-toastify'
import './styles.css'

function showAppToast(content, type = null) {
  const toastConfig = {
    position: 'bottom-right',
    autoClose: 3000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true
  }

  if (type === 'success') {
    return toast.success(content, toastConfig)
  }
  if (type === 'warning') {
    return toast.warning(content, toastConfig)
  }
  if (type === 'error') {
    return toast.error(content, toastConfig)
  }
  if (type === 'info') {
    return toast.info(content, toastConfig)
  }
  return toast.success(content, toastConfig)
}

export default showAppToast
