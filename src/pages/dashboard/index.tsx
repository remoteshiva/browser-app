import React, { useEffect } from 'react'
import { connect, useDispatch } from 'react-redux'
import styled from 'styled-components'
import { AppState } from '../../store'
import { ShivaState } from '../../store/shiva/types'
import { fetchShivas } from '../../store/shiva/actions'
import ShivaList from '../../components/ShivaCard/list'


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

const Dashboard = (props:DashboardProps) => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchShivas())
    },[])
    return props.shivaState.loading ? (<div>loading ...</div>) : (
        <Wrapper>
            <h1>My Shivas</h1>
            <ShivaList shivas={props.shivaState.shivas}/>
        </Wrapper>
    )
}

const mapStateToProps = (state: AppState) => ({
    shivaState: state.shiva,
})

export default connect(mapStateToProps, {fetchShivas})(Dashboard)