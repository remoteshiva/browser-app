import React from 'react'
import { Shiva as ShivaModel } from '../../store/shiva/types'
import { ShivaListWrapper } from './styles'
import ShivaItem from './item'
import NewShivaItem from './newItem'

interface Props {
    shivas: ShivaModel[]
}

const ShivaList = ({shivas}:Props) => (
    <ShivaListWrapper>
        {shivas.map((item) => (<ShivaItem key={item.id} {...item}/>))}
        <NewShivaItem onClick={()=>(console.log('create a new one'))}/>
    </ShivaListWrapper>
)

export default ShivaList