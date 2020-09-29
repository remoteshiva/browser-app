import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { AppState } from '../../store'
import { fetchShivas, deleteShiva } from '../../store/shiva/actions'
import ShivaList from '../../components/ShivaCard/list'
import Loading from '../../components/Loading'
import { selectShiva } from '../../store/shiva/types'


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
  const dispatch = useDispatch()
  const { loading, entities, shivas } = useSelector((state: AppState) => state.shiva);

  useEffect(() => {
    dispatch(selectShiva(null))
    if(!shivas.length){
      dispatch(fetchShivas())
    }
  },[dispatch, shivas.length])
  
  return loading ? <Loading/> : (
    <Wrapper>
      <h1>My Shivas</h1>
      <ShivaList 
        entities={entities} 
        shivas={shivas}
      />
    </Wrapper>
  )
}

export default Dashboard