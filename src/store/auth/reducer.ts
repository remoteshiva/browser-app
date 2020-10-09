import { Reducer } from 'redux'
import { AuthActions, AuthState } from './types'
import { ActionTypes } from './actions'

export const initialState: AuthState = {
  loading: false,
  session: null,
  error: null,
}

const reducer: Reducer<AuthState> = (state = initialState, action: ActionTypes): AuthState => {
  switch (action.type) {
    case AuthActions.SignupRequest:
    case AuthActions.LoginRequest:
    case AuthActions.LogoutRequest: {
      return { ...state, loading: true }
    }
    case AuthActions.SignupSuccess:
      return { ...state, loading: false, error: null }
    case AuthActions.LoginSuccess: {
      return { ...state, loading: false, error: null, session: action.payload }
    }
    case AuthActions.SignupError:
    case AuthActions.LoginError: {
      return { ...state, loading: false, error: action.payload }
    }
    case AuthActions.Logout: {
      return { ...state, session: null, loading: false, error: null }
    }
    default: {
      return state
    }
  }
}

export { reducer as AuthReducer }
