import { push } from 'connected-react-router'
import { auth, User as FBUser } from 'firebase'
import * as Routes from '../routes'
import { firestore } from '../firebase.config'
import { AppThunk } from './common'
import { setInitialized, loginError, loginRequest, loginSuccess, logoutRequest, logout, signupRequest, signupSuccess, signupError } from '../store/auth/actions'
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

export const loginWithCredentials = (email: string, password: string): AppThunk => async dispatch => {
  dispatch(loginRequest())
  auth()
    .setPersistence(auth.Auth.Persistence.LOCAL)
    .then(() => {
      auth()
        .signInWithEmailAndPassword(email, password)
        .then(async ({ user }: auth.UserCredential) => {
          if (user) {
            const data = await getUser(user.uid)
            const session = { token: user.uid, user: { displayName: data.displayName, photoURL: data.photoURL } }
            dispatch(loginSuccess(session))
            dispatch(push(Routes.MY_SHIVAS))
          }
        })
        .catch(error => {
          dispatch(loginError(error))
        })
    })
}

export const loginWithGoogle = (): AppThunk => async dispatch => {
  dispatch(loginRequest())
  const provider = new auth.GoogleAuthProvider()
  auth()
    .setPersistence(auth.Auth.Persistence.LOCAL)
    .then(() => {
      auth()
        .signInWithPopup(provider)
        .then(response => {
          console.log(response)
        })
        .catch(error => {
          dispatch(loginError(error))
        })
    })
}

export const checkAuthentication = (url: string): AppThunk => async dispatch => {
  dispatch(loginRequest())
  auth().onAuthStateChanged(async user => {
    if (user) {
      const data = await getUser(user.uid)
      const session = { token: user.uid, user: { displayName: data.displayName, photoURL: data.photoURL } }
      dispatch(loginSuccess(session))
      dispatch(setInitialized())
      dispatch(push(url))
    } else {
      dispatch(logoutUser())
      dispatch(setInitialized())
    }
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
