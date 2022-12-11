import { useRef,useState } from 'react'
import { useSelector } from 'react-redux'
import SearchIcon from '@mui/icons-material/Search'
import _ from 'lodash'

export const AppHero = ({ onSetSearch }) => {
  const { filterBy } = useSelector((storeState) => storeState.showModule)
  const [ filterValue, setFilterValue ] = useState(filterBy?.name)
  const ref = useRef()
  ref.current = _.debounce(onSetSearch, 250)

  const handleInputChange = (ev) => {
    ref.current(ev)
    setFilterValue(() => ev.target.value)
  }
  
  return (
    <section className="main-hero-container main-layout">
      <h1>Unlimited TV shows waiting for you!</h1>
      <div className="show-search-main-container">
        <input
          className="search-input"
          type="text"
          placeholder="Search by TV name..."
          onChange={handleInputChange}
          value={filterValue}
        />
        <button className="search-btn">
          <SearchIcon />
        </button>
      </div>
    </section>
  )
}
