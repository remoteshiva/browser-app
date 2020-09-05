import { Action } from "redux";
import { ThunkAction } from "redux-thunk";
import { AuthActions } from './types'
import { typedAction } from '../helpers'
import { test_user } from '../../mock-data'
import { AppState } from "../";

export const loginUser = (
    username: string, password: string
) : ThunkAction<void, AppState, null, Action<string>> => async dispatch => {
    dispatch(typedAction(AuthActions.LOGIN_REQUEST))
    setTimeout(() => {
        dispatch(typedAction(AuthActions.LOGIN_SUCCESS, test_user))
    }, 1000)
}

export const logoutUser = (
  ) : ThunkAction<void, AppState, null, Action<string>> => async dispatch => {
    dispatch(typedAction(AuthActions.LOGOUT))
}
