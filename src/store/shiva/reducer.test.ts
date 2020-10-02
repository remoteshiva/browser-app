import * as ShivaActionTypes from './constants'
import { initializeShiva } from './types'
import { ShivaReducer, initialState } from './reducer'
import { shivas } from '../../mock-data'

describe('Auth reducer', () => {
  it('should be loading after fetch shiva request', () => {
    const state = ShivaReducer(initialState, { type: ShivaActionTypes.FetchShivaListRequest })
    expect(state.loading).toBeTruthy()
  })
  it('should have shivas after successful fetch shivas', () => {
    const state = ShivaReducer(initialState, { type: ShivaActionTypes.FetchShivaListSuccess, payload: shivas })
    expect(state.loading).toBeFalsy()
    expect(state.entities).not.toEqual({})
    expect(state.shivas).not.toEqual([])
    expect(state.visitorKeys).not.toEqual({})
    expect(state.mournerKeys).not.toEqual({})
    expect(state.selectedShiva).toBeNull()
  })
  it('should have a new shiva after successful create shiva', () => {
    const newShiva = initializeShiva({ _id: Math.random().toString(36).substring(3) })
    const { _id, mournerKey, visitorKey } = newShiva
    const state = ShivaReducer(initialState, { type: ShivaActionTypes.CreateShivaSuccess, payload: newShiva })
    expect(state.loading).toBeFalsy()
    expect(state.entities).toMatchObject({ [_id]: newShiva })
    expect(state.shivas).toContain(_id)
    expect(state.mournerKeys).toMatchObject({ [mournerKey]: _id })
    expect(state.visitorKeys).toMatchObject({ [visitorKey]: _id })
  })
  it('should update an existing shiva with new data', () => {
    // first we create a new shiva
    const newShiva = initializeShiva({ _id: Math.random().toString(36).substring(3), nameOfDeceased: 'Ron Burgundy' })
    const { _id } = newShiva
    const state = ShivaReducer(initialState, { type: ShivaActionTypes.CreateShivaSuccess, payload: newShiva })
    expect(state.entities).toHaveProperty(_id)
    expect(state.entities[_id].nameOfDeceased).toEqual('Ron Burgundy')
    // now we change some properties
    const newState = ShivaReducer(state, { type: ShivaActionTypes.UpdateShivaSuccess, payload: { shivaId: _id, shiva: { nameOfDeceased: 'Brian Fantana' } } })
    expect(newState.entities).toHaveProperty(_id)
    expect(newState.entities[_id].nameOfDeceased).toEqual('Brian Fantana')
  })
  it('should delete an existing shiva upon successful delete', () => {
    // first we create a new shiva
    const newShiva = initializeShiva({ _id: Math.random().toString(36).substring(3), nameOfDeceased: 'Ron Burgundy' })
    const { _id } = newShiva
    const state = ShivaReducer(initialState, { type: ShivaActionTypes.CreateShivaSuccess, payload: newShiva })
    expect(state.entities).toHaveProperty(_id)
    expect(state.entities[_id].nameOfDeceased).toEqual('Ron Burgundy')
    // now we can delete the shiva and verify
    const newState = ShivaReducer(state, { type: ShivaActionTypes.DeleteShivaSuccess, payload: _id })
    expect(newState.entities).toMatchObject({})
    expect(newState.shivas.length).toBe(0)
    expect(newState.mournerKeys).toMatchObject({})
    expect(newState.visitorKeys).toMatchObject({})
  })
})
