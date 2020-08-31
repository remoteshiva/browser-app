import { User } from '../auth/types'
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

export enum ShivaActionTypes {
    ADD_SHIVA = "@shiva/ADD_SHIVA",
    REMOVE_SHIVA = "@shiva/REMOVE_SHIVA",
    FETCH_SHIVAS_REQUEST = "@shiva/FETCH_SHIVAS_REQUEST",
    FETCH_SHIVAS_SUCCESS = "@cart/FETCH_SHIVAS_SUCCESS",
    FETCH_SHIVAS_ERROR = "@cart/FETCH_SHIVAS_ERROR"
}

