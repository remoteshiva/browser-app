import { AuthActions, Session } from './types'
import { AuthReducer, initialState } from './reducer'

const test_session: Session = {
  token: 'aU3BuL62emYeFyGpkYpZ',
  user: {
    firstName: 'Ron',
    lastName: 'Burgundy',
  },
}

describe('Auth reducer', () => {
  it('should return the initial state', () => {
    const state = AuthReducer(initialState, { type: AuthActions.LOGOUT })
    expect(state).toEqual(initialState)
  })
  it('should be loading after login request', () => {
    const state = AuthReducer(initialState, { type: AuthActions.LOGIN_REQUEST })
    expect(state.loading).toBeTruthy()
  })
  it('should have a session after successful login', () => {
    const state = AuthReducer(initialState, { type: AuthActions.LOGIN_SUCCESS, payload: test_session })
    expect(state.loading).toBeFalsy()
    expect(state.error).toBeNull()
    expect(state).toHaveProperty('session')
    expect(state.session).toHaveProperty('token')
    expect(state.session).toHaveProperty('user')
  })
  it('should have an error after login failed', () => {
    const state = AuthReducer(initialState, { type: AuthActions.LOGIN_ERROR, payload: '401 error' })
    expect(state.loading).toBeFalsy()
    expect(state.error).not.toBeNull()
  })
})
