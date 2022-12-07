// import { userService } from '../../services/user.service'

const initialState = {
  shows: null,
  selectedShow: null,
  showCategories: null,
  filterBy: {genereId: 99999, name: ''}
}

export function showReducer(state = initialState, action) {
  switch (action.type) {
    case 'SET_SHOWS':
      return { ...state, shows: action.shows }
    case 'SET_SELECTED_SHOW':
      return { ...state, selectedShow: action.selectedShow }
    case 'SET_SHOW_CATEGORIES':
      return { ...state, showCategories: action.categories }
    case 'SET_FILTER_BY':
      return { ...state, filterBy: {...state.filterBy ,...action.filterBy}}
    default:
      return state
  }
}
