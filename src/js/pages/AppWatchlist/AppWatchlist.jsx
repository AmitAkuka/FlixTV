import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { ShowList } from "../../cmps/ShowList/ShowList"
import { AppLoader } from "../../cmps/AppLoader/AppLoader"

export const AppWatchlist = () => {
  const { user } = useSelector((storeState) => storeState.userModule)
  const [watchlist, setWatchlist] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    setWatchlist(user.watchlist)
  }, [user])

  const onSelectShow = (id) => {
    navigate(`../show/${id}`, { replace: true })
  }

  return (
    <section className="main-app-watchlist-container">
      <h2>{user.displayName} Watchlist</h2>
      {!watchlist && <AppLoader />}
      {watchlist &&
        (!!watchlist.length ? (
          <ShowList shows={watchlist} onSelectShow={onSelectShow} />
        ) : (
          <h3>Watch list is empty</h3>
        ))}
    </section>
  )
}
