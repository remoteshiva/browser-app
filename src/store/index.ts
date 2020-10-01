import { applyMiddleware, combineReducers, createStore } from 'redux'
import { createBrowserHistory } from 'history'
import thunk from 'redux-thunk'
import { routerMiddleware, connectRouter } from 'connected-react-router'
import { composeWithDevTools } from 'redux-devtools-extension'
import { AuthReducer } from './auth/reducer'
import { ShivaReducer } from './shiva/reducer'

export const history = createBrowserHistory()

const rootReducer = combineReducers({
  router: connectRouter(history),
  auth: AuthReducer,
  shiva: ShivaReducer,
})

export type AppState = ReturnType<typeof rootReducer>

export default function configureStore() {
  const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(routerMiddleware(history), thunk)))
  // initialize global data

  /****************************** */
  /*  This should only be used to skip authentication during development */
  // store.dispatch(loginUser('ronb', 'password'))
  return store
}
