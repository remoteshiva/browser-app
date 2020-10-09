import { BackendError } from '../types'

export interface Notification {
  id: string
  title: string
  type?: 'info' | 'warning' | 'error'
  description?: string
  icon?: string
}

export interface AppState {
  initialized: boolean
  notifications: Notification[]
}
