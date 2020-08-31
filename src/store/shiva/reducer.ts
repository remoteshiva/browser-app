import { Reducer } from 'redux'
import { ShivaActionTypes, ShivaState } from './types'

export const initialState: ShivaState = {
    loading: false,
    shivas: []
}

const reducer: Reducer<ShivaState> = (state=initialState, action) => {
    switch(action.type){
        case ShivaActionTypes.FETCH_SHIVAS_REQUEST: {
            return { ...state, loading: true}
        }
        case ShivaActionTypes.FETCH_SHIVAS_SUCCESS: {
            return { ...state, loading: false, shivas: action.payload }
        }
        case ShivaActionTypes.FETCH_SHIVAS_ERROR: {
            return { ...state, loading: false, error: action.payload }
        }
        default: {
            return state
        }
    }
}

export { reducer as ShivaReducer }