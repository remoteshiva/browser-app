import { Reducer } from 'redux'
import {ShivaActions, ActionTypes, ShivaState, Shiva } from './types'
import { arrayToObject } from '../helpers'

export const initialState: ShivaState = {
    loading: false,
    entities: {},
    shivas: [],
}

const reducer: Reducer<ShivaState> = (state=initialState, action: ActionTypes): ShivaState => {
  switch(action.type){
    case ShivaActions.FETCH_SHIVAS_REQUEST: {
      return { ...state, loading: true}
    }
    case ShivaActions.FETCH_SHIVAS_SUCCESS: {
      const newEntities = arrayToObject<Shiva>(action.payload)
      return {
        ...state,
        entities: {
          ...state.entities,
          ...newEntities
        },
        shivas: Array.from(new Set([...state.shivas, ...action.payload.map(shiva => shiva._id)])),
        loading: false
      }
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