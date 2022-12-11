import { useEffect } from "react"
import { useSearchParams, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import {
  loadShows,
  loadShowCategories,
  setFilterBy,
  getShowsByName,
} from "../../store/show/show.action.js"
import InfiniteScroll from "react-infinite-scroller"

import { AppHero } from "../../cmps/AppHero/AppHero"
import { AppLoader } from "../../cmps/AppLoader/AppLoader"
import { ShowList } from "../../cmps/ShowList/ShowList"
import { CategoryFilter } from "../../cmps/CategoryFilter/CategoryFilter"

export const Home = () => {
  const { shows, showCategories } = useSelector((storeState) => storeState.showModule)
  const dispatch = useDispatch()
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()

  useEffect(() => {
    const filter = searchParams.get("filter")
    if (filter) dispatch(setFilterBy(filter))
    dispatch(loadShowCategories())
    dispatch(loadShows())
  }, [])

  const onChangeGenereFilter = (filter) => {
    dispatch(setFilterBy(filter))
    dispatch(loadShows())
  }

  const onSelectShow = (id) => {
    navigate(`show/${id}`)
  }

  const onSetSearch = async ({ target }) => {
    const showName = target.value
    await dispatch(getShowsByName(showName))
  }

  return (
    <section className="main-home-container">
      <AppHero onSetSearch={onSetSearch} />
      {shows && showCategories && (
        <>
          <CategoryFilter
            categories={showCategories}
            onChangeGenereFilter={onChangeGenereFilter}
          />
          <InfiniteScroll
            pageStart={1}
            loadMore={(page) => dispatch(loadShows(page))}
            hasMore={shows.totalPages > shows.currPage}
            loader={<AppLoader key={959595} />}
          >
            <ShowList shows={shows.results} onSelectShow={onSelectShow} />
          </InfiniteScroll>
        </>
      )}
    </section>
  )
}
