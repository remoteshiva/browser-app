import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { updateShiva } from '../../store/shiva/actions'
import { ShivaPanel, withPanel } from './Panel'
import Editable from '../Editable'

const Meals = ({ shiva, editing, save }: ShivaPanel) => {
  const instructions = `Add link here`
  const [mealSignups, setMealSignups] = useState(shiva.mealSignups)
  const dispatch = useDispatch()
  useEffect(() => {
    const partialShiva = { mealSignups }
    dispatch(updateShiva(shiva._id, partialShiva))
  }, [save, dispatch, mealSignups, shiva._id])
  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMealSignups(event.target.value)
  }
  return (
    <>
      <h2>Minian Times</h2>
      <Editable className={editing ? 'active' : ''} html={mealSignups || editing ? '' : instructions} active={editing || false} onInput={handleInput} />
      <p>{shiva.minianTimes}</p>
    </>
  )
}

export default withPanel(Meals)
