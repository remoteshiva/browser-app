import React, { useState } from 'react'
import { Shiva as ShivaModel } from '../../store/shiva/types'
import  { ShivaItemWrapper, ShivaDates } from './styles'
import Dropdown from './dropdown'


interface ShivaProps extends ShivaModel {}

const ShivaItem = (props: ShivaProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  return (
    <ShivaItemWrapper>
      <div className='w-full' style={{height: '33px', overflow: 'visible'}}>
        <Dropdown/>
      </div>
      <div className="flex content-end flex-wrap h-48">
        <p>{props.nameOfDeceased}</p>
        <ShivaDates>{props.startDate.format('L')} - {props.endDate.format('L')}</ShivaDates>
      </div>
    </ShivaItemWrapper>
    )
}
export default ShivaItem