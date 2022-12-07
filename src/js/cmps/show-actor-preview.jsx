export const ShowActorPreview = ({ actor }) => {
  const BASE_IMG_URL = 'https://image.tmdb.org/t/p/w500'

  const { character, name, profile_path } = actor
  const actorImg = `${BASE_IMG_URL}/${profile_path}`
  return <section className="actor-preview-container">
      <img src={actorImg} alt="" />
      <div className="actor-info-container">
        <h1>{name}</h1>
        <h2>As {character}</h2>
      </div>
    </section>
}
