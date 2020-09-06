import { Reducer } from 'redux'
import {ShivaActions, ActionTypes, ShivaState } from './types'

export const initialState: ShivaState = {
    loading: false,
    shivas: [],
}

const reducer: Reducer<ShivaState> = (state=initialState, action: ActionTypes): ShivaState => {
    switch(action.type){
        case ShivaActions.FETCH_SHIVAS_REQUEST: {
            return { ...state, loading: true}
        }
        case ShivaActions.FETCH_SHIVAS_SUCCESS: {
            console.log('shiva reducer', action.payload)
            return { ...state, loading: false, shivas: action.payload }
        }
        case ShivaActions.FETCH_SHIVAS_ERROR: {
            return { ...state, loading: false, error: action.payload }
        }
        default: {
            return state
        }
    }
}

export { reducer as ShivaReducer }