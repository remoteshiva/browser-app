import React, { FunctionComponent, createContext } from 'react';
import { Role } from '../../store/shiva/types';
import { CalendarMode } from '../types';
export interface CalendarContextProps {
  startHour: number;
  endHour: number;
  mode: CalendarMode;
  role: Role;
}

const CalendarContext = createContext<CalendarContextProps>({
  startHour: 0,
  endHour: 0,
  mode: 'View',
  role: 'Visitor',
});

type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

export const CalendarProvider: FunctionComponent<CalendarContextProps> = ({
  startHour,
  endHour,
  mode,
  role,
  children,
}) => (
  <CalendarContext.Provider value={{ startHour, endHour, mode, role }}>
    {children}
  </CalendarContext.Provider>
);

export const withCalendarContext = <P extends CalendarContextProps>(
  WrapperComponent: React.ComponentType<P>
): FunctionComponent<Omit<P, keyof CalendarContextProps>> => props => (
  <CalendarContext.Consumer>
    {({ startHour, endHour, mode, role }) => (
      <WrapperComponent
        {...(props as P)}
        mode={mode}
        role={role}
        startHour={startHour < endHour ? startHour : endHour}
        endHour={endHour > startHour ? endHour : startHour}
      />
    )}
  </CalendarContext.Consumer>
);
