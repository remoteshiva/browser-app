import { startOfDay, addDays } from 'date-fns'
import { BackendError } from '../types'

export type ROLE = 'Editor' | 'Mourner' | 'Visitor'
export interface Mourner {
  name: string
  relationship: string
}

export interface Visit {
  date: Date
  length: number
  mourners: number[]
  visitors: string[]
}
export interface Shiva {
  _id: string
  nameOfDeceased: string
  startDate: Date
  endDate: Date
  message?: string
  videoLink: URL | null
  mourners: Mourner[]
  mournerKey: string
  visitorKey: string
  titleImage: URL | null
  visits: Visit[]
  about?: string
  images: URL[]
  mealSignups?: string
  minianTimes?: string
  donations?: string
  inviteMessage?: string
}

const generateRandomKey = (): string => {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
}

/**
 * @description Initializes a new Shiva object with default params.
 * @param shiva - Optional partial shiva model for overriding defaults
 * @example - const shiva = initializeShiva({nameOfDeceased: 'John Doe'})
 */
export const initializeShiva = (shiva?: Partial<Shiva>): Shiva => ({
  _id: '',
  nameOfDeceased: '',
  startDate: startOfDay(new Date()),
  endDate: startOfDay(addDays(new Date(), 7)),
  mourners: [],
  videoLink: null,
  mournerKey: generateRandomKey(),
  visitorKey: generateRandomKey(),
  visits: [],
  titleImage: null,
  about: '',
  images: [],
  mealSignups: '',
  minianTimes: '',
  donations: '',
  inviteMessage: '',
  ...shiva,
})

export interface ShivaState {
  loading: boolean
  entities: { [key: string]: Shiva } // all shiva objects, arranged by id
  shivas: string[] // list of shiva ids
  visitorKeys: { [key: string]: string } // map visitor keys to shiva ids
  mournerKeys: { [key: string]: string } // map mourner keys to shiva ids
  selectedShiva: string | null // id of selected shiva
  error?: BackendError
}
