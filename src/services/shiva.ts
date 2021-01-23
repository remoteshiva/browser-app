import firebase, { auth } from 'firebase'
import { firestore } from '../firebase.config'
import { AppThunk, omit } from './common'
import { Shiva, ShivaId, Visit, VisitId, Visitor } from '../store/shiva/types'
import { initializeShiva } from '../store/shiva/helpers'
import { arrayToMap } from '../store/helpers'
import { fetchShivaList, fetchShiva, createShiva, deleteShiva, updateShiva } from '../store/shiva/actions'
import { BackendError } from '../store/types'

/**
 * @description serializes a partial Shiva object for firebase persistence
 * @param shiva Partial Shiva object
 */
const dehydrateShiva = (shiva: Partial<Shiva>) => {
  return {
    ...shiva,
    ...(shiva.videoLink && { videoLink: shiva.videoLink.toString() }),
    ...(shiva.titleImage && { titleImage: shiva.titleImage.toString() }),
    ...(shiva.images && { images: shiva.images.map(url => url.toString()) }),
  }
}

/**
 * @description deserializes a single shiva object from firestore to match the Shiva interface. Converts timestamps to Javascript `Date` objects
 * @param item a firestore shiva document
 * @returns a fully initialized Shiva model
 */
const hydrateShiva = (item: any) => {
  const visitList = Object.values(item.data().visits).map((visit: any) => ({
    ...visit,
    visitors: visit.visitors.map((visitor: { name: any; email: any; time: Date }) => ({ name: visitor.name, email: visitor.email, time: visitor.time})),
    startTime: visit.startTime.toDate(),
    endTime: visit.endTime.toDate(),
  }))
  return initializeShiva({
    ...item.data(),
    id: item.id,
    startDate: item.data().startDate.toDate(),
    endDate: item.data().endDate.toDate(),
    visits: arrayToMap<Visit>(visitList),
    ...(item.data().videoLink && { videoLink: new URL(item.data().videoLink) }),
  })
}

export const fetchMyShivas = (): AppThunk<Promise<Shiva[]>> => async (dispatch): Promise<Shiva[]> => {
  return new Promise<Shiva[]>(async (resolve, reject) => {
    dispatch(fetchShivaList.request())
    try {
      // we filter shivas by uid since we cannot apply restriction rules on the Shiva collection and still access
      // as visitors or mourners.
      const snapshot = await firestore.collection('shivas').where('uid', '==', auth().currentUser?.uid).get()
      // retrieve data from query snapshot and match to shiva interface
      const shivas = snapshot.docs.map(item => {
        return hydrateShiva(item)
      })
      dispatch(fetchShivaList.success(shivas))
      resolve(shivas)
    } catch (error) {
      const backendError: BackendError = { message: error }
      dispatch(fetchShivaList.failure(backendError))
      reject(error)
    }
  })
}

export const fetchShivaById = (shivaId: string): AppThunk<Promise<Shiva>> => async (dispatch): Promise<Shiva> => {
  return new Promise<Shiva>(async (resolve, reject) => {
    dispatch(fetchShiva.request())
    try {
      const item = await firestore.collection('shivas').doc(shivaId).get()
      if (item.exists) {
        const shiva = hydrateShiva(item)
        dispatch(fetchShiva.success(shiva))
        resolve(shiva)
      } else {
        const err: BackendError = { code: 404, message: 'Shiva Not Found' }
        throw err
      }
    } catch (error) {
      dispatch(fetchShiva.failure(error))
      reject(error)
    }
  })
}
export type ShivaKey = 'mourner' | 'visitor'

export const fetchShivaByKey = (key: string, keyType: ShivaKey): AppThunk<Promise<Shiva>> => async (dispatch): Promise<Shiva> => {
  return new Promise<Shiva>(async (resolve, reject) => {
    dispatch(fetchShiva.request())
    try {
      const query = await firestore.collection('shivas').where(`${keyType}Key`, '==', key).get()
      if (!query.empty) {
        const shiva = hydrateShiva(query.docs[0])
        dispatch(fetchShiva.success(shiva))
        resolve(shiva)
      } else {
        dispatch(fetchShiva.failure({ code: 404, message: 'Not found' }))
        reject({ code: 404, message: 'Not found' })
      }
    } catch (error) {
      dispatch(fetchShiva.failure({ code: 404, message: error }))
      reject(error)
    }
  })
}

/**
 * @description Posts a Shiva object to firebase, for storage
 * @param shiva Fully initialized Shiva model
 * @returns Promise
 */
export const postShiva = (shiva: Shiva): AppThunk<Promise<Shiva>> => async (dispatch): Promise<Shiva> => {
  return new Promise<Shiva>(async (resolve, reject) => {
    dispatch(createShiva.request())
    try {
      const { id } = await firestore.collection('shivas').add({ ...omit(dehydrateShiva(shiva), 'id'), uid: auth().currentUser?.uid })
      const newShiva = { ...shiva, id }
      dispatch(createShiva.success(newShiva))
      resolve(newShiva)
    } catch (error) {
      dispatch(createShiva.failure({ message: error }))
      reject(error)
    }
  })
}

export const deleteExistingShiva = (shivaId: string): AppThunk<Promise<string>> => async (dispatch): Promise<string> => {
  return new Promise<string>(async (resolve, reject) => {
    dispatch(deleteShiva.request())
    try {
      await firestore.collection('shivas').doc(shivaId).delete()
      dispatch(deleteShiva.success(shivaId))
      resolve(shivaId)
    } catch (error) {
      dispatch(deleteShiva.failure({ message: error }))
      reject(error)
    }
  })
}

/**
 *
 * @param shivaId Id of the existing `Shiva` to patch
 * @param shiva  A partial shiva object containing `Shiva` fields that need to be updated
 */
export const patchShiva = (shivaId: ShivaId, shiva: Partial<Shiva>): AppThunk<Promise<Partial<Shiva>>> => async (dispatch): Promise<Partial<Shiva>> => {
  return new Promise<Partial<Shiva>>(async (resolve, reject) => {
    dispatch(updateShiva.request())
    try {
      await firestore.collection('shivas').doc(shivaId).update(dehydrateShiva(shiva))
    } catch (error) {
      dispatch(updateShiva.failure({ message: error }))
      reject(error)
    }
    dispatch(updateShiva.success({ shivaId, shiva }))
    resolve(shiva)
  })
}

/**
 * @description Patches the selected `Shiva` object
 * @param shiva A partial shiva object containing `Shiva` fields that need to be updated
 * @returns Promise
 */
export const patchSelectedShiva = (shiva: Partial<Shiva>): AppThunk<Promise<Partial<Shiva>>> => async (dispatch, getState): Promise<Partial<Shiva>> => {
  const state = getState()
  const { selectedShiva } = state.shiva
  if (selectedShiva) {
    return dispatch(patchShiva(selectedShiva, shiva))
  } else {
    return new Promise<Partial<Shiva>>(async (_resolve, reject) => {
      const err: BackendError = { message: 'Operation failed, Selected Shiva is null' }
      dispatch(updateShiva.failure(err))
      reject(err)
    })
  }
}

export const updateSelectedShiva = (): AppThunk<Promise<Partial<Shiva>>> => async (dispatch, getState): Promise<Partial<Shiva>> => {
  const state = getState()
  const { selectedShiva, entities } = state.shiva
  if (selectedShiva) {
    return dispatch(patchShiva(selectedShiva, entities[selectedShiva]))
  } else {
    return new Promise<Partial<Shiva>>(async (_resolve, reject) => {
      const err: BackendError = { message: 'Operation failed, Selected Shiva is null' }
      dispatch(updateShiva.failure(err))
      reject(err)
    })
  }
}

export const addVisitorMessage = (visitor: Visitor, visitId: VisitId, shivaId: ShivaId): AppThunk<Promise<void>> => async (dispatch): Promise<void> => {
  return new Promise<void>(async (resolve, reject) => {
    try {
      const { nameOfDeceased, videoLink } = await dispatch(fetchShivaById(shivaId))
      const videoLinkString = videoLink?.toString()
      const days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
      const visitDay = days[visitor.time.getDay()];
      const visitDate = visitor.time.toLocaleString();
      const visitorUrl = `http://app.remoteshiva.org/v/${visitId}`;
      const visitorName = visitor.name;
      const visitorEmail = visitor.email;
      await firestore.collection('add_visitor_messages').add({
        created: firebase.firestore.FieldValue.serverTimestamp(),
        visitDay,
        visitDate,
        visitorUrl,
        visitorName,
        visitorEmail,
        shivaId,
        nameOfDeceased,
        videoLink: videoLinkString,
        templateName: 'add_visitor',
      })
      resolve()
    } catch (error) {
      reject(error)
    }
  })
}
