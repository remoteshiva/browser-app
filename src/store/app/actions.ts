import { ActionType, createAction } from 'typesafe-actions'
import * as AppActionTypes from './constants'
import { Notification } from './types'

export const setInitialized = createAction(AppActionTypes.SetInitialized)()
export type SetInitialized = ActionType<typeof setInitialized>

export const addNotification = createAction(AppActionTypes.AddNotification)<Notification>()
export type AddNotification = ActionType<typeof addNotification>

export const removeNotification = createAction(AppActionTypes.RemoteNotification)<string>()
export type RemoveNotification = ActionType<typeof removeNotification>

export type ActionTypes = SetInitialized | AddNotification | RemoveNotification
