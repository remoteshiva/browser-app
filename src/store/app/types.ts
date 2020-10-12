export interface Notification {
  id: string
  title: string
  type?: 'info' | 'warning' | 'error'
  description?: string
  icon?: string
}

export const initializeNotification = (notification: Partial<Notification>): Notification => ({
  id: Math.floor(Math.random() * 10001 + 1).toString(),
  title: '',
  ...notification,
})

export interface AppState {
  initialized: boolean
  notifications: Notification[]
}
