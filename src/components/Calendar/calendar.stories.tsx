import React from 'react'
import { Story } from '@storybook/react'
import { VisitMap } from '../../store/shiva/types'
import Calendar, { Props } from './'

const startDate = new Date('2020-03-12')
const endDate = new Date('2020-03-19')
const visits: VisitMap = {
  '1':{
    id: '1',
    startTime: new Date('2020-03-12 10:30'),
    endTime: new Date('2020-03-12 13:45'),
    visitors: [
      {name:'Brian Fantana', email: 'brian@channel4.com', time: new Date('2020-03-12 10:30')},
      {name:'Brick Tamland', email: 'brick@channel4.com', time: new Date('2020-03-12 11:30')},
      {name:'David Koechner', email: 'david@channel4.com', time: new Date('2020-03-12 12:30')}
    ],
    missingMourners: [],
  },
  '2':{
    id: '2',
    startTime: new Date('2020-03-13 9:30'),
    endTime: new Date('2020-03-13 11:30'),
    visitors: [
      {name:'Brian Fantana', email: 'brian@channel4.com', time: new Date('2020-03-13 9:30')},
      {name:'Brick Tamland', email: 'brick@channel4.com', time: new Date('2020-03-13 9:45')},
      {name:'David Koechner', email: 'david@channel4.com', time: new Date('2020-03-13 9:30')}
    ],
    missingMourners: [],
  },
  '3':{
    id: '3',
    startTime: new Date('2020-03-13 14:30'),
    endTime: new Date('2020-03-13 17:30'),
    visitors: [
      {name:'Brian Fantana', email: 'brian@channel4.com', time: new Date('2020-03-13 14:30')},
      {name:'Brick Tamland', email: 'brick@channel4.com',time: new Date('2020-03-13 14:30')},
      {name:'David Koechner', email: 'david@channel4.com',time: new Date('2020-03-13 14:30')}
    ],
    missingMourners: [],
  },
  '4':{
    id: '4',
    startTime: new Date('2020-03-14 11:00'),
    endTime: new Date('2020-03-14 17:00'),
    visitors: [
      {name:'Brian Fantana', email: 'brian@channel4.com', time: new Date('2020-03-14 11:00')},
      {name:'Brick Tamland', email: 'brick@channel4.com', time: new Date('2020-03-14 11:00')},
      {name:'David Koechner', email: 'david@channel4.com', time: new Date('2020-03-14 11:00')}
    ],
    missingMourners: [],
  },
  '5':{
    id: '5',
    startTime: new Date('2020-03-14 15:30'),
    endTime: new Date('2020-03-14 21:45'),
    visitors: [
      {name:'Brian Fantana', email: 'brian@channel4.com', time: new Date('2020-03-14 15:30')},
    ],
    missingMourners: [],
  }
}

export default {
  title: 'Calendar',
  component: Calendar,
}

// const Template: Story<Props> = (props) => {
//   return <Calendar {...props}/>
// }

// export const EmptyCalendar = Template.bind({})
// EmptyCalendar.args = {
//   mode: 'View', startDate, endDate, visits: {}
// }

// export const BusyCalendar = Template.bind({})
// BusyCalendar.args = {
//   mode: 'View', startDate, endDate, visits
// }

// export const UserCalendar = Template.bind({})
// UserCalendar.args = {
//   mode: 'Edit', startDate, endDate, visits: {}
// }
// // // limit the size of the calendar to activate inner scroll
// export const WithScroll=  Template.bind({})
// WithScroll.args = {
//   height: '450px', mode: 'Edit', startDate, endDate, visits: {}
// }
