import { showService } from '../../services/showService.js'

export function loadShows(page = 1) {
  return async (dispatch, getState) => {
    try {
      const { filterBy, shows } = getState().showModule
      let newShows = (filterBy.name) 
      ? await showService.queryByName(filterBy.name, page) 
      : await showService.query(filterBy, page)
      if (page > 1) newShows.results = [...shows.results, ...newShows.results]
      dispatch({ type: 'SET_SHOWS', shows: newShows })
    } catch (err) {
      console.log(err)
    }
  }
}

export function loadShowCategories() {
  return async (dispatch) => {
    try {
      const categories = await showService.queryCategories()
      categories.unshift({ genereId: 99999, genereName: 'Popular' })
      dispatch({ type: 'SET_SHOW_CATEGORIES', categories })
    } catch (err) {
      console.log(err)
    }
  }
}

export function setFilterBy(filterBy) {
  return async (dispatch) => {
    dispatch({ type: 'SET_FILTER_BY', filterBy })
  }
}

export function getShowsByName(showName){
  return async (dispatch) => {
    try{
      dispatch(setFilterBy({name: showName}))
      dispatch(loadShows());
    }catch(err){
      console.log(err)
    }
  }
}

export function setSelectedShow(id) {
  return async (dispatch) => {
    try {
      const selectedShow = await showService.queryById(id)
      dispatch({ type: 'SET_SELECTED_SHOW', selectedShow })
    } catch (err) {
      console.log(err)
    }
  }
}

export function clearSelectedShow() {
  return async (dispatch) => {
    try {
      dispatch({ type: 'SET_SELECTED_SHOW', selectedShow: null })
    } catch (err) {
      console.log(err)
    }
  }
}

export function getTrailerById(id){
  return async () => {
    try{
      const videoId = await showService.queryTrailerById(id)
      return videoId
    }catch (err){
      console.log(err)
    }
  }
}
