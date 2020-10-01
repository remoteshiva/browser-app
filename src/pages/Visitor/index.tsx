import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { AppState } from '../../store'
import ShivaLayout from '../../components/ShivaLayout'
import Loading from '../../components/Loading'
import { selectShiva } from '../../store/shiva/types'
import { fetchShivaByVisitorKey } from '../../store/shiva/actions'

interface RoutingProps {
  key: string
}

interface Props {}
const VisitorPage = () => {
  const { key } = useParams<RoutingProps>()
  const { loading, entities, visitorKeys, selectedShiva } = useSelector((state: AppState) => state.shiva)
  const dispatch = useDispatch()

  useEffect(() => {
    if (key in visitorKeys) {
      dispatch(selectShiva(visitorKeys[key]))
    } else {
      dispatch(fetchShivaByVisitorKey(key))
    }
  }, [])

  return loading || !selectedShiva ? <Loading /> : <ShivaLayout role="Visitor" shiva={entities[selectedShiva]} />
}

export default VisitorPage
