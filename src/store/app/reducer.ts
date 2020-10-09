import { Reducer } from 'redux'
import * as AppActions from './constants'
import { AppState } from './types'
import { ActionTypes } from './actions'
import { Notification } from '../../components/Toast/styles'

const initialState: AppState = {
  initialized: false,
  notifications: [],
}

const reducer: Reducer<AppState> = (state = initialState, action: ActionTypes): AppState => {
  switch (action.type) {
    case AppActions.SetInitialized:
      return { ...state, initialized: true }
    case AppActions.AddNotification:
      return {
        ...state,
        notifications: [...state.notifications, action.payload],
      }
    case AppActions.RemoteNotification:
      const filtered = state.notifications.filter(n => n.id !== action.payload)
      return {
        ...state,
        notifications: [...filtered],
      }
    default:
      return state
  }
}

export { reducer as AppReducer }
