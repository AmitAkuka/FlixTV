import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import {
  setSelectedShow,
  loadShowCategories,
  clearSelectedShow,
  getTrailerById,
} from "../../store/show/show.action.js"
import {
  addToWatchlist,
  removeFromWatchlist,
} from "../../store/user/user.action.js"

import { ShowDetailsPreview } from "../../cmps/ShowDetailsPreview/ShowDetailsPreview"
import { ShowActorList } from "../../cmps/ShowActorList/ShowActorList"
import { ShowSuggestionList } from "../../cmps/ShowSuggestionList/ShowSuggestionList"
import { AppLoader } from "../../cmps/AppLoader/AppLoader"
import { TrailerModal } from "../../cmps/TrailerModal/TrailerModal"
import { toast } from "react-toastify"

export const ShowDetails = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [youtubeId, setYoutubeId] = useState(null)
  const [isShowInWatchlist, setIsShowInWatchlist] = useState(null)
  const { selectedShow } = useSelector((storeState) => storeState.showModule)
  const { user } = useSelector((storeState) => storeState.userModule)
  const { id } = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const BASE_IMG_URL = "https://image.tmdb.org/t/p/w500"

  useEffect(() => {
    window.scrollTo(0, 0)
    dispatch(setSelectedShow(id))
    dispatch(loadShowCategories())
    return () => {
      dispatch(clearSelectedShow())
    }
  }, [])

  useEffect(() => {
    const showInWatchlist = user?.watchlist.find((show) => show.id === +id)
    setIsShowInWatchlist(showInWatchlist)
  }, [user, id])

  const handleTrailerClick = async () => {
    const videoId = await dispatch(getTrailerById(id))
    if (!videoId) {
      toast.error("Trailer video not found!")
      return
    }
    setIsModalOpen(true)
    setYoutubeId(videoId)
  }

  const handleWatchlistClick = () => {
    if (!user) {
      toast.error("Login is required")
      return
    }
    if (isShowInWatchlist) {
      dispatch(removeFromWatchlist(user.uid, +id))
      // setIsShowInWatchlist(false)
    } else {
      const { id, name, poster_path, first_air_date, genres } = selectedShow
      const genreNames = genres.flatMap((g) => g.name)
      const showToSave = {
        id,
        poster_path,
        name,
        first_air_date,
        genres: genreNames,
      }
      dispatch(addToWatchlist(user.uid, showToSave))
    }
  }

  const onSelectShow = (id) => {
    navigate(`/show/${id}`, { replace: true })
    navigate(0)
  }

  const { backdrop_path, actors, suggestedShows } = selectedShow || {}

  return (
    <section className="main-details-container">
      {(!selectedShow || isShowInWatchlist === null) && <AppLoader />}
      {selectedShow && (
        <div className="details-container">
          <div
            className="show-background-container"
            style={{ backgroundImage: `url(${BASE_IMG_URL}/${backdrop_path})` }}
          ></div>
          <div className="show-details-container main-layout">
            <ShowDetailsPreview
              selectedShow={selectedShow}
              handleTrailerClick={handleTrailerClick}
              handleWatchlistClick={handleWatchlistClick}
              isShowInWatchlist={isShowInWatchlist}
            />
            <ShowActorList actors={actors} />
            <ShowSuggestionList
              shows={suggestedShows}
              onSelectShow={onSelectShow}
            />
          </div>
        </div>
      )}
      {isModalOpen && youtubeId && (
        <TrailerModal youtubeId={youtubeId} setIsModalOpen={setIsModalOpen} />
      )}
      {/* <AppFooter /> */}
    </section>
  )
}
