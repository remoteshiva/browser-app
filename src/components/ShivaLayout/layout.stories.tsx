import React from 'react'
import ShivaLayout from './'
import { shivas } from '../../mock-data'
import { initializeShiva } from '../../store/shiva/types'

export default {
  title: 'Shiva Layout',
  component: ShivaLayout,
}

export const Editor = () => <ShivaLayout shiva={shivas[2]} role="Editor" />

export const EditorMinimal = () => <ShivaLayout shiva={initializeShiva({ nameOfDeceased: 'Wes Mantooth' })} role="Editor" />

export const Mourner = () => <ShivaLayout shiva={shivas[1]} role="Mourner" />

export const Visitor = () => <ShivaLayout shiva={shivas[0]} role="Visitor" />
