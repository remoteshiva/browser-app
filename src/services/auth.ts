import { push } from 'connected-react-router'
import firebase, { User as FBUser, firestore as fstore } from 'firebase/app'
import 'firebase/auth';
import * as Routes from '../routes'
import { firestore } from '../firebase.config'
import { AppThunk } from './common'
import { Session } from '../store/auth/types'
import { fetchMyShivas } from '../services/shiva'
import { loginError, loginRequest, loginSuccess, logoutRequest, logout, signupRequest, signupSuccess, signupError } from '../store/auth/actions'
import { resetShiva } from '../store/shiva/actions'

/**
 * @description - Creates a new user with email and password as authentication method.
 * This method dispatches the steps necessary to created the new user and upon success navigates the app to the login screen
 * @param name - user's display name (e.g: John Doe)
 * @param email - user's email address
 * @param password - user's password - must adhere to firebase password rules
 */
export const signupUser = (name: string, email: string, password: string): AppThunk => async dispatch => {
  dispatch(signupRequest())
  try {
    const { user: fbuser } = await firebase.auth().createUserWithEmailAndPassword(email, password)
    if (fbuser) {
      try {
        const { email, displayName, isNew } = await createUser(fbuser, name)
        if (isNew) {
          await dispatch(queueNewUserMessage(email, displayName))
        }
        dispatch(signupSuccess())
        await dispatch(fetchMyShivas())
        dispatch(push(Routes.MY_SHIVAS))
      } catch (error) {
        dispatch(signupError(error))
      }
    }
  } catch (error) {
    dispatch(signupError(error))
  }
}

/**
 * Description
 */
export const signUpWithProvider = (): AppThunk<Promise<Session>> => async (dispatch): Promise<Session> => {
  return new Promise<Session>(async resolve => {
    dispatch(signupRequest())
    const provider = new auth.GoogleAuthProvider()
    try {
      await auth().setPersistence(auth.Auth.Persistence.LOCAL)
      const { user: fbuser } = await auth().signInWithPopup(provider)
      if (fbuser) {
        const { uid, email, displayName, photoURL, isNew } = await createUser(fbuser, fbuser.displayName || '')
        if (isNew) {
          await dispatch(queueNewUserMessage(email, displayName))
        }
        dispatch(signupSuccess())
        //we we finished signing up, we can login
        const session = { token: uid, user: { email, displayName, photoURL } }
        dispatch(loginSuccess(session))
        resolve(session)
      }
    } catch (error) {
      dispatch(signupError(error))
      resolve(undefined)
    }
  })
}

export const loginWithCredentials = (email: string, password: string): AppThunk<Promise<Session>> => async (dispatch): Promise<Session> => {
  return new Promise<Session>(resolve => {
    dispatch(loginRequest())
    auth()
      .setPersistence(auth.Auth.Persistence.LOCAL)
      .then(() => {
        auth()
          .signInWithEmailAndPassword(email, password)
          .then(async ({ user }: auth.UserCredential) => {
            if (user) {
              const data = await getUser(user.uid, false)
              const session = { token: user.uid, user: { email: data.email, displayName: data.displayName, photoURL: data.photoURL } }
              dispatch(loginSuccess(session))
              resolve(session)
            }
          })
          .catch(error => {
            dispatch(loginError(error))
            resolve(undefined)
          })
      })
  })
}

export const loginWithGoogle = (): AppThunk<Promise<Session>> => async (dispatch): Promise<Session> => {
  return new Promise<Session>(async resolve => {
    dispatch(loginRequest())
    const provider = new auth.GoogleAuthProvider()
    try {
      await auth().setPersistence(auth.Auth.Persistence.LOCAL)
      const { user: fbuser } = await auth().signInWithPopup(provider)
      if (fbuser) {
        const { email, displayName, isNew } = await createUser(fbuser, fbuser.displayName || '')
        if (isNew) {
          await dispatch(queueNewUserMessage(email, displayName))
        }
        dispatch(signupSuccess())
        await dispatch(fetchMyShivas())
        dispatch(push(Routes.MY_SHIVAS))
      }
    } catch (error) {
      dispatch(signupError(error))
    }
  })
}

/**
 * @description Used during application startup to determine if a user's session exists in the browser's local storage
 */
export const getAuthState = (): AppThunk<Promise<Session>> => async (dispatch): Promise<Session> => {
  return new Promise<Session>(resolve => {
    dispatch(loginRequest())
    // check if a firebase auth session was persisted to localstorage
    auth().onAuthStateChanged(async user => {
      if (user) {
        const data = await getUser(user.uid, false)
        const session = { token: user.uid, user: { email: data.email, displayName: data.displayName, photoURL: data.photoURL } }
        dispatch(loginSuccess(session))
        resolve(session)
      } else {
        dispatch(logoutUser())
        resolve(undefined)
      }
    })
  })
}

export const logoutUser = (): AppThunk => async dispatch => {
  dispatch(logoutRequest())
  auth()
    .signOut()
    .then(() => {
      dispatch(logout())
      dispatch(resetShiva())
    })
    .catch(error => {
      // TODO: does this ever happen?
    })
}

export const queueNewUserMessage = (organizerEmail: string, organizerName: string): AppThunk<Promise<void>> => async (dispatch): Promise<void> => {
  return new Promise<void>(async (resolve, reject) => {
    try {
      const dashboardUrl = `${process.env.REACT_APP_BASE_URL}/`
      await firestore.collection('messages_new_user').add({
        created: fstore.FieldValue.serverTimestamp(),
        templateName: 'new_user',
        subject: `Welcome to RemoteShiva`,
        organizerEmail,
        organizerName,
        dashboardUrl
      })
      resolve()
    } catch (error) {
      reject(error)
    }
  })
}

const createUser = async (user: FBUser, name: string) => {
  const userRef = firestore.doc(`users/${user.uid}`)
  const snapshot = await userRef.get()
  let isNew = false
  if (!snapshot.exists) {
    isNew = true
    const { email, photoURL } = user
    try {
      await userRef.set({ displayName: name, email, photoURL })
    } catch (error) {
      throw error
    }
  }
  return getUser(user.uid, isNew)
}

// TODO:implement
// const createOAuthUser = async (email: string, displayName: string) => {
//   firestore
//     .collection('users')
//     .add({
//       email,
//       displayName,
//     })
//     .then(function (docRef) {
//       console.log('Document written with ID: ', docRef.id)
//     })
//     .catch(function (error) {
//       console.error('Error adding document: ', error)
//     })
// }

const getUser = async (uid: string, isNew: boolean): Promise<any> => {
  if (!uid) return null
  try {
    const user = await firestore.doc(`users/${uid}`).get()
    return {
      isNew,
      uid,
      ...user.data()
    }
  } catch (error) {
    console.error('Error fetching user', error)
  }
}

