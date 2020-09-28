import React, { useEffect } from 'react'
import { connect, useDispatch } from 'react-redux'
import styled from 'styled-components'
import { AppState } from '../../store'
import { ShivaState } from '../../store/shiva/types'
import { fetchShivas, deleteShiva } from '../../store/shiva/actions'
import ShivaList from '../../components/ShivaCard/list'
import Spinner from '../../components/Spinner'


interface DashboardProps {
    shivaState: ShivaState
    fetchShivas: any 
}

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

const Loading = styled.div`
  width: 100%;
  text-align: center;
  margin-top: 50px;
  p {
    color: ${props => props.theme.colors.doveGray};
    margin-top: 20px;
    font-family: 'Lora';
    font-size: 34px;
  }
`

const Dashboard = (props:DashboardProps) => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchShivas())
  },[])

  const renderLoading = () => (
    <Loading>
      <Spinner size={20} thickness={1.4}/>
      <p>Loading, Please wait</p>
    </Loading>
  )
  
  return props.shivaState.loading ? renderLoading() : (
    <Wrapper>
        <h1>My Shivas</h1>
        <ShivaList 
            entities={props.shivaState.entities} 
            shivas={props.shivaState.shivas}
        />
    </Wrapper>
  )
}

const mapStateToProps = (state: AppState) => ({
    shivaState: state.shiva,
})

export default connect(mapStateToProps, {fetchShivas, deleteShiva})(Dashboard)