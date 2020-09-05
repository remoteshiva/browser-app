import { applyMiddleware, combineReducers, createStore } from 'redux'
import thunk from 'redux-thunk';
import { composeWithDevTools } from "redux-devtools-extension";
import { AuthReducer } from './auth/reducer'
import { ShivaReducer } from './shiva/reducer'

const rootReducer = combineReducers({
    auth: AuthReducer,
    shiva: ShivaReducer
})

export type AppState = ReturnType<typeof rootReducer>

export default function configureStore() {
    const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)) )
    // initialize global data

    return store
}

