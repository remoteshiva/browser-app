import React from 'react'
import { Shiva, Visit } from '../../store/shiva/types'
import { CalendarProvider } from './context'
import { Grid } from './grid'
import { VerticalRuler, HorizontalRuler } from './rulers'
import { 
  CalendarWrapper,
  Timezone,
} from './styles'

interface Props {
  shiva: Shiva
  editMode: boolean
}
const Calendar = ({
  shiva,
  editMode=false
}: Props) => {

  const numOfDays = shiva.endDate ? shiva.endDate.diff(shiva.startDate, 'days') : 7
  return(
    <CalendarProvider startHour={9} endHour={22}>
      <CalendarWrapper>
        <div>
          <Timezone>EST</Timezone>
          <VerticalRuler />
        </div>
        <div style={{  flex: 1, width: '100%'}}>
          <HorizontalRuler startDate={shiva.startDate} numOfDays={numOfDays}/>
          <Grid editMode={editMode} startDate={shiva.startDate} numOfDays={numOfDays} visits={shiva.visits}/>
        </div>
      </CalendarWrapper>
    </CalendarProvider>
  )
}

export default Calendar