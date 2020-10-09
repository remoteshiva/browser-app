import { applyMiddleware, combineReducers, createStore } from 'redux'
import { createBrowserHistory } from 'history'
import thunk from 'redux-thunk'
import { routerMiddleware, connectRouter } from 'connected-react-router'
import { composeWithDevTools } from 'redux-devtools-extension'
import { AppReducer } from './app/reducer'
import { AuthReducer } from './auth/reducer'
import { ShivaReducer } from './shiva/reducer'

export const history = createBrowserHistory()

const rootReducer = combineReducers({
  router: connectRouter(history),
  app: AppReducer,
  auth: AuthReducer,
  shiva: ShivaReducer,
})

export type RootState = ReturnType<typeof rootReducer>

export default function configureStore() {
  return createStore(rootReducer, composeWithDevTools(applyMiddleware(routerMiddleware(history), thunk)))
}
