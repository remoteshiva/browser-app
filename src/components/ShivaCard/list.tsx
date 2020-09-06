import React from 'react'
import { useDispatch } from 'react-redux'
import { push } from 'connected-react-router'
import { Shiva as ShivaModel } from '../../store/shiva/types'
import { ShivaListWrapper } from './styles'
import ShivaItem from './item'
import NewShivaItem from './newItem'

interface Props {
    shivas: ShivaModel[]
}

const ShivaList = ({shivas}:Props) => {
  const dispatch = useDispatch()
  return(
    <ShivaListWrapper>
        {shivas.map((item) => (<ShivaItem key={item.id} {...item}/>))}
        <NewShivaItem onClick={() => dispatch(push('/newshiva'))}/>
    </ShivaListWrapper>
  )
}

export default ShivaList