// import { ShowRating } from "./show-rating.jsx"
import { useSelector } from "react-redux"

export const ShowPreview = ({ show, onSelectShow }) => {
  const { showCategories } = useSelector((storeState) => storeState.showModule)
  const IMG_GRADIENT = "linear-gradient(rgba(255,255,255,.2), rgba(0,0,0,.6))"
  const BASE_IMG_URL = "https://image.tmdb.org/t/p/w500"

  const getShowYear = (date) => new Date(date).getFullYear()

  const getShowCategories = (ids) => {
    const categories = ids.reduce((acc, id) => {
      const category = showCategories.find(category => category.genereId === id)
      acc.push(category?.genereName)
      return acc
    }, [])
    return categories.join(",")
  }

  const { id, first_air_date, poster_path, name, genre_ids, vote_average,genres } =
    show
    console.log(genres)
  return (
    <section
      className="show-preview-container"
      onClick={() => onSelectShow(id)}
      style={{
        backgroundImage: `${IMG_GRADIENT},url(${BASE_IMG_URL}/${poster_path})`,
      }}
    >
      <div className="show-preview-details">
        <p>{getShowYear(first_air_date)}</p>
        <h2>{name}</h2>
        {genre_ids && <span>{getShowCategories(genre_ids)}</span>}
        {!genre_ids && <span>{genres.join(",")}</span>}
        {/* Was beautiful but material-ui slowed the shit out of this app xD */}
        {/* <ShowRating rating={vote_average}/> */}
      </div>
    </section>
  )
}
