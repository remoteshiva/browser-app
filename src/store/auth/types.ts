import { ActionType, createAction } from 'typesafe-actions'

export interface User {
  readonly firstName: string
  readonly lastName: string
}

export interface Session {
  token: string
  user: User
}

export interface AuthState {
  readonly loading: boolean
  readonly session: Session | null
  readonly error: string | null
}

export enum AuthActions {
  LoginRequest = '{RS}auth/LOGIN_REQUEST',
  LoginSuccess = '{RS}auth/LOGIN_SUCCESS',
  LoginError = '{RS}auth/LOGIN_ERROR',

  Logout = '{RS}auth/LOGOUT',
}

export const loginRequest = createAction(AuthActions.LoginRequest)()
export type LoginRequest = ActionType<typeof loginRequest>

export const loginSuccess = createAction(AuthActions.LoginSuccess)<Session>()
export type LoginSuccess = ActionType<typeof loginSuccess>

export const loginError = createAction(AuthActions.LoginError)<string>()
export type LoginError = ActionType<typeof loginError>

export const logout = createAction(AuthActions.Logout)()
export type Logout = ActionType<typeof logout>

export type ActionTypes = LoginRequest | LoginSuccess | LoginError | Logout
