import { Action } from 'redux'
import { ThunkAction } from 'redux-thunk'
import { push } from 'connected-react-router'
import { 
  Shiva,
  fetchShivaListRequest,
  fetchShivaListSuccess,
  fetchShivaByIdRequest,
  fetchShivaByIdSuccess,
  fetchShivaByIdError,
  createShivaRequest,
  createShivaSuccess,
  deleteShivaRequest,
  deleteShivaSuccess,
  selectShiva
} from './types'
import { shivas } from '../../mock-data'
import { AppState } from "../";


export const fetchShivas = () : ThunkAction<void, AppState, null, Action<string>> => async dispatch => {
    dispatch(fetchShivaListRequest())
    setTimeout(() => {
        dispatch(fetchShivaListSuccess(shivas))
    }, 1000)
}

export const fetchShivaById = (shivaId: string) : ThunkAction<void, AppState, null, Action<string>> => async dispatch => {
  dispatch(fetchShivaByIdRequest())
  setTimeout(()=>{
    const shiva = shivas.find(shiva => shiva._id === shivaId)
    if (shiva){
      dispatch(fetchShivaByIdSuccess(shiva))
      dispatch(selectShiva(shiva._id))
    } else {
        dispatch(fetchShivaByIdError({code: 404, error: 'cannot find it'}))
        dispatch(push('/404'))
    }
  },1000)
} 

export const createShiva = (shiva: Shiva) : ThunkAction<void, AppState, null, Action<string>> => async dispatch => { 
  dispatch(createShivaRequest())
  setTimeout(() => {
    // we're generating a random id until after the firebase integration
    const newShiva = {...shiva, _id: Math.random().toString(36).substring(3)} 
    dispatch(createShivaSuccess(newShiva))
  }, 1000)
}

export const deleteShiva = (shivaId: string) : ThunkAction<void, AppState, null, Action<string>> => async dispatch => {
  dispatch(deleteShivaRequest())
  setTimeout(() => {
    dispatch(deleteShivaSuccess(shivaId))
  }, 1000)
}