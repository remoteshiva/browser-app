import { useSelector } from 'react-redux'
import { auth } from 'firebase'
import { RootState } from '../store'
import { firestore } from '../firebase.config'
import { AppThunk, omit } from './common'
import { Shiva, ShivaId, Visit } from '../store/shiva/types'
import { initializeShiva, initializeVisit } from '../store/shiva/helpers'
import { arrayToObject } from '../store/helpers'
import { fetchShivaList, fetchShiva, createShiva, deleteShiva, updateShiva } from '../store/shiva/actions'
import { BackendError } from '../store/types'
import { resolve } from 'dns'

export const fetchMyShivas = (): AppThunk<Promise<Shiva[]>> => async (dispatch): Promise<Shiva[]> => {
  return new Promise<Shiva[]>(async resolve => {
    dispatch(fetchShivaList.request())
    try {
      // we filter shivas by uid since we cannot apply restriction rules on the Shiva collection and still access
      // as visitors or mourners.
      const snapshot = await firestore.collection('shivas').where('uid', '==', auth().currentUser?.uid).get()
      // retrieve data from query snapshot and match to shiva interface
      const shivas = snapshot.docs.map(item => {
        const data = item.data()
        const visitList = Object.values(data.visits).map((visit: any) => ({ ...visit, startTime: visit.startTime.toDate(), endTime: visit.endTime.toDate() }))
        return initializeShiva({
          ...data,
          id: item.id,
          startDate: data.startDate.toDate(),
          endDate: data.endDate.toDate(),
          visits: arrayToObject<Visit>(visitList),
        })
      })
      dispatch(fetchShivaList.success(shivas))
      resolve(shivas)
    } catch (error) {
      debugger
      const backendError: BackendError = { message: error }
      dispatch(fetchShivaList.failure(backendError))
      resolve(undefined)
    }
  })
}

export const fetchShivaById = (shivaId: string): AppThunk<Promise<Shiva>> => async (dispatch): Promise<Shiva> => {
  return new Promise<Shiva>(async resolve => {
    dispatch(fetchShiva.request())
    try {
      const item = await firestore.collection('shivas').doc(shivaId).get()
      if (item.exists) {
        const data = item.data()
        if (!data) throw new Error('Shiva Not Found')
        else {
          const shiva = initializeShiva({
            ...data,
            id: item.id,
            startDate: data.startDate.toDate(),
            endDate: data.endDate.toDate(),
            visits: data.visits.map((visit: any) => ({ ...visit, startTime: visit.startTime.toDate(), endTime: visit.endTime.toDate() })),
          })
          dispatch(fetchShiva.success(shiva))
          resolve(shiva)
        }
      } else {
        throw new Error('Shiva Not Found')
      }
    } catch (error) {
      dispatch(fetchShiva.failure({ message: error }))
      resolve(undefined)
    }
  })
}
export type ShivaKey = 'mourner' | 'visitor'

export const fetchShivaByKey = (key: string, keyType: ShivaKey): AppThunk<Promise<Shiva>> => async (dispatch): Promise<Shiva> => {
  return new Promise<Shiva>(async resolve => {
    dispatch(fetchShiva.request())
    try {
      const query = await firestore.collection('shivas').where(`${keyType}Key`, '==', key).get()
      if (!query.empty) {
        const item = query.docs[0]
        const data = item.data()
        const shiva = initializeShiva({ ...data, id: item.id, startDate: data.startDate.toDate(), endDate: data.endDate.toDate() })
        dispatch(fetchShiva.success(shiva))
        resolve(shiva)
      } else {
        dispatch(fetchShiva.failure({ code: 404, message: 'Not found' }))
        resolve(undefined)
      }
    } catch (error) {
      dispatch(fetchShiva.failure({ code: 404, message: error }))
      resolve(undefined)
    }
  })
}

export const postShiva = (shiva: Shiva): AppThunk<Promise<Shiva>> => async (dispatch): Promise<Shiva> => {
  return new Promise<Shiva>(async resolve => {
    dispatch(createShiva.request())
    try {
      const { id } = await firestore.collection('shivas').add({ ...omit(shiva, 'id'), uid: auth().currentUser?.uid })
      const newShiva = { ...shiva, id }
      dispatch(createShiva.success(newShiva))
      resolve(newShiva)
    } catch (error) {
      dispatch(createShiva.failure({ message: error }))
      resolve(undefined)
    }
  })
}

export const deleteExistingShiva = (shivaId: string): AppThunk<Promise<string>> => async (dispatch): Promise<string> => {
  return new Promise<string>(async resolve => {
    dispatch(deleteShiva.request())
    try {
      await firestore.collection('shivas').doc(shivaId).delete()
      dispatch(deleteShiva.success(shivaId))
      resolve(shivaId)
    } catch (error) {
      dispatch(deleteShiva.failure({ message: error }))
      resolve(undefined)
    }
  })
}

export const patchShiva = (shivaId: ShivaId, shiva: Partial<Shiva>): AppThunk<Promise<Partial<Shiva>>> => async (dispatch): Promise<Partial<Shiva>> => {
  return new Promise<Partial<Shiva>>(async resolve => {
    dispatch(updateShiva.request())
    try {
      await firestore.collection('shivas').doc(shivaId).update(shiva)
    } catch (error) {
      dispatch(updateShiva.failure({ message: error }))
      resolve(undefined)
    }
    dispatch(updateShiva.success({ shivaId, shiva }))
    resolve(shiva)
  })
}

export const patchSelectedShiva = (shiva: Partial<Shiva>): AppThunk<Promise<Partial<Shiva>>> => async (dispatch, getState): Promise<Partial<Shiva>> => {
  const state = getState()
  const { selectedShiva } = state.shiva
  if (selectedShiva) {
    return dispatch(patchShiva(selectedShiva, shiva))
  } else {
    return new Promise<Partial<Shiva>>(async resolve => {
      dispatch(updateShiva.failure({ message: 'Operation failed, Selected Shiva is null' }))
      resolve(undefined)
    })
  }
}

export const updateSelectedShiva = (): AppThunk<Promise<Partial<Shiva>>> => async (dispatch, getState): Promise<Partial<Shiva>> => {
  const state = getState()
  const { selectedShiva, entities } = state.shiva
  if (selectedShiva) {
    return dispatch(patchShiva(selectedShiva, entities[selectedShiva]))
  } else {
    return new Promise<Partial<Shiva>>(async resolve => {
      dispatch(updateShiva.failure({ message: 'Operation failed, Selected Shiva is null' }))
      resolve(undefined)
    })
  }
}
