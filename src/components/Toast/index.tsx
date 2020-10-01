import React, { useState, useEffect, useCallback } from 'react'
import { Container, Notification } from './styles'

export const getRandomId = (): string => Math.floor(Math.random() * 10001 + 1).toString()

export interface ToastModel {
  id: string
  title: string
  description?: string
  icon?: string
}

export enum Position {
  tr = 'tr',
  tl = 'tl',
  br = 'br',
  bl = 'bl',
}
interface Props {
  toasts: ToastModel[]
  position: Position
  autoDelete: boolean
  dismissAfter?: number
}

const ToastContainer = ({ toasts, autoDelete, position, dismissAfter = 5 }: Props) => {
  const [list, setList] = useState(toasts)

  const deleteToast = useCallback(
    (id: string) => {
      const listItemIndex = list.findIndex(e => e.id === id)
      const toastListItem = toasts.findIndex(e => e.id === id)
      list.splice(listItemIndex, 1)
      toasts.splice(toastListItem, 1)
      setList([...list])
    },
    [list, toasts]
  )

  useEffect(() => {
    setList([...toasts])
  }, [toasts])

  useEffect(() => {
    const interval = setInterval(() => {
      if (autoDelete && toasts.length && list.length) {
        deleteToast(toasts[0].id)
      }
    }, dismissAfter * 1000)

    return () => {
      clearInterval(interval)
    }
  }, [toasts, autoDelete, dismissAfter, list, deleteToast])

  return (
    <Container className={position}>
      {list.map(toast => (
        <Notification key={toast.id} className={position}>
          <div className="icon">
            <img src={toast.icon} alt="icon" />
          </div>
          <div className="title">{toast.title}</div>
          <div className="description">{toast.description}</div>
        </Notification>
      ))}
    </Container>
  )
}

export default ToastContainer
