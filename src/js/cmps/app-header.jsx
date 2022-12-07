import { Link } from "react-router-dom"
import { useSelector,useDispatch } from "react-redux"
import { userLogout } from "../store/user/user.action"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"

export const AppHeader = () => {
  const { user } = useSelector((storeState) => storeState.userModule)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogout = () => {
    console.log('logout')
    dispatch(userLogout())
    navigate("/")
    toast.success('Signed out Successfully!')
  }

  return (
    <header className="main-header-container main-layout">
      <Link to={"/"}>
        <img src={require("../../assets/img/logo.png")} alt="" />
        FlixTV
      </Link>
      <div className="header-btns-container">
        {!user && <Link to={"/login"}>Login</Link>}
        {user && (
          <>
            <h3>
              Welcome, <span>{user.displayName}</span>
            </h3>
            <Link to={"/watchlist"}>Watchlist</Link>
            <h3 className="logout-btn" onClick={handleLogout}>Logout</h3>
          </>
        )}
      </div>
    </header>
  )
}
