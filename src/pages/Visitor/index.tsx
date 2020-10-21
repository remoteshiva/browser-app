import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { push } from 'connected-react-router'
import { useParams } from 'react-router-dom'
import * as Routes from '../../routes'
import { RootState, AppDispatch } from '../../store'
import ShivaTemplate from '../../templates/Shiva'
import Loading from '../../components/Loading'
import { selectShiva } from '../../store/shiva/actions'
import { fetchShivaByKey } from '../../services/shiva'

interface RoutingProps {
  key: string
}

interface Props {}
const VisitorPage = () => {
  const { key } = useParams<RoutingProps>()
  const { loading, entities, selectedShiva } = useSelector((state: RootState) => state.shiva)
  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    const fetch = async () => {
      try {
        const { id } = await dispatch(fetchShivaByKey(key, 'visitor'))
        dispatch(selectShiva(id))
      } catch (error) {
        dispatch(push(Routes.NOT_FOUND))
      }
    }
    fetch()
  }, [dispatch, key])

  return loading || !selectedShiva ? <Loading /> : <ShivaTemplate role="Visitor" shiva={entities[selectedShiva]} />
}

export default VisitorPage
