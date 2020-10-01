import React from 'react'
import moment from 'moment'
import Calendar from './'
import { initializeShiva, Shiva } from '../../store/shiva/types'

const startDate = moment('2020-03-12')
const endDate = moment('2020-03-19')
const visits = [
  {
    date: moment('2020-03-12 10:30'),
    length: 4,
    visitors: ['Brian Fantana', 'Brick Tamland', 'David Koechner'],
    mourners: [0, 1],
  },
  {
    date: moment('2020-03-13 9:30'),
    length: 4,
    visitors: ['Brian Fantana', 'Brick Tamland', 'David Koechner'],
    mourners: [0, 1],
  },
  {
    date: moment('2020-03-13 14:30'),
    length: 4,
    visitors: ['Brian Fantana', 'Brick Tamland', 'David Koechner'],
    mourners: [0, 1],
  },
  {
    date: moment('2020-03-14 11:00'),
    length: 2,
    visitors: ['Brian Fantana', 'Brick Tamland', 'David Koechner'],
    mourners: [1],
  },
  {
    date: moment('2020-03-14 15:30'),
    length: 2,
    visitors: ['Brian Fantana'],
    mourners: [1],
  },
]

export default {
  title: 'Calendar',
  component: Calendar,
}

export const EmptyCalendar = () => <Calendar editMode={false} startDate={startDate} visits={[]} />

export const BusyCalendar = () => <Calendar editMode={false} startDate={startDate} visits={visits} />

export const UserCalendar = () => <Calendar editMode={true} startDate={startDate} visits={[]} />

// limit the size of the calendar to activate inner scroll
export const WithScroll = () => <Calendar height={'450px'} editMode={false} startDate={startDate} visits={visits} />
