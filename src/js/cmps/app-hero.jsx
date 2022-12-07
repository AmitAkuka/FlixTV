import { useRef } from 'react'
import SearchIcon from '@mui/icons-material/Search'
import _ from 'lodash'

export const AppHero = ({ onSetSearch }) => {
  const ref = useRef()
  ref.current = _.debounce(onSetSearch, 250)

  return (
    <section className="main-hero-container main-layout">
      <h1>Unlimited TV shows waiting for you!</h1>
      <div className="show-search-main-container">
        <input
          className="search-input"
          type="text"
          placeholder="Search by TV name..."
          onChange={ref.current}
        />
        <button className="search-btn">
          <SearchIcon />
        </button>
      </div>
    </section>
  )
}
