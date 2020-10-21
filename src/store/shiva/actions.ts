import { ActionType, createAction } from 'typesafe-actions'
import { BackendError } from '../types'
import { Shiva, Visit } from './types'
import * as ShivaActionTypes from './constants'

//
export const fetchShivaListRequest = createAction(ShivaActionTypes.FetchShivaListRequest)()
export type FetchShivaListRequest = ActionType<typeof fetchShivaListRequest>

export const fetchShivaListSuccess = createAction(ShivaActionTypes.FetchShivaListSuccess)<Shiva[]>()
export type FetchShivaListSuccess = ActionType<typeof fetchShivaListSuccess>

export const fetchShivaListError = createAction(ShivaActionTypes.FetchShivaListError)<BackendError>()
export type FetchShivaListError = ActionType<typeof fetchShivaListError>

//
export const fetchShivaRequest = createAction(ShivaActionTypes.FetchShivaRequest)()
export type FetchShivaRequest = ActionType<typeof fetchShivaRequest>

export const fetchShivaSuccess = createAction(ShivaActionTypes.FetchShivaSuccess)<Shiva>()
export type FetchShivaSuccess = ActionType<typeof fetchShivaSuccess>

export const fetchShivaError = createAction(ShivaActionTypes.FetchShivaError)<BackendError>()
export type FetchShivaError = ActionType<typeof fetchShivaError>

//
export const createShivaRequest = createAction(ShivaActionTypes.CreateShivaRequest)()
export type CreateShivaRequest = ActionType<typeof createShivaRequest>

export const createShivaSuccess = createAction(ShivaActionTypes.CreateShivaSuccess)<Shiva>()
export type CreateShivaSuccess = ActionType<typeof createShivaSuccess>

export const createShivaError = createAction(ShivaActionTypes.CreateShivaError)<BackendError>()
export type CreateShivaError = ActionType<typeof createShivaError>

//
export const deleteShivaRequest = createAction(ShivaActionTypes.DeleteShivaRequest)()
export type DeleteShivaRequest = ActionType<typeof deleteShivaRequest>

export const deleteShivaSuccess = createAction(ShivaActionTypes.DeleteShivaSuccess)<string>()
export type DeleteShivaSuccess = ActionType<typeof deleteShivaSuccess>

export const deleteShivaError = createAction(ShivaActionTypes.DeleteShivaError)<BackendError>()
export type DeleteShivaError = ActionType<typeof deleteShivaError>

//
export const updateShivaRequest = createAction(ShivaActionTypes.UpdateShivaRequest)()
export type UpdateShivaRequest = ActionType<typeof updateShivaRequest>

export const updateShivaSuccess = createAction(ShivaActionTypes.UpdateShivaSuccess)<{ shivaId: string; shiva: Partial<Shiva> }>()
export type UpdateShivaSuccess = ActionType<typeof updateShivaSuccess>

export const updateShivaError = createAction(ShivaActionTypes.UpdateShivaError)<BackendError>()
export type UpdateShivaError = ActionType<typeof updateShivaError>

//
export const initNewShiva = createAction(ShivaActionTypes.InitNewShiva)()
export type InitNewShiva = ActionType<typeof initNewShiva>

//
export const addShivaVisit = createAction(ShivaActionTypes.AddVisit)<{ shivaId: string; visit: Visit }>()
export type AddShivaVisit = ActionType<typeof addShivaVisit>

export const updateShivaVisit = createAction(ShivaActionTypes.UpdateVisit)<{ shivaId: string; visitId: string; updatedVisit: Partial<Visit> }>()
export type UpdateShivaVisit = ActionType<typeof updateShivaVisit>

export const deleteShivaVisit = createAction(ShivaActionTypes.DeleteVisit)<{ shivaId: string; visitId: string }>()
export type DeleteShivaVisit = ActionType<typeof deleteShivaVisit>

//
export const selectShiva = createAction(ShivaActionTypes.SelectShiva)<string | null>()
export type SelectShiva = ActionType<typeof selectShiva>

export const resetShiva = createAction(ShivaActionTypes.ResetShiva)()
export type ResetShiva = ActionType<typeof resetShiva>

export type ActionTypes =
  | FetchShivaListRequest
  | FetchShivaListSuccess
  | FetchShivaListError
  | FetchShivaRequest
  | FetchShivaSuccess
  | FetchShivaError
  | CreateShivaRequest
  | CreateShivaSuccess
  | CreateShivaError
  | DeleteShivaRequest
  | DeleteShivaSuccess
  | DeleteShivaError
  | UpdateShivaRequest
  | UpdateShivaSuccess
  | UpdateShivaError
  | InitNewShiva
  | AddShivaVisit
  | UpdateShivaVisit
  | DeleteShivaVisit
  | SelectShiva
  | ResetShiva
