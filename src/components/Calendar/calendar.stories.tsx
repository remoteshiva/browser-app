import React from "react"
import Calendar from "./"
import { createEmptyShiva } from '../../store/shiva/types'


export default {
  title: 'Calendar',
  component: Calendar
}

export const EmptyCalendar = () => (<Calendar shiva={createEmptyShiva()}/>)
  
  