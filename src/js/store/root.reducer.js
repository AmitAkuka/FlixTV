import { combineReducers } from "redux"
import { showReducer } from "./show/show.reducer.js"
import { userReducer } from "./user/user.reducer.js"

export const rootReducer = combineReducers({
  showModule: showReducer,
  userModule: userReducer,
})
