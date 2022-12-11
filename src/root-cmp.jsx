import React from "react"
import { useEffect, useState } from "react"
import { Route, Routes } from "react-router-dom"
import { routes } from "./routes.js"
import { AppHeader } from "./js/cmps/AppHeader/AppHeader"
import { AppFooter } from "./js/cmps/AppFooter/AppFooter"
import { ScrollUpBtn } from "./js/cmps/ScrollUpBtn/ScrollUpBtn"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

export function App() {
  const [isScrollBtnShown, setIsScrollBtnShown] = useState(null)

  useEffect(() => {
    setTimeout(() => {
      if (isScrollBtnShown === null && window.pageYOffset >= 1)
        setIsScrollBtnShown(true)
    }, 50)
    window.addEventListener("scroll", () => {
      if (!window.pageYOffset >= 10 && window.pageYOffset !== 0) return
      checkWindowYOffset(window.pageYOffset)
    })
  }, [])

  const checkWindowYOffset = (pageYOffset) => {
    setIsScrollBtnShown(10 <= pageYOffset)
  }

  return (
    <div className="App">
      <AppHeader />
      <Routes>
        {routes.map((route, idx) => (
          <Route key={idx} path={route.path} element={<route.component />} />
        ))}
      </Routes>
      <AppFooter />
      {isScrollBtnShown && <ScrollUpBtn />}
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
