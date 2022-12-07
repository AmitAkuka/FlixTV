import { userService } from '../../services/userService'

const initialState = {
  user: userService.getLoggedinUser(),
}

export function userReducer(state = initialState, action) {
  switch (action.type) {
    case 'SET_USER':
      return { ...state, user: action.user }
    case 'UPDATE_WATCHLIST':
      return { ...state, user: {...state.user, watchlist: [...state.user.watchlist, action.show]} }

    default:
      return state
  }
}