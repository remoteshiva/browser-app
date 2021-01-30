import React, { useState, useRef, memo } from 'react';
import { useDispatch } from 'react-redux';
import {
  addMinutes,
  isAfter,
  isBefore,
  isEqual,
  getDate,
  format,
  roundToNearestMinutes,
  addHours
} from 'date-fns';
import { VisitMap, Mourner, VisitId } from '../../store/shiva/types';
import { addVisit, updateVisit } from '../../store/shiva/actions';
import { initializeVisit } from '../../store/shiva/helpers';
import { withCalendarContext, CalendarContextProps } from './context';
import { Visit, NewVisit } from '../Visit';
import {
  ColumnWrapper,
  PIXELS_PER_MINUTE,
  PIXELS_PER_HOUR,
  Pixels,
} from './styles';

const noop = () => {};

const pixelToMinutes = (offset: number) => (pixel: number) =>
  offset + pixel / PIXELS_PER_MINUTE;
interface ColumnProps extends CalendarContextProps {
  day: Date;
  visits: VisitMap;
  mourners: Mourner[];
}

const Column = memo(
  ({ mode, role, day, visits, mourners, endHour, startHour }: ColumnProps) => {
    const dispatch = useDispatch();
    const [dragging, setDragging] = useState(false);
    const [startY, setStartY] = useState(0);
    const [currentY, setCurrentY] = useState(0);

    const node = useRef<HTMLDivElement>(null);
    const newEventRef = useRef<HTMLDivElement>(null);
    const refBusy = useRef(false);
    const height = (endHour - startHour) * PIXELS_PER_HOUR + 1;

    const pixelToDate = (pixels: number) => {
      return roundToNearestMinutes(
        addMinutes(day, pixelToMinutes(startHour * 60)(pixels)),
        { nearestTo: 15 }
      );
    };
    const pixelToTimeDisplay = (pixels: number) => {
      return format(pixelToDate(pixels), 'p');
    };
    const handleMouseDown = (event: React.MouseEvent) => {
      if (event.target === event.currentTarget && !refBusy.current) {
        event.persist();
        window.requestAnimationFrame(() => {
          const y = event.nativeEvent.offsetY;
          setStartY(y);
          setCurrentY(1);
          setDragging(true);
          const node = newEventRef.current;
          if (node) {
            node.style.top = `${y}px`;
            node.style.height = '0px';
            node.style.cursor = 'row-resize';
          }
          refBusy.current = false;
        });
        refBusy.current = true;
      }
    };
    const handleMouseMove = (event: React.MouseEvent) => {
      if (!refBusy.current && dragging) {
        event.persist();
        window.requestAnimationFrame(() => {
          const node = newEventRef.current;
          if (node) {
            const rect = node.getBoundingClientRect();
            const y = event.clientY - rect.top;
            setCurrentY(y);
            node.style.height = `${y}px`;
          }
          refBusy.current = false;
        });
        refBusy.current = true;
      }
    };
    const handleMouseUp = (event: React.MouseEvent) => {
      if (dragging) {
        event.persist();
        const node = newEventRef.current;
        if (node) {
          const startTime = pixelToDate(startY);
          let endTime = pixelToDate(startY + currentY);
          if (isEqual(startTime, endTime)) {
            // case: user clicked on the calendar without dragging
            endTime = addHours(endTime, 1);
          }
          if (isBefore(startTime, endTime)) {
            const visit = initializeVisit({ startTime, endTime });
            dispatch(addVisit(visit));
          } else {
            console.log(`Ignoring create visit with times in reverse`);
          }
        }
        setDragging(false);
        setStartY(0);
        setCurrentY(0);
      }
    };
    const handleVisitChange = (
      visitId: VisitId,
      top: Pixels,
      bottom: Pixels
    ) => {
      const calendarTopTime = pixelToDate(0);
      const calendarBottomTime = pixelToDate(961);
      const topAsDate = pixelToDate(top);
      const bottomAsDate = pixelToDate(bottom);

      let startTime;
      let endTime;

      // base case: times are within calendar bounds
      const topIsEqualToOrAfter = isAfter(topAsDate, calendarTopTime) || isEqual(topAsDate, calendarTopTime)
      const bottomIsEqualToOrBefore = isBefore(bottomAsDate, calendarBottomTime) || isEqual(bottomAsDate, calendarBottomTime)
      if (topIsEqualToOrAfter && bottomIsEqualToOrBefore) {
        startTime = pixelToDate(top);
        endTime = pixelToDate(bottom);
      }
      // if start time is before start of day,
      // adjust start time to start of day
      else if (isBefore(topAsDate, calendarTopTime)) {
        startTime = calendarTopTime; // Beginning of day
        endTime = pixelToDate(bottom);
      } else if (bottom > 961) {
        startTime = pixelToDate(961 - (bottom - top));
        endTime = pixelToDate(961);
      } else {
        console.warn(`Could not determine startTime and endTime. Cancelling this update.`)
        return;
      }
      // const endTime = pixelToDate(bottom);
      const partialVisit = { startTime, endTime };
      dispatch(updateVisit({ visitId, partialVisit }));
    };
    return (
      <ColumnWrapper
        ref={node}
        height={`${height}px`}
        mode={mode}
        onMouseDown={mode !== 'View' ? handleMouseDown : noop}
        onMouseMove={mode !== 'View' ? handleMouseMove : noop}
        onMouseUp={mode !== 'View' ? handleMouseUp : noop}
      >
        {Object.keys(visits)
          .filter(id => getDate(visits[id].startTime) === getDate(day))
          .map(id => (
            <Visit
              key={id}
              mode={mode}
              role={role}
              hourOffset={startHour}
              day={day}
              visit={visits[id]}
              mourners={mourners.filter(
                m => m.name !== '' && m.relationship !== ''
              )} // filter empty mourners
              onVisitChange={handleVisitChange}
            />
          ))}
        {dragging ? (
          <NewVisit
            ref={newEventRef}
            start={pixelToTimeDisplay(startY)}
            end={pixelToTimeDisplay(startY + currentY)}
          />
        ) : null}
      </ColumnWrapper>
    );
  }
);

export default withCalendarContext(Column);
