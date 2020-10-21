import { BackendError } from '../types'

export type ROLE = 'Editor' | 'Mourner' | 'Visitor'
export type ShivaId = string
export interface Mourner {
  name: string
  relationship: string
}

export interface Visit {
  id: string
  date: Date
  length: number
  mourners: number[]
  visitors: string[]
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
  visits: { [key: string]: Visit }
  about?: string
  images: URL[]
  mealSignups?: string
  minianTimes?: string
  donations?: string
  inviteMessage?: string
}

export interface ShivaState {
  loading: boolean
  entities: { [key: string]: Shiva } // all shiva objects, arranged by id
  shivas: string[] // list of shiva ids
  visitorKeys: { [key: string]: string } // map visitor keys to shiva ids
  mournerKeys: { [key: string]: string } // map mourner keys to shiva ids
  selectedShiva: string | null // id of selected shiva
  error?: BackendError
}
