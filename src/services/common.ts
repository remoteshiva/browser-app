import { Action } from 'redux'
import { ThunkAction } from 'redux-thunk'
import { AppState } from '../store'

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppState, unknown, Action<string>>
