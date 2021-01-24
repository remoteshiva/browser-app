import React from 'react';
import { eachDayOfInterval } from 'date-fns';
import { HRulerWrapper, VRulerWrapper, Day, Hour } from './styles';
import { withCalendarContext, CalendarContextProps } from './context';

interface HorizontalRulerProps extends CalendarContextProps {
  startDate: Date;
  endDate: Date;
}
export const HorizontalRuler = withCalendarContext(
  ({ startDate, endDate }: HorizontalRulerProps) => {
    const days = eachDayOfInterval({ start: startDate, end: endDate });
    return (
      <HRulerWrapper numOfColumns={days.length || 7}>
        {days.map((day, i) => (
          <Day key={i}>
            {day.toLocaleDateString(undefined, {
              weekday: 'short',
              month: 'short',
              day: 'numeric',
            })}
          </Day>
        ))}
      </HRulerWrapper>
    );
  }
);

interface VerticalRulerProps extends CalendarContextProps {}

export const VerticalRuler = withCalendarContext(
  ({ startHour, endHour }: VerticalRulerProps) => {
    let adjustedStartHour = 0;
    let adjustedEndHour = 0;
    if (startHour > endHour) {
      adjustedEndHour = startHour;
      adjustedStartHour = endHour;
    } else {
      adjustedStartHour = startHour;
      adjustedEndHour = endHour;
    }
    const hours = Array.from(
      { length: adjustedEndHour - adjustedStartHour + 1 },
      (_, i) =>
        i + adjustedStartHour > 11
          ? `${i + adjustedStartHour - 12}pm`
          : `${i + adjustedStartHour}am`
    ) //`${i + startHour > 12 ? ${i + startHour}'pm' : 'am'}`)
      .map(h => (h === '0pm' ? 'Noon' : h))
      .map(h => (h === '12pm' ? 'Midnight' : h));
    return (
      <VRulerWrapper>
        {hours.map((hour, i) => (
          <Hour key={i}>{hour}</Hour>
        ))}
      </VRulerWrapper>
    );
  }
);
