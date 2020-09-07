import React from 'react'
import { useDispatch } from 'react-redux'
import { push } from 'connected-react-router'
import { Shiva as ShivaModel } from '../../store/shiva/types'
import { ShivaListWrapper } from './styles'
import ShivaItem from './item'
import NewShivaItem from './newItem'

interface Props {
  entities: {[key:string]: ShivaModel}
  shivas: string[]
}

const ShivaList = ({entities, shivas}:Props) => {
  const dispatch = useDispatch()
  return(
    <ShivaListWrapper>
        {shivas.map((shivaId) => (<ShivaItem key={shivaId} {...entities[shivaId]}/>))}
        <NewShivaItem onClick={() => dispatch(push('/newshiva'))}/>
    </ShivaListWrapper>
  )
}

export default ShivaList