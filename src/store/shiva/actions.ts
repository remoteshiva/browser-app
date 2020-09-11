import { Action } from 'redux'
import { ThunkAction } from 'redux-thunk'
import { push } from 'connected-react-router'
import { 
    fetchShivaListRequest,
    fetchShivaListSuccess,
    fetchShivaByIdRequest,
    fetchShivaByIdSuccess,
    fetchShivaByIdError,
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
            console.log('i got the shiva', shiva)
            dispatch(fetchShivaByIdSuccess(shiva))
            dispatch(selectShiva(shiva._id))

        } else {
            dispatch(fetchShivaByIdError({code: 404, error: 'cannot find it'}))
            dispatch(push('/404'))
        }
    },1000)
} 

export const deleteShiva = (shivaId: string) : ThunkAction<void, AppState, null, Action<string>> => async dispatch => {
    dispatch(deleteShivaRequest())
    setTimeout(() => {
        dispatch(deleteShivaSuccess(shivaId))
    }, 1000)
}