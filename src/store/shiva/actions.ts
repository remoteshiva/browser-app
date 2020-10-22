import { ActionType, createAction, createAsyncAction } from 'typesafe-actions'
import { BackendError } from '../types'
import { Shiva, Visit, ShivaId } from './types'
import * as AT from './constants'

//
export const fetchShivaList = createAsyncAction(AT.FetchShivaListRequest, AT.FetchShivaListSuccess, AT.FetchShivaListError)<undefined, Shiva[], BackendError>()
export type FetchShivaList = ActionType<typeof fetchShivaList>

//
export const fetchShiva = createAsyncAction(AT.FetchShivaRequest, AT.FetchShivaSuccess, AT.FetchShivaError)<undefined, Shiva, BackendError>()
export type FetchShiva = ActionType<typeof fetchShiva>

//
export const createShiva = createAsyncAction(AT.CreateShivaRequest, AT.CreateShivaSuccess, AT.CreateShivaError)<undefined, Shiva, BackendError>()
export type CreateShiva = ActionType<typeof createShiva>

//
export const deleteShiva = createAsyncAction(AT.DeleteShivaRequest, AT.DeleteShivaSuccess, AT.DeleteShivaError)<undefined, ShivaId, BackendError>()
export type DeleteShiva = ActionType<typeof deleteShiva>

//
export const updateShiva = createAsyncAction(AT.UpdateShivaRequest, AT.UpdateShivaSuccess, AT.UpdateShivaError)<undefined, { shivaId: ShivaId; shiva: Partial<Shiva> }, BackendError>()
export type UpdateShiva = ActionType<typeof updateShiva>

//
export const initNewShiva = createAction(AT.InitNewShiva)()
export type InitNewShiva = ActionType<typeof initNewShiva>

export const updateNewShiva = createAction(AT.UpdateNewShiva)<Partial<Shiva>>()
export type UpdateNewShiva = ActionType<typeof updateNewShiva>

export const deleteNewShiva = createAction(AT.DeleteNewShiva)()
export type DeleteNewShiva = ActionType<typeof deleteNewShiva>

//
export const addShivaVisit = createAction(AT.AddVisit)<{ shivaId: string; visit: Visit }>()
export type AddShivaVisit = ActionType<typeof addShivaVisit>

export const updateShivaVisit = createAction(AT.UpdateVisit)<{ shivaId: string; visitId: string; updatedVisit: Partial<Visit> }>()
export type UpdateShivaVisit = ActionType<typeof updateShivaVisit>

export const deleteShivaVisit = createAction(AT.DeleteVisit)<{ shivaId: string; visitId: string }>()
export type DeleteShivaVisit = ActionType<typeof deleteShivaVisit>

//
export const selectShiva = createAction(AT.SelectShiva)<string | null>()
export type SelectShiva = ActionType<typeof selectShiva>

export const resetShiva = createAction(AT.ResetShiva)()
export type ResetShiva = ActionType<typeof resetShiva>

export type ActionTypes =
  | FetchShivaList
  | FetchShiva
  | CreateShiva
  | DeleteShiva
  | UpdateShiva
  | InitNewShiva
  | UpdateNewShiva
  | DeleteNewShiva
  | AddShivaVisit
  | UpdateShivaVisit
  | DeleteShivaVisit
  | SelectShiva
  | ResetShiva
