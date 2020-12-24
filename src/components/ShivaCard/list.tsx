import React from 'react'
import { useDispatch } from 'react-redux'
import { push } from 'connected-react-router'
import { Shiva } from '../../store/shiva/types'
import * as Routes from '../../routes'
import { ShivaListWrapper } from './styles'
import ShivaItem from './item'
import NewShivaItem from './newItem'

interface Props {
  entities: { [key: string]: Shiva }
  shivas: string[]
}

const ShivaList = ({ entities, shivas }: Props) => {
  const dispatch = useDispatch()
  return (
    <ShivaListWrapper>
      {shivas.map(shivaId => (
        <ShivaItem key={shivaId} {...entities[shivaId]} />
      ))}
      <NewShivaItem onClick={() => dispatch(push(Routes.NEW_SHIVA('1')))}/>
    </ShivaListWrapper>
  )
}

export default ShivaList
