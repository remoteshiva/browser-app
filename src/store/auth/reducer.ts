import { Reducer } from 'redux'
import { AuthActions, ActionTypes, AuthState } from './types'

export const initialState: AuthState = {
  loading: false,
  session: null,
  error: null,
}

const reducer: Reducer<AuthState> = (state = initialState, action: ActionTypes): AuthState => {
  switch (action.type) {
    case AuthActions.LoginRequest: {
      return { ...state, loading: true }
    }
    case AuthActions.LoginSuccess: {
      return { ...state, loading: false, error: null, session: action.payload }
    }
    case AuthActions.LoginError: {
      return { ...state, loading: false, error: action.payload }
    }
    case AuthActions.Logout: {
      return { ...state, session: null, error: null }
    }
    default: {
      return state
    }
  }
}

export { reducer as AuthReducer }
