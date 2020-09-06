import { Action } from "redux";
import { ThunkAction } from "redux-thunk";
import { ShivaActions } from './types'
import { typedAction } from '../helpers'
import { shivas } from '../../mock-data'
import { AppState } from "../";


export const fetchShivas = (
) : ThunkAction<void, AppState, null, Action<string>> => async dispatch => {
    dispatch(typedAction(ShivaActions.FETCH_SHIVAS_REQUEST))
    setTimeout(() => {
        dispatch(typedAction(ShivaActions.FETCH_SHIVAS_SUCCESS, shivas))
    }, 1000)
}