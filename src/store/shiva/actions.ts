import { ActionType, createAction, createAsyncAction } from 'typesafe-actions'
import { BackendError } from '../types'
import { Shiva, Visit, ShivaId, VisitId, Visitor } from './types'
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
export const addVisit = createAction(AT.AddVisit)<Visit>()
export type AddVisit = ActionType<typeof addVisit>

export const updateVisit = createAction(AT.UpdateVisit)<{ visitId: VisitId; partialVisit: Partial<Visit> }>()
export type UpdateVisit = ActionType<typeof updateVisit>

export const deleteVisit = createAction(AT.DeleteVisit)<VisitId>()
export type DeleteVisit = ActionType<typeof deleteVisit>

export const addVisitor = createAction(AT.AddVisitor)<{ visitId: VisitId; visitor: Visitor }>()
export type AddVisitor = ActionType<typeof addVisitor>
//
export const selectShiva = createAction(AT.SelectShiva)<ShivaId | null>()
export type SelectShiva = ActionType<typeof selectShiva>

export const selectVisit = createAction(AT.SelectVisit)<VisitId | null>()
export type SelectVisit = ActionType<typeof selectVisit>

export const resetShiva = createAction(AT.ResetShiva)()
export type ResetShiva = ActionType<typeof resetShiva>

export const clearError = createAction(AT.ClearError)()
export type ClearError = ActionType<typeof clearError>

export type ActionTypes =
  | FetchShivaList
  | FetchShiva
  | CreateShiva
  | DeleteShiva
  | UpdateShiva
  | InitNewShiva
  | UpdateNewShiva
  | DeleteNewShiva
  | AddVisit
  | UpdateVisit
  | DeleteVisit
  | AddVisitor
  | SelectShiva
  | SelectVisit
  | ResetShiva
  | ClearError
