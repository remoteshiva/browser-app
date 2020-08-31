import { ThunkAction, ThunkDispatch } from "redux-thunk"
import { Dispatch } from 'redux'
import { createAction, ActionType } from 'typesafe-actions'
import { AuthActionTypes, User } from './types'
import { test_user } from '../../mock-data'

export const loginRequest = createAction(AuthActionTypes.LOGIN_REQUEST)()
export type LoginRequest = ActionType<typeof loginRequest>

export const loginSuccess = createAction(AuthActionTypes.LOGIN_SUCCESS)<User>()
export type LoginSuccess = ActionType<typeof loginSuccess>

export const loginError = createAction(AuthActionTypes.LOGIN_ERROR)<string>()
export type LoginError = ActionType<typeof loginError>

export const logOut = createAction(AuthActionTypes.LOGOUT)()
export type LogOut = ActionType<typeof logOut>

export type Action =
  | LoginRequest
  | LoginSuccess
  | LoginError
  | LogOut    

export const loginUser = (username: string, password: string): ThunkAction<Promise<void>, {}, {}, Action> => {
    return async (dispatch: ThunkDispatch<{}, {}, Action>): Promise<void> => {
      return new Promise<void>((resolve) => {
        dispatch(loginRequest())
        // Fake async process
        setTimeout(() => {
          dispatch(loginSuccess(test_user))
          resolve()
        }, 1000)
      })
    }
}



export const checkAuthentication = () => {

}




