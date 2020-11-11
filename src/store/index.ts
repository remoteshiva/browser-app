import { applyMiddleware, combineReducers, createStore, AnyAction } from 'redux'
import { createBrowserHistory } from 'history'
import thunk, { ThunkDispatch } from 'redux-thunk'
import { routerMiddleware, connectRouter } from 'connected-react-router'
import { composeWithDevTools } from 'redux-devtools-extension'
import { AppReducer } from './app/reducer'
import { AuthReducer } from './auth/reducer'
import { ShivaReducer } from './shiva/reducers'

export const history = createBrowserHistory({
  getUserConfirmation(message, callback) {
    callback(window.confirm(`${message}`))
  },
})

const rootReducer = combineReducers({
  router: connectRouter(history),
  app: AppReducer,
  auth: AuthReducer,
  shiva: ShivaReducer,
})

export type RootState = ReturnType<typeof rootReducer>
export type AppDispatch = ThunkDispatch<RootState, any, AnyAction>

export default function configureStore() {
  return createStore(rootReducer, composeWithDevTools(applyMiddleware(routerMiddleware(history), thunk)))
}
