import { ActionType, createAction } from 'typesafe-actions'
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
  loading: boolean
  session: Session | null
  error: BackendError | null
}

export enum AuthActions {
  SignupRequest = '{RS}auth/SIGNUP_REQUEST',
  SignupSuccess = '{RS}auth/SIGNUP_SUCCESS',
  SignupError = '{RS}auth/SIGNUP_ERROR',

  LoginRequest = '{RS}auth/LOGIN_REQUEST',
  LoginSuccess = '{RS}auth/LOGIN_SUCCESS',
  LoginError = '{RS}auth/LOGIN_ERROR',

  LogoutRequest = '{RS}auth/LOGOUT_REQUEST',
  Logout = '{RS}auth/LOGOUT',
}

export const signupRequest = createAction(AuthActions.SignupRequest)()
export type SignupRequest = ActionType<typeof signupRequest>

export const signupSuccess = createAction(AuthActions.SignupSuccess)()
export type SignupSuccess = ActionType<typeof signupSuccess>

export const signupError = createAction(AuthActions.SignupError)<BackendError>()
export type SignupError = ActionType<typeof signupError>

export const loginRequest = createAction(AuthActions.LoginRequest)()
export type LoginRequest = ActionType<typeof loginRequest>

export const loginSuccess = createAction(AuthActions.LoginSuccess)<Session>()
export type LoginSuccess = ActionType<typeof loginSuccess>

export const loginError = createAction(AuthActions.LoginError)<BackendError>()
export type LoginError = ActionType<typeof loginError>

export const logoutRequest = createAction(AuthActions.LogoutRequest)()
export type LogoutRequest = ActionType<typeof logoutRequest>

export const logout = createAction(AuthActions.Logout)()
export type Logout = ActionType<typeof logout>

export type ActionTypes = LoginRequest | LoginSuccess | LoginError | Logout | SignupRequest | SignupSuccess | SignupError | LogoutRequest
