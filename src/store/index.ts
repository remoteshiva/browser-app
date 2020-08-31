import { applyMiddleware, combineReducers, createStore, Store } from 'redux'
import { History, createBrowserHistory } from "history";
import thunk from 'redux-thunk';
import { AuthReducer } from './auth/reducer'
import { AuthState } from './auth/types'
import { checkAuthentication } from './auth/actions'
import { ShivaReducer } from './shiva/reducer'
import { ShivaState } from './shiva/types'

export interface ApplicationState {
    auth: AuthState
    shiva: ShivaState
}

const history = createBrowserHistory();

const rootReducer = (history: History) => combineReducers<ApplicationState>({
    auth: AuthReducer,
    shiva: ShivaReducer
})

const store:Store = createStore(rootReducer(history), applyMiddleware(thunk) )
// initialize global data

export default store

