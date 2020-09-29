import { Reducer } from 'redux'
import * as ShivaActions from './constants'
import { ActionTypes, ShivaState, Shiva } from './types'
import { arrayToObject } from '../helpers'

export const initialState: ShivaState = {
    loading: true,
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
    case ShivaActions.CreateShivaRequest: {
      return state
    }
    case ShivaActions.CreateShivaSuccess: {
      return {
        ...state,
        entities : {
          ...state.entities,
          ...{[action.payload._id]: action.payload}
        },
        shivas: Array.from(new Set([...state.shivas, action.payload._id])),
        visitorKeys : {
          ...state.visitorKeys,
          ...{[action.payload.visitorKey]:action.payload._id}
        },
        mournerKeys : {
          ...state.mournerKeys,
          ...{[action.payload.mournerKey]:action.payload._id}
        },
        loading: false
      }
    }
    case ShivaActions.CreateShivaError: {
      // TODO: handle this
      return state
    }
    case ShivaActions.DeleteShivaRequest: {
      return state
    }
    case ShivaActions.DeleteShivaSuccess: {
      const {[action.payload]:omit, ...entities } = state.entities;
      return {
        ...state,
        entities,
        shivas: [...state.shivas.filter(shivaId => shivaId !== action.payload)],
        mournerKeys: {...Object.fromEntries(Object.entries(state.mournerKeys).filter(([k,v]) => v!==action.payload))},
        visitorKeys: {...Object.fromEntries(Object.entries(state.visitorKeys).filter(([k,v]) => v!==action.payload))}
      }
    }
    case ShivaActions.DeleteShivaError: {
      return state
    }
    case ShivaActions.FetchShivaRequest: {
      return {...state, loading: true}
    }
    case ShivaActions.FetchShivaSuccess: {
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