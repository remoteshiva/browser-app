import React, { useState, useEffect } from 'react'
import * as Moment from 'moment'
import { extendMoment } from 'moment-range'
import { Visit } from '../../store/shiva/types'
import Column from './Column'
import { GridContainer, GridBackground, GridColumns } from './styles'

const moment = extendMoment(Moment);

interface GridProps {
  editMode: boolean
  startDate: moment.Moment
  numOfDays: number
  visits: Visit[]
}
export const Grid = ({editMode, startDate, numOfDays, visits}: GridProps) => {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    window.onscroll = () => {
      setOffset(window.pageYOffset)
    }
  }, []);

  const columnDays = Array.from({length: numOfDays}, (_, i) => startDate.clone().add(i, 'days'))
  return(
    <GridContainer numOfColumns={numOfDays}>
      <GridBackground>Click and drag to add visiting hours</GridBackground>
      <GridColumns numOfColumns={numOfDays}>
        { columnDays.map((day, i) => (
          <Column
            key={i} 
            editMode={editMode} 
            day={day}
            visits={visits}
            scrollYOffset={offset}
          />
        )) 
        }
      </GridColumns>
    </GridContainer>
  )
}

