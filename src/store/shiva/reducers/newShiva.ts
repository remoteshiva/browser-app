import * as ShivaActions from '../constants'
import { Shiva } from '../types'
import { initializeShiva } from '../helpers'
import { NewShivaActionTypes } from '../actions'

type MaybeNewShiva = Shiva | null

export const newShivaReducer = (newShiva: MaybeNewShiva, action: NewShivaActionTypes): MaybeNewShiva => {
  switch (action.type) {
    case ShivaActions.InitNewShiva: {
      return { ...initializeShiva() }
    }
    case ShivaActions.UpdateNewShiva: {
      if (newShiva === null) {
        return { ...initializeShiva(), ...action.payload }
      } else {
        return { ...newShiva, ...action.payload }
      }
    }
    case ShivaActions.DeleteNewShiva: {
      return null
    }
    default:
      return newShiva
  }
}
