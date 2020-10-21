import React from 'react'
import Calendar from './'

const startDate = new Date('2020-03-12')
const endDate = new Date('2020-03-19')
const visits = [
  {
    date: new Date('2020-03-12 10:30'),
    length: 4,
    visitors: ['Brian Fantana', 'Brick Tamland', 'David Koechner'],
    mourners: [0, 1],
  },
  {
    date: new Date('2020-03-13 9:30'),
    length: 4,
    visitors: ['Brian Fantana', 'Brick Tamland', 'David Koechner'],
    mourners: [0, 1],
  },
  {
    date: new Date('2020-03-13 14:30'),
    length: 4,
    visitors: ['Brian Fantana', 'Brick Tamland', 'David Koechner'],
    mourners: [0, 1],
  },
  {
    date: new Date('2020-03-14 11:00'),
    length: 2,
    visitors: ['Brian Fantana', 'Brick Tamland', 'David Koechner'],
    mourners: [1],
  },
  {
    date: new Date('2020-03-14 15:30'),
    length: 2,
    visitors: ['Brian Fantana'],
    mourners: [1],
  },
]

export default {
  title: 'Calendar',
  component: Calendar,
}

// export const EmptyCalendar = () => <Calendar editMode={false} startDate={startDate} endDate={endDate} visits={[]} />

// export const BusyCalendar = () => <Calendar editMode={false} startDate={startDate} endDate={endDate} visits={visits} />

// export const UserCalendar = () => <Calendar editMode={true} startDate={startDate} endDate={endDate} visits={[]} />

// // limit the size of the calendar to activate inner scroll
// export const WithScroll = () => <Calendar height={'450px'} editMode={false} startDate={startDate} endDate={endDate} visits={visits} />
