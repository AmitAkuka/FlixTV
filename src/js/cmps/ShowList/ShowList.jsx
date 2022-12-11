import { ShowPreview } from "../ShowPreview/ShowPreview"

export const ShowList = ({ shows, onSelectShow }) => {
  return (
    <section className="show-list-container main-layout">
      {!!shows.length &&
        shows.map((show) => (
          <ShowPreview
            key={show.id}
            show={show}
            onSelectShow={onSelectShow}
          />
        ))}
      {!shows.length && <h2>No results found</h2>}
    </section>
  )
}
