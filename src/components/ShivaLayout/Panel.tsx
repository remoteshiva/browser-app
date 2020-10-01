import React, { useState } from 'react'
import { Shiva, ROLE } from '../../store/shiva/types'
import Card from './Card'

export enum Direction {
  row = 'row',
  column = 'column',
}
export interface ShivaPanel {
  shiva: Shiva
  role: ROLE
  editing?: boolean
}

interface withPanelProps {
  role: ROLE
  direction?: Direction
  darkMode: boolean
}
export const withPanel = <P extends object>(Component: React.ComponentType<P>): React.FC<P & withPanelProps> => ({ role, direction, darkMode, ...props }: withPanelProps) => {
  const [editing, setEditing] = useState<boolean>(false)
  const onModeChange = () => {
    setEditing(!editing)
  }
  return role === 'Visitor' && darkMode ? null : (
    <Card darkMode={darkMode} direction={direction} role={role} onModeChange={onModeChange} editing={editing}>
      <Component editing={editing} role={role} {...(props as P)} />
    </Card>
  )
}
