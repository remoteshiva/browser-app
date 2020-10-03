import React, { ReactNode } from 'react'
import styled from 'styled-components'
import { ROLE } from '../../store/shiva/types'
import { CardWrapper, Direction } from './styles'
import EditIcon from '../../assets/img/edit.svg'
import SaveIcon from '../../assets/img/save.svg'

interface Props {
  darkMode: boolean
  role: ROLE
  editing?: boolean
  onModeChange?: () => void
  direction?: Direction
  children: ReactNode
}

const EditButton = styled.img`
  position: absolute;
  right: 10px;
  top: 10px;
`

const Card = ({ darkMode, editing, direction, role, children, onModeChange }: Props) => {
  return (
    <CardWrapper className={darkMode && !editing ? 'darkMode' : ''} direction={direction}>
      {role === 'Visitor' ? null : <EditButton onClick={onModeChange} src={editing ? SaveIcon : EditIcon} />}
      {children}
    </CardWrapper>
  )
}

export default Card
