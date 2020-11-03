import React, { useState } from 'react'
import { eachDayOfInterval } from 'date-fns'
import { Visit, Mourner } from '../../store/shiva/types'
import Column from './Column'
import { GridContainer, GridBackground, GridColumns } from './styles'

interface GridProps {
  startDate: Date
  endDate: Date
  visits: { [key: string]: Visit }
  mourners: Mourner[]
}
export const Grid = ({ startDate, endDate, visits, mourners }: GridProps) => {
  const days = eachDayOfInterval({ start: startDate, end: endDate })
  return (
    <GridContainer numOfColumns={days.length}>
      {Object.keys(visits).length === 0 ? <GridBackground>Click and drag to add visiting hours</GridBackground> : null }
      <GridColumns numOfColumns={days.length}>
        {days.map((day, i) => (
          <Column key={i} day={day} visits={visits} mourners={mourners}/>
        ))}
      </GridColumns>
    </GridContainer>
  )
}
