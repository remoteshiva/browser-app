import React, { ReactNode } from 'react'
import styled from 'styled-components'
import { Role } from '../../store/shiva/types'
import { CardWrapper, Direction } from './styles'
import EditIcon from '../../assets/img/editWhite.svg'
import SaveIcon from '../../assets/img/save.svg'
import CancelIcon from '../../assets/img/cancel.svg'

interface Props {
  darkMode: boolean
  role: Role
  editing?: boolean
  onModeChange: () => void
  onCancel: () => void
  direction?: Direction
  children: ReactNode
}

interface ButtonProps {
  icon: string
  iconSize: number
}

const Button = styled.button<ButtonProps>`
  background-image: ${props => `url(${props.icon})`};
  background-position: center;
  background-repeat: no-repeat;
  background-size: ${props => `${props.iconSize}px`};
  width: 30px;
  height: 30px;
  border-radius: 8px;
  margin-right: 5px;
  background-color: ${props => props.theme.colors.desertStorm};
`

const Buttons = styled.div`
  position: absolute;
  right: 10px;
  top: 10px;
`

const Card = ({ darkMode, editing, direction, role, children, onModeChange, onCancel }: Props) => {
  return (
    <CardWrapper className={darkMode && !editing ? 'darkMode' : ''} direction={direction}>
      {role === 'Visitor' ? null : (
        <Buttons>
          {editing ? <Button icon={CancelIcon} onClick={onCancel} iconSize={14} /> : null}
          <Button onClick={onModeChange} icon={editing ? SaveIcon : EditIcon} iconSize={17} />
        </Buttons>
      )}
      {children}
    </CardWrapper>
  )
}

export default Card
