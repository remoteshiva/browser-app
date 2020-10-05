import { Action } from 'redux'
import { ThunkAction } from 'redux-thunk'
import { push } from 'connected-react-router'
import { AppThunk } from '../types'
import {
  Shiva,
  fetchShivaListRequest,
  fetchShivaListSuccess,
  fetchShivaRequest,
  fetchShivaSuccess,
  fetchShivaError,
  createShivaRequest,
  createShivaSuccess,
  deleteShivaRequest,
  deleteShivaSuccess,
  updateShivaRequest,
  updateShivaSuccess,
  selectShiva,
} from './types'
import { shivas } from '../../mock-data'
import { AppState } from '../'

const sleep = (ms: number) => new Promise(r => setTimeout(r, ms))

export const fetchShivas = (): ThunkAction<void, AppState, null, Action<string>> => async dispatch => {
  dispatch(fetchShivaListRequest())
  await sleep(1000)
  return dispatch(fetchShivaListSuccess(shivas))
}

export const fetchShivaById = (shivaId: string): ThunkAction<void, AppState, null, Action<string>> => async dispatch => {
  dispatch(fetchShivaRequest())
  await sleep(1000)
  const shiva = shivas.find(shiva => shiva._id === shivaId)
  if (shiva) {
    dispatch(selectShiva(shiva._id))
    dispatch(fetchShivaSuccess(shiva))
  } else {
    dispatch(fetchShivaError({ code: 404, message: 'cannot find it' }))
    dispatch(push('/404'))
  }
}

export const fetchShivaByMournerKey = (mournerKey: string): AppThunk => async dispatch => {
  dispatch(fetchShivaRequest())
  await sleep(1000)
  const shiva = shivas.find(shiva => shiva.mournerKey === mournerKey)
  if (shiva) {
    dispatch(fetchShivaSuccess(shiva))
    dispatch(selectShiva(shiva._id))
  } else {
    dispatch(fetchShivaError({ code: 404, message: 'cannot find it' }))
    dispatch(push('/404'))
  }
}

export const fetchShivaByVisitorKey = (visitorKey: string): AppThunk => async dispatch => {
  dispatch(fetchShivaRequest())
  await sleep(1000)
  const shiva = shivas.find(shiva => shiva.visitorKey === visitorKey)
  if (shiva) {
    dispatch(fetchShivaSuccess(shiva))
    dispatch(selectShiva(shiva._id))
  } else {
    dispatch(fetchShivaError({ code: 404, message: 'cannot find it' }))
    dispatch(push('/404'))
  }
}

export const createShiva = (shiva: Shiva): AppThunk => async dispatch => {
  dispatch(createShivaRequest())
  await sleep(1000)
  const newShiva = { ...shiva, _id: Math.random().toString(36).substring(3) }
  dispatch(createShivaSuccess(newShiva))
}

export const deleteShiva = (shivaId: string): AppThunk => async dispatch => {
  dispatch(deleteShivaRequest())
  await sleep(1000)
  dispatch(deleteShivaSuccess(shivaId))
}

export const updateShiva = (shivaId: string, shiva: Partial<Shiva>): AppThunk => async dispatch => {
  dispatch(updateShivaRequest())
  await sleep(1000)
  dispatch(updateShivaSuccess({ shivaId, shiva }))
}
