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
  LOGIN_REQUEST = 'auth/LOGIN_REQUEST',
  LOGIN_SUCCESS = 'auth/LOGIN_SUCCESS',
  LOGIN_ERROR = 'auth/LOGIN_ERROR',

  LOGOUT = 'auth/LOGOUT',
}

interface LoginRequest {
  type: typeof AuthActions.LOGIN_REQUEST
}

interface LoginSuccess {
  type: typeof AuthActions.LOGIN_SUCCESS
  payload: Session
}

interface LoginError {
  type: typeof AuthActions.LOGIN_ERROR
  payload: string
}

interface Logout {
  type: typeof AuthActions.LOGOUT
}

export type ActionTypes = LoginRequest | LoginSuccess | LoginError | Logout
