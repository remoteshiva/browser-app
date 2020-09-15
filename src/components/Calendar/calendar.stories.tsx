import React from "react"
import moment from 'moment'
import Calendar from "./"
import { createEmptyShiva, Shiva } from '../../store/shiva/types'

// this is just a fixture
const shiva:Shiva = {
  _id: '0',
  nameOfDeceased: 'Ron Burgundy',
  startDate: moment('2020-03-12'),
  endDate: moment('2020-03-19'),
  mourners: [
    {
      name: 'Silvia Burdundy',
      relationship: 'Mother'
    },{
      name: 'Veronica Cornerstone',
      relationship: 'Love interest'
    }
  ],
  mournerKey: '',
  visitorKey: '',
  titleImage: null,
  visits: [
    {
      date: moment('2020-03-12 10:30'),
      length: 4,
      visitors: ['Brian Fantana', 'Brick Tamland', 'David Koechner'],
      mourners: [0, 1]
    },{
      date: moment('2020-03-13 9:30'),
      length: 4,
      visitors: ['Brian Fantana', 'Brick Tamland', 'David Koechner'],
      mourners: [0, 1]
    },{
      date: moment('2020-03-13 14:30'),
      length: 4,
      visitors: ['Brian Fantana', 'Brick Tamland', 'David Koechner'],
      mourners: [0, 1]
    },{
      date: moment('2020-03-14 11:00'),
      length: 2,
      visitors: ['Brian Fantana', 'Brick Tamland', 'David Koechner'],
      mourners: [1]
    },{
      date: moment('2020-03-14 15:30'),
      length: 2,
      visitors: ['Brian Fantana'],
      mourners: [1]
    }
  ]
}

export default {
  title: 'Calendar',
  component: Calendar
}

export const EmptyCalendar = () => (<Calendar editMode={false}  shiva={createEmptyShiva()}/>)
  
export const BusyCalendar = () => (<Calendar editMode={false} shiva={shiva}/>)

export const UserCalendar = () => (<Calendar editMode={true} shiva={createEmptyShiva()}/>)

  