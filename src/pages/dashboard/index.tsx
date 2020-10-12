import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { RootState } from '../../store'
import { fetchMyShivas, deleteShiva } from '../../services/shiva'
import ShivaList from '../../components/ShivaCard/list'
import Loading from '../../components/Loading'
import { selectShiva } from '../../store/shiva/actions'

const Wrapper = styled.div`
  padding-top: 75px;
  padding-left: 100px;
  padding-right: 100px;
  color: ${props => props.theme.colors.heavyMetal};
  h1 {
    font-family: Lora;
    font-weight: 200;
    font-size: 56px;
  }
`

const Dashboard = () => {
  const { loading, entities, shivas } = useSelector((state: RootState) => state.shiva)
  return loading ? (
    <Loading />
  ) : (
    <Wrapper>
      <h1>My Shivas</h1>
      <ShivaList entities={entities} shivas={shivas} />
    </Wrapper>
  )
}

export default Dashboard
