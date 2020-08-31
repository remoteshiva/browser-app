// import { cuid } from 'cuid' 

export interface User {
    // id: cuid
    readonly firstName: string
    readonly lastName: string
}

export interface AuthState {
    readonly loading: boolean
    readonly user: User | null
    readonly error?: string 
}

export enum AuthActionTypes {
    LOGIN_REQUEST = '$@auth/LOGIN_REQUEST',
    LOGIN_SUCCESS = '$@auth/LOGIN_SUCCESS',
    LOGIN_ERROR = '$@auth/LOGIN_ERROR',

    LOGOUT = '$@auth/LOGOUT'
}