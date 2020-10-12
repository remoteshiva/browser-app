import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { push } from 'connected-react-router'
import { useParams } from 'react-router-dom'
import * as Routes from '../../routes'
import { RootState, AppDispatch } from '../../store'
import ShivaLayout from '../../components/ShivaLayout'
import Loading from '../../components/Loading'
import { selectShiva } from '../../store/shiva/actions'
import { fetchShivaByKey } from '../../services/shiva'

interface RoutingProps {
  key: string
}

const MournerPage = () => {
  const { key } = useParams<RoutingProps>()
  const { loading, entities, selectedShiva } = useSelector((state: RootState) => state.shiva)
  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    const fetch = async () => {
      try {
        const { id } = await dispatch(fetchShivaByKey(key, 'mourner'))
        dispatch(selectShiva(id))
      } catch (error) {
        dispatch(push(Routes.NOT_FOUND))
      }
    }
    fetch()
  }, [dispatch, key])

  return loading || !selectedShiva ? <Loading /> : <ShivaLayout role="Mourner" shiva={entities[selectedShiva]} />
}

export default MournerPage
