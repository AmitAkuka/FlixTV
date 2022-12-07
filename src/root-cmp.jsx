import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { routes } from './routes.js'
import { AppHeader } from './js/cmps/app-header.jsx'
import { AppFooter } from './js/cmps/app-footer.jsx';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export function App() {
  return (
    <div className="App">
      <AppHeader />
      <Routes>
        {routes.map((route, idx) => (
          <Route key={idx} path={route.path} element={<route.component />} />
        ))}
      </Routes>
      <AppFooter/>
      <ToastContainer
        theme="dark"
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover={false}
      />
    </div>
  )
}
