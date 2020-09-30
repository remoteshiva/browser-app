import React, { useState } from 'react'
import { Shiva, ROLE } from '../../store/shiva/types'
import Card from './Card'

export enum Direction{
  row = 'row',
  column = 'column'
}
export interface ShivaPanel {
  shiva: Shiva
  editing?: boolean
}
  
interface withPanelProps {
  role: ROLE
  direction?: Direction
}
export const withPanel = <P extends object>(
  Component:React.ComponentType<P>
  ): React.FC<P & withPanelProps> => ({role, direction, ...props}:withPanelProps) => {
    const [editing, setEditing] = useState<boolean>(false)
    const onModeChange = () => {
      setEditing(!editing)
    }
    console.log('what is the role', role)
    return(
      <Card
        direction={direction}
        role={role}
        onModeChange={onModeChange}
        editing={editing}
      >
        <Component editing={editing} {...props as P}/>
      </Card>
    )
  }
