import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { updateShiva } from '../../services/shiva'
import { ShivaPanel, withPanel } from './Panel'
import Editable from '../../components/Editable'

const MinianTimes = ({ shiva, editing, save }: ShivaPanel) => {
  const instructions = `Add link here`
  const dispatch = useDispatch()
  const [minianTimes, setMinianTimes] = useState(shiva.minianTimes)

  useEffect(() => {
    if (save && save > 0) {
      const partialShiva = { minianTimes }
      console.log('im saving the shiva')
      dispatch(updateShiva(shiva.id, partialShiva))
    }
  })
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
