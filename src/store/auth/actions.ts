import { push } from 'connected-react-router'
import { auth, User as FBUser } from 'firebase'
import { firestore } from '../../firebase.config'
import { AppThunk } from '../types'
import { loginError, loginRequest, loginSuccess, logoutRequest, logout, signupRequest, signupSuccess, signupError } from './types'
import { resetShiva } from '../shiva/types'
import { test_session } from '../../mock-data'

export const signupUser = (name: string, email: string, password: string): AppThunk => async dispatch => {
  dispatch(signupRequest())
  try {
    const { user: fbuser } = await auth().createUserWithEmailAndPassword(email, password)
    if (fbuser) {
      try {
        await createUser(fbuser, name)
        dispatch(signupSuccess())
        dispatch(push('/login'))
      } catch (error) {
        dispatch(signupError(error))
      }
    }
  } catch (error) {
    dispatch(signupError(error))
  }
}

export const loginUser = (userid: string, password: string): AppThunk => async dispatch => {
  dispatch(loginRequest())
  setTimeout(() => {
    dispatch(loginSuccess(test_session))
    dispatch(push('/'))
  }, 1000)
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
            dispatch(push('/'))
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
      dispatch(push(url))
    } else {
      dispatch(logoutUser())
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
