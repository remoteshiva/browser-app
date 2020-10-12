import React from 'react'
import ShivaItem from './item'
import { initializeShiva, Shiva } from '../../store/shiva/types'

export default {
  title: 'ShivaItem',
  component: ShivaItem,
}

const newShiva = initializeShiva({ nameOfDeceased: 'Brian Fantana' })
const shiva: Shiva = { ...newShiva, id: '__some_id__' }
export const Item = () => (
  <ul>
    <ShivaItem {...shiva} />
  </ul>
)
