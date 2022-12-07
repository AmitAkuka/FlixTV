import { ShowPreview } from "./show-preview.jsx"

export const ShowList = ({ shows, onSelectShow }) => {
  console.log(shows)
  return (
    <section className="show-list-container main-layout">
      {!!shows.length &&
        shows.map((show) => (
          <ShowPreview key={show.id + show.first_air_date} show={show} onSelectShow={onSelectShow} />
        ))}
      {!shows.length && <h2>No results found</h2>}
    </section>
  )
}
