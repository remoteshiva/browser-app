import React, { useState } from 'react'
import { eachDayOfInterval } from 'date-fns'
import { Visit } from '../../store/shiva/types'
import Column from './Column'
import { GridContainer, GridBackground, GridColumns } from './styles'

interface GridProps {
  editMode: boolean
  startDate: Date
  endDate: Date
  visits: Visit[]
}
export const Grid = ({ editMode, startDate, endDate, visits }: GridProps) => {
  const [offset, setOffset] = useState(0)

  // useEffect(() => {
  //   window.onscroll = () => {
  //     setOffset(window.pageYOffset)
  //   }
  // }, []);

  const days = eachDayOfInterval({ start: startDate, end: endDate })
  return (
    <GridContainer numOfColumns={days.length}>
      <GridBackground>Click and drag to add visiting hours</GridBackground>
      <GridColumns numOfColumns={days.length}>
        {days.map((day, i) => (
          <Column key={i} editMode={editMode} day={day} visits={visits} scrollYOffset={offset} />
        ))}
      </GridColumns>
    </GridContainer>
  )
}
