import { Reducer } from 'redux'
import * as ShivaActions from './constants'
import { ActionTypes, ShivaState, Shiva, selectShiva } from './types'
import { arrayToObject } from '../helpers'
import { action } from 'typesafe-actions'

export const initialState: ShivaState = {
    loading: false,
    entities: {},
    shivas: [],
    visitorKeys: {},
    mournerKeys: {},
    selectedShiva: null
}

const reducer: Reducer<ShivaState> = (state=initialState, action: ActionTypes): ShivaState => {
  switch(action.type){
    case ShivaActions.FetchShivaListRequest: {
      return { ...state, loading: true}
    }
    case ShivaActions.FetchShivaListSuccess: {
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
    case ShivaActions.FetchShivaListError: {
      return { ...state, loading: false, error: action.payload }
    }
    case ShivaActions.DeleteShivaRequest: {
      return state
    }
    case ShivaActions.DeleteShivaSuccess: {
      return state
    }
    case ShivaActions.DeleteShivaError: {
      return state
    }
    case ShivaActions.FetchShivaByIdRequest: {
      return {...state, loading: true}
    }
    case ShivaActions.FetchShivaByIdSuccess: {
      const shiva = action.payload
      return {
        ...state,
        loading: false,
        entities: {
          ...state.entities, ...{[shiva._id]: shiva }
        }
      }
    }
    case ShivaActions.SelectShiva: {
      return {
        ...state,
        selectedShiva: action.payload
      }
    }
    default: {
      return state
    }
  }
}

export { reducer as ShivaReducer }