import { applyMiddleware, createStore, compose } from 'redux'
import thunk from 'redux-thunk'

// import { logger } from './store/middleware/logger'
import { rootReducer } from './store/root.reducer'

export default function configureStore(preloadedState) {
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
  const store = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(thunk))
  )

  return store
}
