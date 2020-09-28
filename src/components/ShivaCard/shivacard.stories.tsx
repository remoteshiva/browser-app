import React from "react"
import ShivaItem from "./item"
import { createEmptyShiva } from '../../store/shiva/types'


export default {
  title: 'ShivaItem',
  component: ShivaItem
}

const shiva = createEmptyShiva()
shiva.nameOfDeceased = 'Brian Fantana'
export const Item = () => (
  <ul>
    <ShivaItem {...shiva}/>
  </ul>
)
