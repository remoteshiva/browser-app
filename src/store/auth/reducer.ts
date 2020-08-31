import { Reducer } from 'redux'
import {AuthActionTypes, AuthState} from './types'

export const initialState: AuthState = {
    loading: false,
    user: null
}

const reducer: Reducer<AuthState> = (state=initialState, action) => {
    switch(action.type){
        case AuthActionTypes.LOGIN_REQUEST: {
            return { ...state, loading: true}
        }
        case AuthActionTypes.LOGIN_SUCCESS: {
            return { ...state, loading: false, user: action.payload }
        }
        case AuthActionTypes.LOGIN_ERROR: {
            return { ...state, loading: false, error: action.payload }
        }
        case AuthActionTypes.LOGOUT: {
            return state
        }
        default: {
            return state
        }
    }
}

export { reducer as AuthReducer }