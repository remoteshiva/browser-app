import { BackendError } from '../types'

export interface User {
  photoURL: URL | null
  displayName: string
}

export interface Session {
  token: string
  user: User
}

export interface AuthState {
  initialized: boolean
  loading: boolean
  session: Session | null
  error: BackendError | null
}

export enum AuthActions {
  SetInitialized = '{RS}auth/SET_INITIALIZED',
  SignupRequest = '{RS}auth/SIGNUP_REQUEST',
  SignupSuccess = '{RS}auth/SIGNUP_SUCCESS',
  SignupError = '{RS}auth/SIGNUP_ERROR',

  LoginRequest = '{RS}auth/LOGIN_REQUEST',
  LoginSuccess = '{RS}auth/LOGIN_SUCCESS',
  LoginError = '{RS}auth/LOGIN_ERROR',

  LogoutRequest = '{RS}auth/LOGOUT_REQUEST',
  Logout = '{RS}auth/LOGOUT',
}
