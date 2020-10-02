import { AuthActions } from '../../../src/store/auth/types'
import { AuthReducer, initialState } from '../../../src/store/auth/reducer'

describe('Auth reducer', () => {
  it('should return the initial state', () => {
    const state = AuthReducer(initialState, { type: AuthActions.LOGOUT })
    expect(state).toEqual(initialState)
  })
})
