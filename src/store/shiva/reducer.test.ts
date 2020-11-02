import { initializeShiva, initializeVisit } from './helpers'
import * as Actions from './actions'
import { ShivaReducer, visitReducer, initialState } from './reducer'
import { shivas } from '../../mock-data'
import { VisitMap, Visitor } from './types'

describe('Shiva reducer', () => {
  it('should be loading after fetch shiva request', () => {
    const state = ShivaReducer(initialState, Actions.fetchShiva.request())
    expect(state.loading).toBeTruthy()
  })
  it('should have shivas after successful fetch shivas', () => {
    const state = ShivaReducer(initialState, Actions.fetchShivaList.success(shivas))
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
    const state = ShivaReducer(initialState, Actions.createShiva.success(newShiva))
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
    const state = ShivaReducer(initialState, Actions.createShiva.success(newShiva))
    expect(state.entities).toHaveProperty(id)
    expect(state.entities[id].nameOfDeceased).toEqual('Ron Burgundy')
    // now we change some properties
    const newState = ShivaReducer(state, Actions.updateShiva.success({ shivaId: id, shiva: { nameOfDeceased: 'Brian Fantana' } }))
    expect(newState.entities).toHaveProperty(id)
    expect(newState.entities[id].nameOfDeceased).toEqual('Brian Fantana')
  })
  it('should delete an existing shiva upon successful delete', () => {
    // first we create a new shiva
    const newShiva = initializeShiva({ nameOfDeceased: 'Ron Burgundy' })
    const { id } = newShiva
    const state = ShivaReducer(initialState, Actions.createShiva.success(newShiva))
    expect(state.entities).toHaveProperty(id)
    expect(state.entities[id].nameOfDeceased).toEqual('Ron Burgundy')
    // now we can delete the shiva and verify
    const newState = ShivaReducer(state, Actions.deleteShiva.success(id))
    expect(newState.entities).toMatchObject({})
    expect(newState.shivas.length).toBe(0)
    expect(newState.mournerKeys).toMatchObject({})
    expect(newState.visitorKeys).toMatchObject({})
  })
})

describe('Visit Reducer', () => {
  it('should add a new visit', () => {
    const newVisit = initializeVisit({
      id: 'fgsrnj565radg',
    })
    const visitMap = visitReducer({}, Actions.addVisit(newVisit))
    expect(Object.keys(visitMap).length).toEqual(1)
  })
  it('should remove an existing visit', () => {
    const visitMap: VisitMap = {}
    visitMap['1'] = initializeVisit({ id: '1' })
    visitMap['2'] = initializeVisit({ id: '2' })
    visitMap['3'] = initializeVisit({ id: '3' })

    const newVisitMap = visitReducer(visitMap, Actions.deleteVisit('2'))
    const keys = Object.keys(newVisitMap)
    expect(keys.length).toEqual(2)
    expect(keys).toContain('1')
    expect(keys).not.toContain('2')
    expect(keys).toContain('3')
  })
  it('should update an existing visit', () => {
    const visitMap: VisitMap = {}
    visitMap['1'] = initializeVisit({ id: '1' })
    expect(visitMap['1'].visitors).toEqual([])

    const visitor: Visitor = {
      name: 'Ron Burgundy',
      email: 'ron@channel4.com',
    }
    const newVisitMap = visitReducer(visitMap, Actions.updateVisit({ visitId: '1', partialVisit: { visitors: [visitor] } }))
    expect(visitMap['1'].visitors).toEqual([])
    expect(newVisitMap['1'].visitors).not.toEqual([])
    expect(newVisitMap['1'].visitors).toEqual([visitor])
    expect(newVisitMap['1'].visitors).not.toEqual(['something'])
    expect(newVisitMap['1'].visitors[0]).toEqual(visitor)
  })
})
