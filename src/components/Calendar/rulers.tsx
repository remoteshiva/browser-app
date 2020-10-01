import React from 'react'
import * as Moment from 'moment'
import { extendMoment } from 'moment-range'
import { HRulerWrapper, VRulerWrapper, Day, Hour } from './styles'
import { withCalendarContext, CalendarContextProps } from './context'

const moment = extendMoment(Moment)

interface HorizontalRulerProps extends CalendarContextProps {
  startDate: moment.Moment
  numOfDays: number
}
export const HorizontalRuler = withCalendarContext(({ startDate, numOfDays }: HorizontalRulerProps) => {
  const toDate = startDate.clone().add('days', numOfDays - 1)
  const range = moment().range(startDate, toDate)
  const days = Array.from(range.by('day'))
  return (
    <HRulerWrapper numOfColumns={numOfDays}>
      {days.map((day, i) => (
        <Day key={i}>{day.format('ddd, MMM D')}</Day>
      ))}
    </HRulerWrapper>
  )
})

interface VerticalRulerProps extends CalendarContextProps {}

export const VerticalRuler = withCalendarContext(({ startHour, endHour }: VerticalRulerProps) => {
  const hours = Array.from({ length: endHour - startHour + 1 }, (_, i) => moment(i + startHour, 'h').format('ha'))
    .map(h => (h === '12pm' ? 'Noon' : h))
    .map(h => (h === '12am' ? 'Midnight' : h))
  return (
    <VRulerWrapper>
      {hours.map((hour, i) => (
        <Hour key={i}>{hour}</Hour>
      ))}
    </VRulerWrapper>
  )
})
