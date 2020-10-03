import moment from 'moment'
import { ActionType, createAction } from 'typesafe-actions'
import * as ShivaActionTypes from './constants'
import { BackendError } from '../types'

const generateRandomKey = (): string => {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
}

export type ROLE = 'Editor' | 'Mourner' | 'Visitor'
export interface Mourner {
  name: string
  relationship: string
}

export interface Visit {
  date: moment.Moment
  length: number
  mourners: number[]
  visitors: string[]
}
export interface Shiva {
  _id: string
  nameOfDeceased: string
  startDate: moment.Moment
  endDate?: moment.Moment
  message?: string
  videoLink: URL | null
  mourners: Mourner[]
  mournerKey: string
  visitorKey: string
  titleImage: URL | null
  visits: Visit[]
  about?: string
  images: URL[]
  mealSignups?: string
  minianTimes?: string
  donations?: string
  inviteMessage?: string
}

/**
 * @description Initializes a new Shiva object with default params.
 * @param shiva - Optional partial shiva model for overriding defaults
 * @example - const shiva = initializeShiva({nameOfDeceased: 'John Doe'})
 */
export const initializeShiva = (shiva?: Partial<Shiva>): Shiva => ({
  _id: '',
  nameOfDeceased: '',
  startDate: moment().startOf('day'),
  mourners: [],
  videoLink: null,
  mournerKey: generateRandomKey(),
  visitorKey: generateRandomKey(),
  visits: [],
  titleImage: null,
  about: '',
  images: [],
  mealSignups: '',
  minianTimes: '',
  donations: '',
  inviteMessage: '',
  ...shiva,
})

export interface ShivaState {
  loading: boolean
  entities: { [key: string]: Shiva } // all shiva objects, arranged by id
  shivas: string[] // list of shiva ids
  visitorKeys: { [key: string]: string } // map visitor keys to shiva ids
  mournerKeys: { [key: string]: string } // map mourner keys to shiva ids
  selectedShiva: string | null // id of selected shiva
  error?: BackendError
}

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
export const selectShiva = createAction(ShivaActionTypes.SelectShiva)<string | null>()
export type SelectShiva = ActionType<typeof selectShiva>

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
  | SelectShiva
