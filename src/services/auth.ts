import { push } from 'connected-react-router'
import { auth, User as FBUser } from 'firebase'
import * as Routes from '../routes'
import { firestore } from '../firebase.config'
import { AppThunk } from './common'
import { Session } from '../store/auth/types'
import { loginError, loginRequest, loginSuccess, logoutRequest, logout, signupRequest, signupSuccess, signupError } from '../store/auth/actions'
import { resetShiva } from '../store/shiva/actions'

/**
 * @description - Creates a new user with email and password as authentication method.
 * This method dispatches the steps neccesary to created the new user and upon success navigates the app to the login screen
 * @param name - user's display name (e.g: John Doe)
 * @param email - user's email address
 * @param password - user's password - must adhere to firebase password rules
 */
export const signupUser = (name: string, email: string, password: string): AppThunk => async dispatch => {
  dispatch(signupRequest())
  try {
    const { user: fbuser } = await auth().createUserWithEmailAndPassword(email, password)
    if (fbuser) {
      try {
        await createUser(fbuser, name)
        dispatch(signupSuccess())
        dispatch(push(Routes.LOGIN_PAGE))
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
        const { uid, email, displayName, photoURL } = await createUser(fbuser, fbuser.displayName || '')
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
              const data = await getUser(user.uid)
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
        await createUser(fbuser, fbuser.displayName || '')
        dispatch(signupSuccess())
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
        const data = await getUser(user.uid)
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

const createUser = async (user: FBUser, name: string) => {
  const userRef = firestore.doc(`users/${user.uid}`)
  const snapshot = await userRef.get()
  if (!snapshot.exists) {
    const { email, photoURL } = user
    try {
      await userRef.set({ displayName: name, email, photoURL })
    } catch (error) {
      throw error
    }
  }
  return getUser(user.uid)
}

// TODO: do we need this?
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

const getUser = async (uid: string): Promise<any> => {
  if (!uid) return null
  try {
    const user = await firestore.doc(`users/${uid}`).get()
    return {
      uid,
      ...user.data(),
    }
  } catch (error) {
    console.error('Error fetching user', error)
  }
}
