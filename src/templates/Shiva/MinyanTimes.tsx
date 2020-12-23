import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
// import { Shiva, ShivaId } from '../../store/shiva/types' TODO: revisit these
import { patchSelectedShiva } from '../../services/shiva'
import { ShivaPanel, withPanel } from './Panel'
import Editable from '../../components/Editable'

const MinyanTimes = ({ shiva, editing, save }: ShivaPanel) => {
  const instructions = `Add link here`
  const [minyanTimes, setminyanTimes] = useState(shiva.minyanTimes)
  const dispatch = useDispatch()
  useEffect(() => {
    if (save && save > 0 ) {
      const partialShiva = { minyanTimes }
      dispatch(patchSelectedShiva(partialShiva))
    }
  }, [dispatch, minyanTimes, save])
  const handleInput = (html: string) => {
    setminyanTimes(html)
  }
  return (
    <>
      <h2>Minyan times</h2>
      <Editable
        className={editing ? 'active' : ''}
        html={minyanTimes ? minyanTimes : editing ? '' : instructions}
        active={editing || false}
        onInput={handleInput}
      />
    </>
  )
}

export default withPanel(MinyanTimes)
