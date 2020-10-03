import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { updateShiva } from '../../store/shiva/actions'
import { ShivaPanel, withPanel } from './Panel'
import Editable from '../Editable'

const MinianTimes = ({ shiva, editing, save }: ShivaPanel) => {
  const instructions = `Add link here`
  const [minianTimes, setMinianTimes] = useState(shiva.minianTimes)
  const dispatch = useDispatch()
  useEffect(() => {
    const partialShiva = { minianTimes }
    dispatch(updateShiva(shiva._id, partialShiva))
  }, [save, dispatch, minianTimes, shiva._id])
  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMinianTimes(event.target.value)
  }
  return (
    <>
      <h2>Minian Times</h2>
      <Editable className={editing ? 'active' : ''} html={minianTimes || editing ? '' : instructions} active={editing || false} onInput={handleInput} />
      <p>{shiva.minianTimes}</p>
    </>
  )
}

export default withPanel(MinianTimes)
