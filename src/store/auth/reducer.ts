import { Reducer } from 'redux'
import {AuthActions, ActionTypes, AuthState } from './types'

export const initialState: AuthState = {
    loading: false,
    session: null
}

const reducer: Reducer<AuthState> = (state=initialState, action: ActionTypes): AuthState => {
    switch(action.type){
        case AuthActions.LOGIN_REQUEST: {
            return { ...state, loading: true}
        }
        case AuthActions.LOGIN_SUCCESS: {
            return { ...state, loading: false, session: action.payload }
        }
        case AuthActions.LOGIN_ERROR: {
            return { ...state, loading: false, error: action.payload }
        }
        case AuthActions.LOGOUT: {
            return state
        }
        default: {
            return state
        }
    }
}

export { reducer as AuthReducer }