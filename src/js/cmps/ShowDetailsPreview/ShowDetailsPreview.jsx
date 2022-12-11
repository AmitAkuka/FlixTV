import { ShowRating } from '../ShowRating/ShowRating'
import PlayCircleIcon from '@mui/icons-material/PlayCircle'
import PlaylistPlayIcon from '@mui/icons-material/PlaylistPlay'
import PlaylistRemoveIcon from '@mui/icons-material/PlaylistRemove'
import { ShowEpisodeDetails } from '../ShowEpisodeDetails/ShowEpisodeDetails'

export const ShowDetailsPreview = ({ selectedShow,handleTrailerClick, handleWatchlistClick, isShowInWatchlist }) => {
  const BASE_IMG_URL = 'https://image.tmdb.org/t/p/w500'

  const getShowYear = (date) =>  new Date(date).getFullYear()
 
  const {
    poster_path,
    name,
    tagline,
    vote_average,
    vote_count,
    number_of_seasons,
    number_of_episodes,
    overview,
    genres,
    first_air_date,
    spoken_languages,
    created_by
  } = selectedShow
  return (
    <section className="main-show-details-preview">
      <div className="show-img-container">
        <img src={`${BASE_IMG_URL}/${poster_path}`} alt="" />
      </div>
      <div className="show-info-container">
        <h1>{name}</h1>
        <h2>{tagline}</h2>
        <div className="show-general-details">
          <span>Seasons: {number_of_seasons}</span>
          <ShowRating rating={vote_average} />
          <span className="vote-count">({vote_count})</span>
          <span>{getShowYear(first_air_date)}</span>
        </div>
        <div className="show-btns-container">
          <button className="trailer-btn" onClick={handleTrailerClick}>
            <PlayCircleIcon /> Watch trailer
          </button>
          {!isShowInWatchlist && <button className="watchlist-btn" onClick={handleWatchlistClick}>
            <PlaylistPlayIcon /> Add to Watchlist
          </button>}
          {isShowInWatchlist && <button className="watchlist-btn" onClick={handleWatchlistClick}>
            <PlaylistRemoveIcon /> Remove from Watchlist
          </button>}
        </div>
        <ShowEpisodeDetails 
        episodesNum={number_of_episodes}
        overview={overview}
        genres={genres}
        createdBy={created_by}
        languages={spoken_languages}
        />
      </div>
    </section>
  )
}
