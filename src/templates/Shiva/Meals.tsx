import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { updateShiva } from '../../services/shiva'
import { ShivaPanel, withPanel } from './Panel'
import Editable from '../../components/Editable'

const Meals = ({ shiva, editing, save }: ShivaPanel) => {
  const instructions = `Add link here`
  const [mealSignups, setMealSignups] = useState(shiva.mealSignups)
  const dispatch = useDispatch()
  useEffect(() => {
    if (save && save > 0) {
      const partialShiva = { mealSignups }
      dispatch(updateShiva(shiva.id, partialShiva))
    }
  })
  const handleInput = (html: string) => {
    setMealSignups(html)
  }
  return (
    <>
      <h2>Meal sign ups</h2>
      <Editable className={editing ? 'active' : ''} html={mealSignups ? mealSignups : editing ? '' : instructions} active={editing || false} onInput={handleInput} />
    </>
  )
}

export default withPanel(Meals)
