import React, { ReactNode } from 'react'
import * as Moment from 'moment';
import { extendMoment } from 'moment-range';
import { 
  CalendarWrapper,
  Column,
  GridWrapper,
  VRulerWrapper,
  HRulerWrapper,
  Day,
  Hour,
  Timezone
} from './styles'

const moment = extendMoment(Moment);

interface CalendarProps {
  startDate: moment.Moment
}
const HorizontalRuler = ({startDate}: CalendarProps) => {
  const toDate = startDate.clone().add('days', 6);
  const range = moment().range(startDate, toDate);
  const days = Array.from(range.by('day'));
  return(
    <HRulerWrapper>
      { days.map((day, i) => (<Day key={i}>{day.format('ddd, MMM D')}</Day>))}
    </HRulerWrapper>
  )
}


const VerticalRuler = () => {
  const start = 9, end=22;
  const hours = Array.from({ length: end - start + 1}, (_, i) => moment(i+start, 'h').format('ha'))
  .map( h=> h==='12pm' ? 'Noon' : h )
  .map(h=> h==='12am' ? 'Midnight' : h)
  return (
    <VRulerWrapper>
      {hours.map((hour, i) => (<Hour key={i}>{hour}</Hour>))}
    </VRulerWrapper>
  )
}

const Grid = () => (
  <GridWrapper>
    <Column/>
    <Column/>
    <Column/>
    <Column/>
    <Column/>
    <Column/>
    <Column/>
  </GridWrapper>
)

const Calendar = ({startDate}: CalendarProps) => (
  <CalendarWrapper>
    <div>
      <Timezone>EST</Timezone>
      <VerticalRuler/>
    </div>
    <div style={{  flex: 1, width: '100%'}}>
      <HorizontalRuler startDate={startDate}/>
      <Grid/>
    </div>
  </CalendarWrapper>
   
)

export default Calendar