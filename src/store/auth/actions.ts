import { ActionType, createAction } from 'typesafe-actions'
import { BackendError } from '../types'
import { AuthActions, Session } from './types'

export const setInitialized = createAction(AuthActions.SetInitialized)()
export type SetInitialized = ActionType<typeof setInitialized>

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

export type ActionTypes = SetInitialized | LoginRequest | LoginSuccess | LoginError | Logout | SignupRequest | SignupSuccess | SignupError | LogoutRequest
