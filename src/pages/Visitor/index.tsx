import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { RootState } from '../../store'
import ShivaLayout from '../../components/ShivaLayout'
import Loading from '../../components/Loading'
import { selectShiva } from '../../store/shiva/actions'
import { fetchShivaByVisitorKey } from '../../services/shiva'

interface RoutingProps {
  key: string
}

interface Props {}
const VisitorPage = () => {
  const { key } = useParams<RoutingProps>()
  const { loading, entities, visitorKeys, selectedShiva } = useSelector((state: RootState) => state.shiva)
  const dispatch = useDispatch()

  useEffect(() => {
    if (key in visitorKeys) {
      dispatch(selectShiva(visitorKeys[key]))
    } else {
      dispatch(fetchShivaByVisitorKey(key))
    }
  }, [dispatch, key, visitorKeys])

  return loading || !selectedShiva ? <Loading /> : <ShivaLayout role="Visitor" shiva={entities[selectedShiva]} />
}

export default VisitorPage
