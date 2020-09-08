import { Reducer } from 'redux'
import {ShivaActions, ActionTypes, ShivaState, Shiva } from './types'
import { arrayToObject } from '../helpers'

export const initialState: ShivaState = {
    loading: false,
    entities: {},
    shivas: [],
    visitorKeys: {},
    mournerKeys: {}
}

const reducer: Reducer<ShivaState> = (state=initialState, action: ActionTypes): ShivaState => {
  switch(action.type){
    case ShivaActions.FETCH_SHIVAS_REQUEST: {
      return { ...state, loading: true}
    }
    case ShivaActions.FETCH_SHIVAS_SUCCESS: {
      const newEntities = arrayToObject<Shiva>(action.payload)
      const newVisitorKeys = Object.assign({}, ...action.payload.map(shiva => ({[shiva.visitorKey]: shiva._id})))
      const newMournerKeys = Object.assign({}, ...action.payload.map(shiva => ({[shiva.mournerKey]: shiva._id})))
      return {
        ...state,
        entities: {
          ...state.entities,
          ...newEntities
        },
        shivas: Array.from(new Set([...state.shivas, ...action.payload.map(shiva => shiva._id)])),
        visitorKeys : {
          ...state.visitorKeys,
          ...newVisitorKeys
        },
        mournerKeys : {
          ...state.mournerKeys,
          ...newMournerKeys
        },
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