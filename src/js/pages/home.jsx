import { useEffect } from "react"
import { useSearchParams, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { loadShows, loadShowCategories, setFilterBy, getShowsByName } from "../store/show/show.action.js"
import InfiniteScroll from "react-infinite-scroller"

import { AppHero } from "../cmps/app-hero.jsx"
import { AppLoader } from "../cmps/app-loader.jsx"
import { ShowList } from "../cmps/show-list.jsx"
import { CategoryFilter } from "../cmps/category-filter.jsx"

export const Home = () => {
  const { shows, showCategories } = useSelector((storeState) => storeState.showModule)
  const dispatch = useDispatch()
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()

  useEffect(() => {
    console.log("home cmp mounted!")
    const filter = searchParams.get("filter")
    if (filter) dispatch(setFilterBy(filter))
    dispatch(loadShowCategories())
    dispatch(loadShows())
    return () => {
      console.log("home unmount")
    }
  }, [])

  const onChangeGenereFilter = (filter) => {
    dispatch(setFilterBy(filter))
    dispatch(loadShows())
  }

  const onSelectShow = (id) => {
    console.log("show selected:", id)
    navigate(`show/${id}`)
  }

  const onSetSearch = async ({ target }) => {
    console.log(target.value)
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
