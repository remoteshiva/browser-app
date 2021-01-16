import React from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import { RootState } from '../../store'
import ShivaList from '../../components/ShivaCard/list'
import Loading from '../../components/Loading'

const Wrapper = styled.div`
  padding-top: 75px;
  padding-left: 100px;
  padding-right: 100px;
  color: ${props => props.theme.colors.heavyMetal};
  h1 {
    font-family: Lora;
    font-weight: 200;
    font-size: 56px;
    padding-bottom: 3rem;
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
