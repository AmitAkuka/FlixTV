import { userService } from "../../services/userService"

export function setUser(user) {
  return (dispatch) => {
    const action = { type: "SET_USER", user }
    dispatch(action)
  }
}

export function userLogout() {
  return (dispatch) => {
    userService.logout()
    dispatch({
      type: "SET_USER",
      user: null,
    })
  }
}

export function addToWatchlist(userId, show) {
  return async (dispatch) => {
    const updatedWatchlist = await userService.addToWatchlist(userId, show)
    dispatch({
      type: "UPDATE_WATCHLIST",
      updatedWatchlist,
    })
  }
}

export function removeFromWatchlist(userId, showId) {
  return async (dispatch) => {
    const updatedWatchlist = await userService.removeFromWatchlist(userId, showId)
    dispatch({
      type: "UPDATE_WATCHLIST",
      updatedWatchlist,
    })
  }
}
