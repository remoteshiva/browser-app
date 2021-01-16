import { Reducer } from 'redux'
import * as ShivaActions from '../constants'
import { ShivaState, Shiva } from '../types'
import { ActionTypes } from '../actions'
import { arrayToMap } from '../../helpers'
import { newShivaReducer } from './newShiva'
import { visitReducer } from './visit'

export const initialState: ShivaState = {
  loading: false,
  entities: {},
  shivas: [],
  visitorKeys: {},
  mournerKeys: {},
  selectedShiva: null,
  selectedVisit: null,
  newShiva: null,
  error: null,
}

const reducer: Reducer<ShivaState> = (state = initialState, action: ActionTypes): ShivaState => {
  switch (action.type) {
    case ShivaActions.InitNewShiva:
    case ShivaActions.UpdateNewShiva:
    case ShivaActions.DeleteNewShiva:
      return { ...state, newShiva: newShivaReducer(state.newShiva, action) }
    case ShivaActions.FetchShivaListRequest: {
      return { ...state, loading: true }
    }
    case ShivaActions.FetchShivaListSuccess: {
      const newEntities = arrayToMap<Shiva>(action.payload)
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
      return { ...state, loading: false, error: action.payload }
    }
    case ShivaActions.AddVisit:
    case ShivaActions.UpdateVisit:
    case ShivaActions.DeleteVisit: {
      // get shiva
      let shiva: Shiva
      if (state.newShiva) {
        shiva = { ...state.newShiva, visits: visitReducer(state.newShiva.visits, action) }
        return { ...state, newShiva: shiva }
      } else if (state.selectedShiva) {
        const s = state.entities[state.selectedShiva]
        shiva = { ...s, visits: visitReducer(s.visits, action) }
        return { ...state, entities: { ...state.entities, [shiva.id]: shiva } }
      } else return state
    }
    case ShivaActions.SelectVisit: {
      return {
        ...state,
        selectedVisit: action.payload,
      }
    }
    case ShivaActions.SelectShiva: {
      return {
        ...state,
        selectedShiva: action.payload,
        selectedVisit: state.selectedShiva === action.payload ? state.selectedVisit : null, // reset the selected visit everytime the selected shiva is set
      }
    }
    case ShivaActions.ResetShiva: {
      return initialState
    }
    case ShivaActions.ClearError: {
      return { ...state, error: null }
    }
    default: {
      return state
    }
  }
}
// TODO: visitReducer and newShivaReducer are exported for testing only. Should be done with rewire rather than export
export { reducer as ShivaReducer, visitReducer, newShivaReducer }
