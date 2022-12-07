import { useEffect,useState } from "react"
import { useSelector,useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { ShowList } from "../cmps/show-list"


export const AppWatchlist = () => {
  const { user } = useSelector((storeState) => storeState.userModule)
  const [ watchlist,setWatchlist ] = useState(null)

  useEffect(() => {
    setWatchlist(user.watchlist)
    console.log(watchlist)
  },[user])

  return <section className="main-app-watchlist-container">
    <h2>{user.displayName} Watchlist</h2>
      {watchlist && <ShowList shows={watchlist} />}
      {!watchlist && <h3>Watch list is empty</h3>}
  </section>
}