import { arrayToObject } from '../helpers'
import { initializeShiva, initializeVisit } from './helpers'
import * as Actions from './actions'
import { ShivaReducer, initialState } from './reducer'
import { shivas } from '../../mock-data'

describe('Shiva reducer', () => {
  it('should be loading after fetch shiva request', () => {
    const state = ShivaReducer(initialState, Actions.fetchShivaRequest())
    expect(state.loading).toBeTruthy()
  })
  it('should have shivas after successful fetch shivas', () => {
    const state = ShivaReducer(initialState, Actions.fetchShivaListSuccess(shivas))
    expect(state.loading).toBeFalsy()
    expect(state.entities).not.toEqual({})
    expect(state.shivas).not.toEqual([])
    expect(state.visitorKeys).not.toEqual({})
    expect(state.mournerKeys).not.toEqual({})
    expect(state.selectedShiva).toBeNull()
  })
  it('should have a new shiva after successful create shiva', () => {
    const newShiva = initializeShiva()
    const { id, mournerKey, visitorKey } = newShiva
    const state = ShivaReducer(initialState, Actions.createShivaSuccess(newShiva))
    expect(state.loading).toBeFalsy()
    expect(state.entities).toMatchObject({ [id]: newShiva })
    expect(state.shivas).toContain(id)
    expect(state.mournerKeys).toMatchObject({ [mournerKey]: id })
    expect(state.visitorKeys).toMatchObject({ [visitorKey]: id })
  })
  it('should update an existing shiva with new data', () => {
    // first we create a new shiva
    const newShiva = initializeShiva({ nameOfDeceased: 'Ron Burgundy' })
    const { id } = newShiva
    const state = ShivaReducer(initialState, Actions.createShivaSuccess(newShiva))
    expect(state.entities).toHaveProperty(id)
    expect(state.entities[id].nameOfDeceased).toEqual('Ron Burgundy')
    // now we change some properties
    const newState = ShivaReducer(state, Actions.updateShivaSuccess({ shivaId: id, shiva: { nameOfDeceased: 'Brian Fantana' } }))
    expect(newState.entities).toHaveProperty(id)
    expect(newState.entities[id].nameOfDeceased).toEqual('Brian Fantana')
  })
  it('should delete an existing shiva upon successful delete', () => {
    // first we create a new shiva
    const newShiva = initializeShiva({ nameOfDeceased: 'Ron Burgundy' })
    const { id } = newShiva
    const state = ShivaReducer(initialState, Actions.createShivaSuccess(newShiva))
    expect(state.entities).toHaveProperty(id)
    expect(state.entities[id].nameOfDeceased).toEqual('Ron Burgundy')
    // now we can delete the shiva and verify
    const newState = ShivaReducer(state, Actions.deleteShivaSuccess(id))
    expect(newState.entities).toMatchObject({})
    expect(newState.shivas.length).toBe(0)
    expect(newState.mournerKeys).toMatchObject({})
    expect(newState.visitorKeys).toMatchObject({})
  })
  it('should add a new visit to existing shiva', () => {
    const newShiva = initializeShiva({ nameOfDeceased: 'Ron Burgundy' })
    const { id } = newShiva
    const state = ShivaReducer(initialState, Actions.createShivaSuccess(newShiva))
    expect(state.entities).toHaveProperty(id)
    expect(state.entities[id].visits.length).toEqual(0)
    // now we can add a visit
    const newState = ShivaReducer(state, Actions.addShivaVisit({ shivaId: id, visit: initializeVisit(id) }))
    expect(Object.keys(state.entities[id].visits).length).toEqual(0)
    expect(Object.keys(newState.entities[id].visits).length).toEqual(1)
  })
  it('should remove an exisiting visit from a Shiva object', () => {
    const visits = arrayToObject([initializeVisit(), initializeVisit(), initializeVisit()])
    const newShiva = initializeShiva({ visits })
    const { id } = newShiva
    let state = ShivaReducer(initialState, Actions.createShivaSuccess(newShiva))
    expect(state.entities).toHaveProperty(id)
    const shivaVisits = state.entities[id].visits
    let count = Object.keys(shivaVisits).length
    expect(count).toEqual(3)
    // delete visits
    Object.keys(shivaVisits).forEach(visitId => {
      const newState = ShivaReducer(state, Actions.deleteShivaVisit({ shivaId: id, visitId }))
      const vs = newState.entities[id].visits
      expect(Object.keys(vs).length).toEqual(--count)
      state = newState
    })
    expect(state.entities[id].visits).toEqual({})
  })
  it('should update an existing visit in shiva object', () => {
    const visits = arrayToObject([initializeVisit(), initializeVisit(), initializeVisit()])
    const newShiva = initializeShiva({ visits })
    const { id } = newShiva
    let state = ShivaReducer(initialState, Actions.createShivaSuccess(newShiva))
    expect(state.entities).toHaveProperty(id)
    const shivaVisits = state.entities[id].visits
    let count = Object.keys(shivaVisits).length
    expect(count).toEqual(3)
    Object.keys(shivaVisits).forEach(visitId => {
      const newState = ShivaReducer(
        state,
        Actions.updateShivaVisit({
          shivaId: id,
          visitId,
          updatedVisit: { visitors: ['Ron Burgundy'] },
        })
      )
      state = newState
    })
    Object.keys(state.entities[id].visits).forEach(visitId => {
      expect(state.entities[id].visits[visitId].visitors).toContain('Ron Burgundy')
    })
  })
})
