import { auth } from 'firebase'
import { firestore } from '../firebase.config'
import { AppThunk, omit } from './common'
import { Shiva } from '../store/shiva/types'
import { initializeShiva } from '../store/shiva/helpers'
import {
  fetchShivaListRequest,
  fetchShivaListSuccess,
  fetchShivaListError,
  fetchShivaRequest,
  fetchShivaSuccess,
  fetchShivaError,
  createShivaRequest,
  createShivaSuccess,
  createShivaError,
  deleteShivaRequest,
  deleteShivaSuccess,
  deleteShivaError,
  updateShivaRequest,
  updateShivaSuccess,
  updateShivaError,
} from '../store/shiva/actions'
import { BackendError } from '../store/types'

export const fetchMyShivas = (): AppThunk<Promise<Shiva[]>> => async (dispatch): Promise<Shiva[]> => {
  return new Promise<Shiva[]>(async resolve => {
    dispatch(fetchShivaListRequest())
    try {
      // we filter shivas by uid since we cannot apply restriction rules on the Shiva collection and still access
      // as visitors or mourners.
      const snapshot = await firestore.collection('shivas').where('uid', '==', auth().currentUser?.uid).get()
      // retrieve data from query snapshot and match to shiva interface
      const shivas = snapshot.docs.map(item => {
        const data = item.data()
        return { ...data, id: item.id, startDate: data.startDate.toDate(), endDate: data.endDate.toDate() }
      }) as Shiva[]
      dispatch(fetchShivaListSuccess(shivas))
      resolve(shivas)
    } catch (error) {
      const backendError: BackendError = { message: error }
      dispatch(fetchShivaListError(backendError))
      resolve(undefined)
    }
  })
}

export const fetchShivaById = (shivaId: string): AppThunk<Promise<Shiva>> => async (dispatch): Promise<Shiva> => {
  return new Promise<Shiva>(async resolve => {
    dispatch(fetchShivaRequest())
    try {
      const item = await firestore.collection('shivas').doc(shivaId).get()
      if (item.exists) {
        const data = item.data()
        if (!data) throw new Error('Shiva Not Found')
        else {
          const shiva = initializeShiva({ ...data, id: item.id, startDate: data.startDate.toDate(), endDate: data.endDate.toDate() })
          dispatch(fetchShivaSuccess(shiva))
          resolve(shiva)
        }
      } else {
        throw new Error('Shiva Not Found')
      }
    } catch (error) {
      dispatch(fetchShivaError({ message: error }))
      resolve(undefined)
    }
  })
}
export type ShivaKey = 'mourner' | 'visitor'

export const fetchShivaByKey = (key: string, keyType: ShivaKey): AppThunk<Promise<Shiva>> => async (dispatch): Promise<Shiva> => {
  return new Promise<Shiva>(async resolve => {
    dispatch(fetchShivaRequest())
    try {
      const query = await firestore.collection('shivas').where(`${keyType}Key`, '==', key).get()
      if (!query.empty) {
        const item = query.docs[0]
        const data = item.data()
        const shiva = initializeShiva({ ...data, id: item.id, startDate: data.startDate.toDate(), endDate: data.endDate.toDate() })
        dispatch(fetchShivaSuccess(shiva))
        resolve(shiva)
      } else {
        dispatch(fetchShivaError({ code: 404, message: 'Not found' }))
        resolve(undefined)
      }
    } catch (error) {
      dispatch(fetchShivaError({ code: 404, message: error }))
      resolve(undefined)
    }
  })
}

export const createShiva = (shiva: Shiva): AppThunk<Promise<Shiva>> => async (dispatch): Promise<Shiva> => {
  return new Promise<Shiva>(async resolve => {
    dispatch(createShivaRequest())
    try {
      const { id } = await firestore.collection('shivas').add({ ...omit(shiva, 'id'), uid: auth().currentUser?.uid })
      const newShiva = { ...shiva, id }
      dispatch(createShivaSuccess(newShiva))
      resolve(newShiva)
    } catch (error) {
      dispatch(createShivaError({ message: error }))
      resolve(undefined)
    }
  })
}

export const deleteShiva = (shivaId: string): AppThunk<Promise<string>> => async (dispatch): Promise<string> => {
  return new Promise<string>(async resolve => {
    dispatch(deleteShivaRequest())
    try {
      await firestore.collection('shivas').doc(shivaId).delete()
      dispatch(deleteShivaSuccess(shivaId))
      resolve(shivaId)
    } catch (error) {
      dispatch(deleteShivaError({ message: error }))
      resolve(undefined)
    }
  })
}

export const updateShiva = (shivaId: string, shiva: Partial<Shiva>): AppThunk<Promise<Partial<Shiva>>> => async (dispatch): Promise<Partial<Shiva>> => {
  return new Promise<Partial<Shiva>>(async resolve => {
    dispatch(updateShivaRequest())
    try {
      await firestore.collection('shivas').doc(shivaId).update(shiva)
    } catch (error) {
      console.log('Failed to update shiva', error)
      dispatch(updateShivaError({ message: error }))
      resolve(undefined)
    }
    dispatch(updateShivaSuccess({ shivaId, shiva }))
    resolve(shiva)
  })
}
