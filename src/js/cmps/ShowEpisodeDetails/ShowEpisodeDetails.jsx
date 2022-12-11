export const ShowEpisodeDetails = ({episodesNum,overview,genres,createdBy,languages}) => {
  const getSortedData = (items) => {
    const res = items.reduce((acc, item) => {
      acc.push(item?.name)
      return acc
    },[]);
    return res.join(', ')
  }

  const getSpokenLanguages = (languages) => {
    const res = languages.reduce((acc, language) => {
      acc.push(`${language?.english_name} (${language?.name})`)
      return acc
    },[]);
    return res.join(', ')
  }

  return (
    <section className="show-episode-main-container">
      <div className="overview-container">
        <span>{overview}</span>
      </div>
      <div className="episode-details-container">
        <div className="details-subject">
          {!!createdBy.length && <span>Creators </span>}
          <span>Genres </span>
          <span>Subtitles </span>
          <span>Episodes </span>
        </div>
        <div className="details-info">
          {!!createdBy.length && <span>{getSortedData(createdBy)}</span>}
          <span>{getSortedData(genres)}</span>
          <span>{getSpokenLanguages(languages)}</span>
          <span>{episodesNum}</span>
        </div>
      </div>
    </section>
  )
}
