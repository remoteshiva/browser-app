import React, { ReactNode } from 'react'
import styled from 'styled-components'
import { ROLE } from '../../store/shiva/types'
import { CardWrapper, Direction } from './styles'
import EditIcon from '../../assets/img/edit.svg'
import SaveIcon from '../../assets/img/save.svg'

interface Props {
  role: ROLE
  editing?: boolean
  onModeChange? : () => void
  direction?: Direction
  children: ReactNode
}

const EditButton = styled.img`
  position: absolute;
  right: 10px;
  top: 10px;
`

const Card = ({editing, direction, role, children, onModeChange}: Props) => {
  return(
    <CardWrapper direction={direction}>
      { 
        role !== 'Visitor' ? 
          <EditButton 
            onClick={onModeChange} 
            src={editing ? SaveIcon: EditIcon }
          />
          : null
      }
      {children}
    </CardWrapper>
  )
}

export default Card;