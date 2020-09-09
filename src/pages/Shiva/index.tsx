import React, { useEffect } from 'react'
import { connect, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { Shiva } from '../../store/shiva/types'
import { fetchShivaById } from '../../store/shiva/actions'
import { AppState } from '../../store'
import { BlankCard } from './cards'
import { EditShivaWrapper, Content, SideBar, Button, DeceasedImage } from './styles'

interface RoutingProps {
  id: string
}

interface Props {
  loading: boolean,
  shiva: Shiva | null
  fetchShivaById: any
}

const EditShiva = ({loading, shiva}: Props) => {
  const { id } = useParams<RoutingProps>()
  const dispatch = useDispatch()

  useEffect(() => {
      dispatch(fetchShivaById(id))
  }, [])
  return loading ? (<div>loading ...</div>) : (
    <EditShivaWrapper>
      <Content>
        <BlankCard>
          <DeceasedImage>
            <img src='' alt='deceased image'/>
          </DeceasedImage>
            <Content>Shiva for {shiva?.nameOfDeceased} Z"L</Content>
        </BlankCard>
        <BlankCard>
          <h2>Attend the Shiva</h2>
        </BlankCard>
        <BlankCard>
          <h2>About</h2>
        </BlankCard>
      </Content>
      <SideBar>
        <Button>Invite visitors</Button>
        <BlankCard>
          <h2>Video link</h2>
        </BlankCard>
        <BlankCard>
          <h2>Mourners</h2>
        </BlankCard>
        <BlankCard>
          <h2>Minian times</h2>
        </BlankCard>
        <BlankCard>
          <h2>Meal signups</h2>
        </BlankCard>
        <BlankCard>
          <h2>Memorial donations</h2>
        </BlankCard>
      </SideBar>
    </EditShivaWrapper>

  )
}


const mapStateToProps = (state: AppState) => ({
  loading: state.shiva.loading,
  shiva: state.shiva.selectedShiva ? state.shiva.entities[state.shiva.selectedShiva] || null : null
})

export default connect(mapStateToProps, {fetchShivaById})(EditShiva)