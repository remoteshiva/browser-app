import { Action } from 'redux'
import { ThunkAction } from 'redux-thunk'
import { RootState } from '../store'

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action>

export const pluck = <T extends object, K extends keyof T>(base: T, ...keys: K[]): Pick<T, K> => {
  const entries = keys.map(key => [key, base[key]])
  return Object.fromEntries(entries)
}

interface Omit {
  <T extends object, K extends [...(keyof T)[]]>(obj: T, ...keys: K): {
    [K2 in Exclude<keyof T, K[number]>]: T[K2]
  }
}

export const omit = <T extends object, K extends [...(keyof T)[]]>(obj: T, ...keys: K) => {
  let ret = {} as {
    [K in keyof typeof obj]: typeof obj[K]
  }
  let key: keyof typeof obj
  for (key in obj) {
    if (!keys.includes(key)) {
      ret[key] = obj[key]
    }
  }
  return ret
}
