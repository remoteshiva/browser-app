import { Action } from 'redux'
import { ThunkAction } from 'redux-thunk'
import { AppState } from './'

// this is the interface for representing errors from the backend (firebase)
export interface BackendError {
  code?: number | string
  message: string
}

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppState, unknown, Action<string>>
