// import { storageService } from './async-storage.service'
// import { socketService } from './socket.service'
import { firebaseService } from "./firebaseService"

const STORAGE_KEY_LOGGEDIN_USER = "loggedInUser"

export const userService = {
  login,
  logout,
  signup,
  getLoggedinUser,
  saveLocalUser,
  // getById,
  resetPassword,
  addToWatchlist,
  removeFromWatchlist
}

window.userService = userService

// async function getById(userId) {
//   //   const user = await firebaseService.
//   //   return user
// }

async function login(userCred) {
  try {
    let user = await firebaseService.logUser(userCred)
    if (user) {
      const updatedUser = await getWatchlistByUser(user)
      return saveLocalUser(updatedUser)
    }
  } catch (err) {
    throw err
  }
}

async function signup(userCred) {
  try {
    // const user = await storageService.post('user', userCred)
    const user = await firebaseService.createUser(userCred)
    if (user) {
      const updatedUser = await getWatchlistByUser(user)
      return saveLocalUser(updatedUser)
    }
  } catch (err) {
    console.log(err)
  }
}

async function logout() {
  sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN_USER)
}

async function resetPassword(email) {
  try {
    const res = await firebaseService.resetPassword(email)
    console.log(res)
  } catch (err) {
    console.log(err)
  }
}

function saveLocalUser(user) {
  sessionStorage.setItem(STORAGE_KEY_LOGGEDIN_USER, JSON.stringify(user))
  return user
}

function getLoggedinUser() {
  return JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN_USER))
}

function updatedLocalUser(watchlist){
  const currUser = getLoggedinUser()
  const updatedUser = {...currUser, watchlist }
  saveLocalUser(updatedUser)
  return updatedUser.watchlist
}

async function addToWatchlist(userId, show) {
  try {
    const updatedWatchlist = await firebaseService.addToWatchlist(userId, show)
    updatedLocalUser(updatedWatchlist)
    return updatedWatchlist
  } catch (err) {
    console.log(err)
  }
}

async function removeFromWatchlist(userId, showId) {
  try {
    const updatedWatchlist = await firebaseService.removeFromWatchlist(userId, showId)
    updatedLocalUser(updatedWatchlist)
    return updatedWatchlist
  } catch (err) {
    console.log(err)
  }
}

async function getWatchlistByUser(user){
  try{
    const docSnap = await firebaseService.getWatchlistByUserId(user.uid)
    if (docSnap.exists()) {
      const { watchlist } = docSnap.data()
      user = { ...user, watchlist }
    } else {
      user = { ...user, watchlist: [] }
    }
    return user
  }catch(err){
    console.log(err)
  }
}
