import { BackendError } from '../types'

export type ROLE = 'Editor' | 'Mourner' | 'Visitor'
export type ShivaId = string
export type VisitId = string
export interface Mourner {
  name: string
  relationship: string
}

export type EntityMap = { [key: string]: Shiva }
export type VisitMap = { [key: string]: Visit }
export type KeyMap = { [key: string]: string }

export interface Visitor {
  name: string
  email: string
  time?: string
  timezone?: string
}

export interface Visit {
  id: VisitId
  startTime: Date
  endTime: Date
  mourners: number[]
  visitors: Visitor[]
}
export interface Shiva {
  id: ShivaId
  nameOfDeceased: string
  startDate: Date
  endDate: Date
  message: string
  videoLink: URL | null
  mourners: Mourner[]
  mournerKey: string
  visitorKey: string
  titleImage: URL | null
  visits: VisitMap
  about?: string
  images: URL[]
  mealSignups?: string
  minianTimes?: string
  donations?: string
  inviteMessage?: string
}

export interface ShivaState {
  loading: boolean
  entities: EntityMap // all shiva objects, arranged by id
  shivas: ShivaId[] // list of shiva ids
  visitorKeys: KeyMap // map visitor keys to shiva ids
  mournerKeys: KeyMap // map mourner keys to shiva ids
  selectedShiva: ShivaId | null // id of selected shiva
  selectedVisit: VisitId | null // id of selected shiva
  newShiva: Shiva | null
  error: BackendError | null
}
