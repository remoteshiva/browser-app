import { Mourner, Shiva, ShivaActionTypes, ShivaState} from './types'
import { User } from '../auth/types'
import { ActionCreator, Action, Dispatch } from "redux";
import { ThunkAction } from "redux-thunk";
import { ApplicationState } from "../index";

import { shivas } from '../../mock-data'

export type AppThunk = ActionCreator<
  ThunkAction<void, ApplicationState, null, Action<string>>
>

export const fetchUserShivas: AppThunk = () => {
    return (dispatch: Dispatch): Action => {
        try{
            return dispatch({
                type: ShivaActionTypes.FETCH_SHIVAS_SUCCESS,
                payload: shivas
            })

        }catch (err) {
            return dispatch({
                type: ShivaActionTypes.FETCH_SHIVAS_ERROR
            })
        }
    }
}

