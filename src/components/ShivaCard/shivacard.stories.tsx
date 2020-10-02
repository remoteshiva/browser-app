import React from 'react'
import ShivaItem from './item'
import { initializeShiva } from '../../store/shiva/types'

export default {
  title: 'ShivaItem',
  component: ShivaItem,
}

const shiva = initializeShiva({ nameOfDeceased: 'Brian Fantana' })
export const Item = () => (
  <ul>
    <ShivaItem {...shiva} />
  </ul>
)
