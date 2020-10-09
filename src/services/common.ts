import { Action } from 'redux'
import { ThunkAction } from 'redux-thunk'
import { RootState } from '../store'

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>
