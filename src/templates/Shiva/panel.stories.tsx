import React from 'react'
import MealsPanel from './Meals'
import SchedulePanel from './Schedule'
import MournersPanel from './Mourners'
import { Shiva, Role } from '../../store/shiva/types'
import { initializeShiva } from '../../store/shiva/helpers'
import { Direction } from './styles'



export default {
  title: 'Shiva Panel',
  component: null,
}

const shiva = initializeShiva({id: '1'})

// export const Meals = () => <MealsPanel shiva={shiva} darkMode={false} role='Editor' direction={Direction.column} />

// export const Schedule = ()=> <SchedulePanel shiva={shiva} darkMode={false} role='Editor' direction={Direction.column} />

// export const Mourners = ()=> <MournersPanel shiva={shiva} darkMode={false} role='Editor' direction={Direction.column} />
