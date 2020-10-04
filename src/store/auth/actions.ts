import { Action } from 'redux'
import { ThunkAction } from 'redux-thunk'
import { push } from 'connected-react-router'
import { loginRequest, loginSuccess, logout } from './types'
import { resetShiva } from '../shiva/types'
import { test_session } from '../../mock-data'
import { AppState } from '../'

export const loginUser = (username: string, password: string): ThunkAction<void, AppState, null, Action<string>> => async dispatch => {
  dispatch(loginRequest())
  setTimeout(() => {
    dispatch(loginSuccess(test_session))
    dispatch(push('/'))
  }, 1000)
}

export const logoutUser = (): ThunkAction<void, AppState, null, Action<string>> => async dispatch => {
  dispatch(logout())
  dispatch(resetShiva())
}
