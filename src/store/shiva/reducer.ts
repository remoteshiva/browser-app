import { Reducer } from 'redux'
import * as ShivaActions from './constants'
import { ShivaState, Shiva } from './types'
import { ActionTypes } from './actions'
import { arrayToObject } from '../helpers'
import { initializeShiva } from './helpers'

export const initialState: ShivaState = {
  loading: false,
  entities: {},
  shivas: [],
  visitorKeys: {},
  mournerKeys: {},
  selectedShiva: null,
  newShiva: null,
}

const reducer: Reducer<ShivaState> = (state = initialState, action: ActionTypes): ShivaState => {
  switch (action.type) {
    case ShivaActions.InitNewShiva: {
      return { ...state, newShiva: initializeShiva() }
    }
    case ShivaActions.FetchShivaListRequest: {
      return { ...state, loading: true }
    }
    case ShivaActions.FetchShivaListSuccess: {
      const newEntities = arrayToObject<Shiva>(action.payload)
      const newVisitorKeys = Object.assign({}, ...action.payload.map(shiva => ({ [shiva.visitorKey]: shiva.id })))
      const newMournerKeys = Object.assign({}, ...action.payload.map(shiva => ({ [shiva.mournerKey]: shiva.id })))
      return {
        ...state,
        entities: {
          ...state.entities,
          ...newEntities,
        },
        shivas: Array.from(new Set([...state.shivas, ...action.payload.map(shiva => shiva.id)])),
        visitorKeys: {
          ...state.visitorKeys,
          ...newVisitorKeys,
        },
        mournerKeys: {
          ...state.mournerKeys,
          ...newMournerKeys,
        },
        loading: false,
      }
    }
    case ShivaActions.FetchShivaError:
    case ShivaActions.FetchShivaListError: {
      return { ...state, loading: false, error: action.payload }
    }
    case ShivaActions.CreateShivaRequest: {
      return state
    }
    case ShivaActions.CreateShivaSuccess: {
      return {
        ...state,
        entities: {
          ...state.entities,
          ...{ [action.payload.id]: action.payload },
        },
        shivas: Array.from(new Set([...state.shivas, action.payload.id])),
        visitorKeys: {
          ...state.visitorKeys,
          ...{ [action.payload.visitorKey]: action.payload.id },
        },
        mournerKeys: {
          ...state.mournerKeys,
          ...{ [action.payload.mournerKey]: action.payload.id },
        },
        loading: false,
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
      const { [action.payload]: omit, ...entities } = state.entities
      return {
        ...state,
        entities: { ...entities },
        shivas: [...state.shivas.filter(shivaId => shivaId !== action.payload)],
        mournerKeys: { ...Object.fromEntries(Object.entries(state.mournerKeys).filter(([k, v]) => v !== action.payload)) },
        visitorKeys: { ...Object.fromEntries(Object.entries(state.visitorKeys).filter(([k, v]) => v !== action.payload)) },
      }
    }
    case ShivaActions.DeleteShivaError: {
      return state
    }
    case ShivaActions.FetchShivaRequest: {
      return { ...state, loading: true }
    }
    case ShivaActions.FetchShivaSuccess: {
      const shiva = action.payload
      return {
        ...state,
        loading: false,
        entities: {
          ...state.entities,
          ...{ [shiva.id]: shiva },
        },
      }
    }
    case ShivaActions.UpdateShivaRequest: {
      return state
    }
    case ShivaActions.UpdateShivaSuccess: {
      const { shivaId, shiva } = action.payload
      if (shivaId in state.entities) {
        // shiva exists, we can update
        const entity = state.entities[shivaId]
        const updatedEntity = { ...entity, ...shiva }
        return {
          ...state,
          entities: {
            ...state.entities,
            ...{ [shivaId]: updatedEntity },
          },
        }
      } else {
        // TODO: raise the alarm
        return state
      }
    }
    case ShivaActions.UpdateShivaError: {
      return state
    }
    case ShivaActions.AddVisit: {
      const shiva = { ...state.entities[action.payload.shivaId] }
      shiva.visits = { ...shiva.visits, [action.payload.visit.id]: action.payload.visit }
      return { ...state, entities: { ...state.entities, [action.payload.shivaId]: shiva } }
    }
    case ShivaActions.DeleteVisit: {
      const { shivaId, visitId } = action.payload
      const shiva = state.entities[shivaId]
      const { [visitId]: omit, ...visits } = shiva.visits
      const newShiva = { ...shiva, visits: { ...visits } }
      const entities = { ...state.entities, [shivaId]: newShiva }
      return { ...state, entities }
    }
    case ShivaActions.UpdateVisit: {
      const { shivaId, visitId, updatedVisit } = action.payload
      const shiva = state.entities[shivaId]
      const visit = shiva.visits[visitId]
      if (visit) {
        const newVisit = { ...visit, ...updatedVisit }
        return {
          ...state,
          entities: {
            ...state.entities,
            [shivaId]: { ...shiva, visits: { ...shiva.visits, [visitId]: newVisit } },
          },
        }
      }
      return state
    }
    case ShivaActions.SelectShiva: {
      return {
        ...state,
        selectedShiva: action.payload,
      }
    }
    case ShivaActions.ResetShiva: {
      return initialState
    }
    default: {
      return state
    }
  }
}

export { reducer as ShivaReducer }
