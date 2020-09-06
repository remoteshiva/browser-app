import { Moment } from 'moment'

export interface Mourner {
    name: string
    relationship: string
}

export interface Shiva {
    id: string
    nameOfDeceased: string
    startDate: Moment
    endDate: Moment
    message?: string
    videoLink?: string
    mourners: Mourner[]    
}


export interface ShivaState {
    readonly loading: boolean
    readonly shivas: Shiva[]
    readonly error?: string 
}

export enum ShivaActions {
    FETCH_SHIVAS_REQUEST = "shiva/FETCH_SHIVAS_REQUEST",
    FETCH_SHIVAS_SUCCESS = "shiva/FETCH_SHIVAS_SUCCESS",
    FETCH_SHIVAS_ERROR = "shiva/FETCH_SHIVAS_ERROR",

    CREATE_SHIVA_REQUEST = "shiva/CREATE_SHIVA_REQUEST",
    CREATE_SHIVA_SUCCESS = "shiva/CREATE_SHIVA_SUCCESS",
    CREATE_SHIVA_ERRROR = "shiva/CREATE_SHIVA_ERROR",
}

interface FetchShivasRequest {
    type: typeof ShivaActions.FETCH_SHIVAS_REQUEST
}

interface FetchShivasSuccess {
    type: typeof ShivaActions.FETCH_SHIVAS_SUCCESS
    payload: Shiva[]
}

interface FetchShivasError {
    type: typeof ShivaActions.FETCH_SHIVAS_ERROR
    payload : string

}

export type ActionTypes = FetchShivasRequest | FetchShivasSuccess | FetchShivasError 



