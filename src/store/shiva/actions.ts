import { Action } from "redux";
import { ThunkAction } from "redux-thunk";
import { 
    fetchShivaListRequest,
    fetchShivaListSuccess,
    deleteShivaRequest,
    deleteShivaSuccess,
} from './types'
import { shivas } from '../../mock-data'
import { AppState } from "../";


export const fetchShivas = () : ThunkAction<void, AppState, null, Action<string>> => async dispatch => {
    dispatch(fetchShivaListRequest())
    setTimeout(() => {
        dispatch(fetchShivaListSuccess(shivas))
    }, 1000)
}

export const deleteShiva = (shivaId: string) : ThunkAction<void, AppState, null, Action<string>> => async dispatch => {
    dispatch(deleteShivaRequest())
    setTimeout(() => {
        dispatch(deleteShivaSuccess(shivaId))
    }, 1000)
}