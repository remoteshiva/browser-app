import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../../store'
import { Notification } from '../../store/app/types'
import { removeNotification } from '../../store/app/actions'
import { Container, NotificationWrapper } from './styles'

export enum Position {
  tr = 'tr',
  tl = 'tl',
  br = 'br',
  bl = 'bl',
}

export type Timeout = number | null

const Toast = ({ id, icon, title, description }: Notification) => {
  const dispatch = useDispatch()
  const [timer, setTimer] = useState<Timeout>(null)
  useEffect(() => {
    setTimer(
      setTimeout(() => {
        dispatch(removeNotification(id))
      }, 5000)
    )
    return () => {
      if (timer) {
        dispatch(clearTimeout(timer))
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <NotificationWrapper key={id} className={Position.br}>
      {icon ? (
        <div className="icon">
          <img src={icon} alt="icon" />
        </div>
      ) : null}
      <div className="title">{title}</div>
      <div className="description">{description}</div>
    </NotificationWrapper>
  )
}

const ToastContainer = () => {
  const { notifications } = useSelector((state: RootState) => state.app)

  return (
    <Container className={Position.br}>
      {notifications.map(toast => (
        <Toast key={toast.id} {...toast} />
      ))}
    </Container>
  )
}

export default ToastContainer
