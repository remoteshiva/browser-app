import React, { ReactNode } from 'react'
import * as Moment from 'moment';
import { extendMoment } from 'moment-range';
import { 
  CalendarWrapper,
  ColumnWrapper,
  GridWrapper,
  VRulerWrapper,
  HRulerWrapper,
  Day,
  Hour,
  Timezone,
  EventWrapper
} from './styles'
import { Shiva, Visit } from '../../store/shiva/types'
import { shivas } from '../../mock-data';

const moment = extendMoment(Moment);

interface CalendarProps {
  shiva: Shiva
}

interface RulerProps {
  startDate: moment.Moment
}
const HorizontalRuler = ({startDate}: RulerProps) => {
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

interface EventProps {
  visit: Visit
}
const EventBlock = ({visit}: EventProps) =>(
  <EventWrapper style={{top: '100px'}}>

  </EventWrapper>
)
interface ColumnProps {
  visits: Visit[]
}
const Column = ({visits}: ColumnProps) => (
  <ColumnWrapper>
    {visits.map((visit, i) => <EventBlock key={i} visit={visit}/>)}
  </ColumnWrapper>
)

const Grid = ({shiva}: CalendarProps) => {
  if(shiva.visits.length>0){
    console.log('dates', shiva.visits[0].date)
    console.log('other date',shiva.startDate.clone().add('days', 2)  )
  }
  return(
  <GridWrapper>
    <Column visits={shiva.visits.filter(visit => visit.date === shiva.startDate )}/>
    <Column visits={shiva.visits.filter(visit => visit.date.date() === shiva.startDate.clone().add('days', 1).date() )}/>
    <Column visits={shiva.visits.filter(visit => visit.date.date() === shiva.startDate.clone().add('days', 2).date() )}/>
    <Column visits={shiva.visits.filter(visit => visit.date.date() === shiva.startDate.clone().add('days', 3).date() )}/>
    <Column visits={shiva.visits.filter(visit => visit.date.date() === shiva.startDate.clone().add('days', 4).date() )}/>
    <Column visits={shiva.visits.filter(visit => visit.date.date() === shiva.startDate.clone().add('days', 5).date() )}/>
    <Column visits={shiva.visits.filter(visit => visit.date.date() === shiva.startDate.clone().add('days', 6).date() )}/>
  </GridWrapper>
)}

const Calendar = ({shiva}: CalendarProps) => (
  <CalendarWrapper>
    <div>
      <Timezone>EST</Timezone>
      <VerticalRuler/>
    </div>
    <div style={{  flex: 1, width: '100%'}}>
      <HorizontalRuler startDate={shiva.startDate}/>
      <Grid shiva={shiva}/>
    </div>
  </CalendarWrapper>
   
)

export default Calendar