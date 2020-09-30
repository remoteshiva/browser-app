import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { AppState } from '../../store'
import ShivaLayout from '../../components/ShivaLayout'
import Loading from '../../components/Loading'
import { selectShiva } from '../../store/shiva/types'
import { fetchShivaByMournerKey } from '../../store/shiva/actions'

interface RoutingProps {
  key: string
}

interface Props {
  
}
const MournerPage = () => {
  const { key } = useParams<RoutingProps>()
  const { loading, entities, mournerKeys, selectedShiva } = useSelector((state: AppState) => state.shiva);
  const dispatch = useDispatch()

  useEffect(() => {
    if (key in mournerKeys){
      dispatch(selectShiva(mournerKeys[key]))
    } else {
      dispatch(fetchShivaByMournerKey(key))
    }
  }, [])

  return loading || !selectedShiva ? <Loading/> : (
    <ShivaLayout
      role='Mourner'
      shiva={entities[selectedShiva]}
    />
  )
}

export default MournerPage