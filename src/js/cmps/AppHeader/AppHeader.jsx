import { useState } from "react"
import { NavLink, Link } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { userLogout } from "../../store/user/user.action"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import MenuIcon from "@mui/icons-material/Menu"

export const AppHeader = () => {
  const { user } = useSelector((storeState) => storeState.userModule)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogout = () => {
    if (isMenuOpen) setIsMenuOpen(false)
    dispatch(userLogout())
    navigate("/")
    toast.success("Signed out Successfully!")
  }

  const onMenuClick = () => {
    setIsMenuOpen((prevState) => !prevState)
  }

  const getMenuCmp = () => {
    return (
      <>
        <h3>
          Welcome, <span>{user.displayName}</span>
        </h3>
        <Link to={"/watchlist"}>Watchlist</Link>
        <h3 className="logout-btn" onClick={handleLogout}>
          Logout
        </h3>
      </>
    )
  }

  const getMobileMenuCmp = () => {
    if (user) {
      return (
        <>
          <h3>
            Welcome, <span>{user.displayName}</span>
          </h3>
          <NavLink onClick={() => setIsMenuOpen(false)} to="/">
            Home
          </NavLink>
          <NavLink onClick={() => setIsMenuOpen(false)} to="/watchlist">
            Watchlist
          </NavLink>
          <NavLink className="logout-btn" onClick={handleLogout} to="/">
            Logout
          </NavLink>
        </>
      )
    } else if (!user) {
      return (
        <Link onClick={() => setIsMenuOpen(false)} to={"/login"}>
          Login
        </Link>
      )
    }
  }

  return (
    <header className="main-header-container main-layout">
      <Link to={"/"}>
        <img src={require("../../../assets/img/logo.png")} alt="" />
        FlixTV
      </Link>
      <div className="header-btns-container">
        {!user && <Link to={"/login"}>Login</Link>}
        {user && getMenuCmp()}
      </div>
      <div onClick={onMenuClick} className="hamburger-menu-container">
        <MenuIcon className="hamburger-menu" />
      </div>
      {isMenuOpen && (
        <div className="hamburger-popup-menu-container">
          {getMobileMenuCmp()}
        </div>
      )}
    </header>
  )
}
