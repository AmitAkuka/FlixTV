import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { App } from './root-cmp.jsx'
import './assets/styles/main.scss'
import configureStore from './js/configure-store'
import { BrowserRouter as Router } from 'react-router-dom'

const store = configureStore()

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>
)
