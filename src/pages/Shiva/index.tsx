import React, { useEffect } from 'react'
import { connect, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import moment from 'moment'
import { Shiva, Mourner, createEmptyShiva } from '../../store/shiva/types'
import { fetchShivaById } from '../../store/shiva/actions'
import { AppState } from '../../store'
import Calendar from '../../components/Calendar'
import { BlankCard } from './cards'
import { 
  EditShivaWrapper,
  CardWrapper,
  Direction,
  FlexContent,
  SideBar,
  Button,
  TitleImage,
  ShivaTitle,
  MournerName,
  Relationship
} from './styles'

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
  return loading && !shiva ? (<div>loading ...</div>) : (
    <EditShivaWrapper>
      <FlexContent minWidth={700}>
        <CardWrapper>
          <TitleImage style={{backgroundImage: `url(${shiva?.titleImage?.toString()})`}}/>
          <FlexContent>
            <ShivaTitle>Shiva for {shiva?.nameOfDeceased} Z"L</ShivaTitle>
              <p>{shiva?.message}</p>
          </FlexContent>
        </CardWrapper>
        <CardWrapper direction={Direction.column}>
          <h2>Attend the Shiva</h2>
          <h4>Click on a slot to see who is planning to attend and to indicate when you plan to stop by.</h4>
          {/* <Calendar editMode={false} shiva={shiva ? shiva : createEmptyShiva()}/> */}
        </CardWrapper>
        <BlankCard>
          <h2>About</h2>
        </BlankCard>
      </FlexContent>
      <SideBar>
        <Button>Invite visitors</Button>
        <BlankCard>
          <h2>Video link</h2>
        </BlankCard>
        <CardWrapper direction={Direction.column}>
          <h2>Mourners</h2>
          <ul>
            {shiva?.mourners.map((m, i) => (
              <li style={{display: 'flex', flexDirection: 'row'}} key={i}><MournerName>{m.name}</MournerName><Relationship>{m.relationship}</Relationship></li>
            ))}
          </ul>
          </CardWrapper>
        <CardWrapper direction={Direction.column}>
          <h2>Minian times</h2>
        </CardWrapper>
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