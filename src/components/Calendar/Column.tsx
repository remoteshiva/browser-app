import React, { useState, useRef, memo } from 'react';
import { useDispatch } from 'react-redux';
import {
  addMinutes,
  isAfter,
  isBefore,
  getDate,
  format,
  roundToNearestMinutes,
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

interface Props extends CalendarContextProps {
  day: Date;
  visits: VisitMap;
  mourners: Mourner[];
}

const Column = memo(
  ({ mode, role, day, visits, mourners, endHour, startHour }: Props) => {
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
          setCurrentY(y + 1);
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
        const node = newEventRef.current;
        if (node) {
          const startTime = pixelToDate(startY);
          const endTime = pixelToDate(currentY);
          const visit = initializeVisit({ startTime, endTime });
          dispatch(addVisit(visit));
        }
        setDragging(false);
        setStartY(0);
        setCurrentY(0);
      }
    };
    const handleVisitChange = (
      visitId: VisitId,
      top: Pixels,
      height: Pixels
    ) => {
      const calendarTopTime = pixelToDate(1);
      const calendarBottomTime = pixelToDate(599);
      const topAsDate = pixelToDate(top);
      const bottomAsDate = pixelToDate(height);

      let startTime;
      let endTime;

      // base case: times are within calendar bounds
      if (
        isAfter(topAsDate, calendarTopTime) &&
        isBefore(bottomAsDate, calendarBottomTime)
      ) {
        startTime = pixelToDate(top);
        endTime = pixelToDate(height);
      }
      // if start time is before start of day,
      // adjust start time to start of day
      else if (isBefore(topAsDate, calendarTopTime)) {
        startTime = calendarTopTime; // Beginning of day
        endTime = pixelToDate(height);
      } else if (top + height > 599) {
        startTime = pixelToDate(599 - (top + height));
        endTime = pixelToDate(599);
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
