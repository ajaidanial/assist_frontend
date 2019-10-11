import React from 'react'
import ReactDOM from 'react-dom'

import * as serviceWorker from './serviceWorker'
import App from './App'
// Redux
import Store from './Store'
import { Provider } from 'react-redux'

ReactDOM.render(
  <Provider store={Store}>
    <App />
  </Provider>,
  document.getElementById('root')
)

serviceWorker.unregister()
