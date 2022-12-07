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
  return (dispatch) => {
    userService.addToWatchlist(userId, show)
    dispatch({
      type: "UPDATE_WATCHLIST",
      show,
    })
  }
}
