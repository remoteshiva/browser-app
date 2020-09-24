import React, {FunctionComponent, createContext } from "react";

export interface CalendarContextProps {
  startHour: number
  endHour: number
}

const CalendarContext = createContext<CalendarContextProps>({startHour: 0, endHour: 0});

type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

export const CalendarProvider: FunctionComponent<CalendarContextProps> = ({startHour, endHour, children}) => (
  <CalendarContext.Provider value={{startHour, endHour}}>{children}</CalendarContext.Provider>
);

export const withCalendarContext = <P extends CalendarContextProps>(
  WrapperComponent: React.ComponentType<P>,
): FunctionComponent<Omit<P, keyof CalendarContextProps>> => props => (
    <CalendarContext.Consumer>
      {({startHour, endHour}) => <WrapperComponent {...props as P} startHour={startHour} endHour={endHour}/>}
    </CalendarContext.Consumer>
);
