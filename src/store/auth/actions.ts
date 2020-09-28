import { Action } from "redux"
import { ThunkAction } from "redux-thunk"
import { push } from 'connected-react-router'
import { AuthActions } from './types'
import { typedAction } from '../helpers'
import { test_session } from '../../mock-data'
import { AppState } from '../'

export const loginUser = (
    username: string, password: string
) : ThunkAction<void, AppState, null, Action<string>> => async dispatch => {
    dispatch(typedAction(AuthActions.LOGIN_REQUEST))
    setTimeout(() => {
        dispatch(typedAction(AuthActions.LOGIN_SUCCESS, test_session))
        dispatch(push('/'))
    }, 1000)
}

export const logoutUser = (
  ) : ThunkAction<void, AppState, null, Action<string>> => async dispatch => {
    dispatch(typedAction(AuthActions.LOGOUT))
}
