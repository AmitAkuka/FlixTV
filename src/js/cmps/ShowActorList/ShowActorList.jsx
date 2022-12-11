import { ShowActorPreview } from "../ShowActorPreview/ShowActorPreview"

export const ShowActorList = ({ actors }) => {
  return <div className="show-actor-container">
  <h1>Actors</h1>
  <div className="show-actor-list">
    {actors.map((actor) => <ShowActorPreview key={actor.id} actor={actor} />)}
  </div>
</div>
}