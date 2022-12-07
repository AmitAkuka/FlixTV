import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import {
  setSelectedShow,
  loadShowCategories,
  clearSelectedShow,
  getTrailerById,
} from "../store/show/show.action.js"
import { addToWatchlist } from "../store/user/user.action.js"

import { ShowDetailsPreview } from "../cmps/show-details-preview.jsx"
import { ShowActorList } from "../cmps/show-actor-list.jsx"
import { ShowSuggestionList } from "../cmps/show-suggestion-list.jsx"
import { AppLoader } from "../cmps/app-loader.jsx"
import { TrailerModal } from "../cmps/trailer-modal.jsx"
import { toast } from "react-toastify"

export const ShowDetails = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [youtubeId, setYoutubeId] = useState(null)
  const { selectedShow } = useSelector((storeState) => storeState.showModule)
  const { user } = useSelector((storeState) => storeState.userModule)
  const { id } = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const BASE_IMG_URL = "https://image.tmdb.org/t/p/w500"

  useEffect(() => {
    console.log("show details mounted!", id)
    window.scrollTo(0, 0)
    dispatch(setSelectedShow(id))
    dispatch(loadShowCategories())
    return () => {
      dispatch(clearSelectedShow())
    }
  }, [])

  const handleTrailerClick = async () => {
    const videoId = await dispatch(getTrailerById(id))
    if (!videoId) {
      toast.error("Trailer video not found!")
      return
    }
    setIsModalOpen(true)
    setYoutubeId(videoId)
  }

  const handleWatchlistClick = async () => {
    if (!user) {
      toast.error("Login is required")
      return
    }
    const { id, name, poster_path, first_air_date, genres } = selectedShow
    const genreNames = genres.flatMap((g) => g.name)
    const showToSave = { id, poster_path, name, first_air_date, genres: genreNames }
    dispatch(addToWatchlist(user.uid, showToSave))
  }

  const onSelectShow = (id) => {
    navigate(`../show/${id}`, { replace: true })
    navigate(0)
    // window.scrollTo(0, 0)
    // dispatch(clearSelectedShow())
    // dispatch(setSelectedShow(id))
  }

  console.log("selected show:", selectedShow)
  const { backdrop_path, actors, suggestedShows } = selectedShow || {}

  return (
    <section className="main-details-container">
      {!selectedShow && <AppLoader />}
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
