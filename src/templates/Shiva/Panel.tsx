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
  save?: number
}

interface withPanelProps {
  role: ROLE
  direction?: Direction
  darkMode: boolean
}

interface InternalPanelProps {
  save: number
}

export const withPanel = <P extends object>(Component: React.ComponentType<P>): React.FC<P & withPanelProps> => ({ role, direction, darkMode, ...props }) => {
  const [editing, setEditing] = useState<boolean>(false)
  const [save, doSave] = useState(0)
  const [reset, doReset] = useState(0)
  const onModeChange = () => {
    setEditing(!editing)
    if (editing) doSave(prev => prev + 1)
  }
  const onCancel = () => {
    setEditing(false)
    console.log('cancel and repd')
    doReset(prev=>prev+1)
  }

  return role === 'Visitor' && darkMode ? null : (
    <Card darkMode={darkMode} direction={direction} role={role} onModeChange={onModeChange} onCancel={onCancel} editing={editing}>
      <Component key={reset} editing={editing} role={role} save={save} {...(props as P)} />
    </Card>
  )
}
