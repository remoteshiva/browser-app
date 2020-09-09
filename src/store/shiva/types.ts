import { Moment } from 'moment'
import { ActionType, createAction } from 'typesafe-actions'
import * as ShivaActionTypes from './constants'
export interface Mourner {
    name: string
    relationship: string
}
export interface Shiva {
    _id: string
    nameOfDeceased: string
    startDate: Moment
    endDate: Moment
    message?: string
    videoLink?: string
    mourners: Mourner[]
    mournerKey: string
    visitorKey: string   
}
export interface ShivaState {
    loading: boolean
    entities: {[key: string]: Shiva}        // all shiva objects, arranged by id
    shivas: string[]                        // list of shiva ids
    visitorKeys: {[key:string]: string}     // map visitor keys to shiva ids
    mournerKeys: {[key:string]: string}     // map mourner keys to shiva ids
    selectedShiva: string | null            // id of selected shiva
    error?: string 
}

//
export const fetchShivaListRequest = createAction(ShivaActionTypes.FetchShivaListRequest)()
export type FetchShivaListRequest = ActionType<typeof fetchShivaListRequest>

export const fetchShivaListSuccess = createAction(ShivaActionTypes.FetchShivaListSuccess)<Shiva[]>()
export type FetchShivaListSuccess = ActionType<typeof fetchShivaListSuccess>

export const fetchShivaListError = createAction(ShivaActionTypes.FetchShivaListError)<string>()
export type FetchShivaListError = ActionType<typeof fetchShivaListError>

//
export const fetchShivaByIdRequest = createAction(ShivaActionTypes.FetchShivaByIdRequest)()
export type FetchShivaByIdRequest = ActionType<typeof fetchShivaByIdRequest>

export const fetchShivaByIdSuccess = createAction(ShivaActionTypes.FetchShivaByIdSuccess)<Shiva>()
export type FetchShivaByIdSuccess = ActionType<typeof fetchShivaByIdSuccess>

export const fetchShivaByIdError = createAction(ShivaActionTypes.FetchShivaByIdError)<string>()
export type FetchShivaByIdError = ActionType<typeof fetchShivaByIdError>


//
export const createShivaRequest = createAction(ShivaActionTypes.CreateShivaRequest)()
export type CreateShivaRequest = ActionType<typeof createShivaRequest>

export const createShivaSuccess = createAction(ShivaActionTypes.CreateShivaSuccess)<Shiva>()
export type CreateShivaSuccess = ActionType<typeof createShivaSuccess>

export const createShivaError = createAction(ShivaActionTypes.CreateShivaError)<string>()
export type CreateShivaError = ActionType<typeof createShivaError>

//
export const deleteShivaRequest = createAction(ShivaActionTypes.DeleteShivaRequest)()
export type DeleteShivaRequest = ActionType<typeof deleteShivaRequest>

export const deleteShivaSuccess = createAction(ShivaActionTypes.DeleteShivaSuccess)<string>()
export type DeleteShivaSuccess = ActionType<typeof deleteShivaSuccess>

export const deleteShivaError = createAction(ShivaActionTypes.DeleteShivaError)<string>()
export type DeleteShivaError = ActionType<typeof deleteShivaError>

export type ActionTypes = 
    FetchShivaListRequest  | 
    FetchShivaListSuccess  | 
    FetchShivaListError    |
    FetchShivaByIdRequest  | 
    FetchShivaByIdSuccess  | 
    FetchShivaByIdError    |
    CreateShivaRequest  |
    CreateShivaSuccess  |
    CreateShivaError    |
    DeleteShivaRequest  |
    DeleteShivaSuccess  |
    DeleteShivaError    



