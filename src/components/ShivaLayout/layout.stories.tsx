import React from 'react'
import ShivaLayout from './'
import { shivas } from '../../mock-data'

export default {
  title: 'Shiva Layout',
  component: ShivaLayout,
}

const shiva = shivas[2]

export const Editor = () => <ShivaLayout shiva={shiva} role="Editor" />

export const Mourner = () => <ShivaLayout shiva={shiva} role="Mourner" />

export const Visitor = () => <ShivaLayout shiva={shiva} role="Visitor" />
