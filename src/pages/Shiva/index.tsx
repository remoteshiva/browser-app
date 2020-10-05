import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { AppState } from '../../store'
import { fetchShivaById } from '../../store/shiva/actions'
import { selectShiva } from '../../store/shiva/types'
import ShivaLayout from '../../components/ShivaLayout'
import Loading from '../../components/Loading'

interface RoutingProps {
  id: string
}

const ShivaPage = () => {
  const { id } = useParams<RoutingProps>()
  const { loading, entities, selectedShiva } = useSelector((state: AppState) => state.shiva);
  const dispatch = useDispatch()
  
  useEffect(() => {
    if (id in entities){
      dispatch(selectShiva(id))
    } else {
      dispatch(fetchShivaById(id))
      dispatch(selectShiva(id))
    }
  }, [dispatch, entities, id])

  return loading || !selectedShiva || !(selectedShiva in entities) ? <Loading/> : (
    <ShivaLayout
      role='Editor'
      shiva={entities[selectedShiva]}
    />
  )
}

export default ShivaPage