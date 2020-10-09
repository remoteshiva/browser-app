import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { updateShiva } from '../../services/shiva'
import { ShivaPanel, withPanel } from './Panel'
import Editable from '../Editable'

const MinianTimes = ({ shiva, editing, save }: ShivaPanel) => {
  const instructions = `Add link here`
  const [minianTimes, setMinianTimes] = useState(shiva.minianTimes)
  const dispatch = useDispatch()
  useEffect(() => {
    if (save && save > 0) {
      const partialShiva = { minianTimes }
      dispatch(updateShiva(shiva._id, partialShiva))
    }
  }, [save, dispatch, minianTimes, shiva._id])
  const handleInput = (html: string) => {
    setMinianTimes(html)
  }
  return (
    <>
      <h2>Minian Times</h2>
      <Editable className={editing ? 'active' : ''} html={minianTimes ? minianTimes : editing ? '' : instructions} active={editing || false} onInput={handleInput} />
    </>
  )
}

export default withPanel(MinianTimes)
