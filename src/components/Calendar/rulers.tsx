import React from 'react'
import { eachDayOfInterval } from 'date-fns'
import { HRulerWrapper, VRulerWrapper, Day, Hour } from './styles'
import { withCalendarContext, CalendarContextProps } from './context'

interface HorizontalRulerProps extends CalendarContextProps {
  startDate: Date
  endDate: Date
}
export const HorizontalRuler = withCalendarContext(({ startDate, endDate }: HorizontalRulerProps) => {
  const days = eachDayOfInterval({ start: startDate, end: endDate })
  return (
    <HRulerWrapper numOfColumns={days.length}>
      {days.map((day, i) => (
        <Day key={i}>{day.toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' })}</Day>
      ))}
    </HRulerWrapper>
  )
})

interface VerticalRulerProps extends CalendarContextProps {}

export const VerticalRuler = withCalendarContext(({ startHour, endHour }: VerticalRulerProps) => {
  const hours = Array.from({ length: endHour - startHour + 1 }, (_, i) => (i + startHour > 11 ? `${i + startHour - 12}pm` : `${i + startHour}am`)) //`${i + startHour > 12 ? ${i + startHour}'pm' : 'am'}`)
    .map(h => (h === '0pm' ? 'Noon' : h))
    .map(h => (h === '12pm' ? 'Midnight' : h))
  return (
    <VRulerWrapper>
      {hours.map((hour, i) => (
        <Hour key={i}>{hour}</Hour>
      ))}
    </VRulerWrapper>
  )
})
