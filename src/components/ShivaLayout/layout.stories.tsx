import React from 'react'
import ShivaLayout from './'
import { shivas } from '../../mock-data'

export default {
  title: 'Shiva Layout',
  component: ShivaLayout,
}

export const Editor = () => <ShivaLayout shiva={shivas[0]} role="Editor" />

export const Mourner = () => <ShivaLayout shiva={shivas[1]} role="Mourner" />

export const Visitor = () => <ShivaLayout shiva={shivas[2]} role="Visitor" />
