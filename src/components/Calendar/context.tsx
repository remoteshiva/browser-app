import React, { FunctionComponent, createContext } from 'react'
import { CalendarMode } from '../types'
export interface CalendarContextProps {
  startHour: number
  endHour: number
  mode: CalendarMode
}

const CalendarContext = createContext<CalendarContextProps>({ startHour: 0, endHour: 0, mode: 'View' })

type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>

export const CalendarProvider: FunctionComponent<CalendarContextProps> = ({ startHour, endHour, mode, children }) => (
  <CalendarContext.Provider value={{ startHour, endHour, mode }}>{children}</CalendarContext.Provider>
)

export const withCalendarContext = <P extends CalendarContextProps>(WrapperComponent: React.ComponentType<P>): FunctionComponent<Omit<P, keyof CalendarContextProps>> => props => (
  <CalendarContext.Consumer>{({ startHour, endHour, mode }) => <WrapperComponent {...(props as P)} mode={mode} startHour={startHour} endHour={endHour} />}</CalendarContext.Consumer>
)
