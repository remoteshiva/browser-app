import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { patchSelectedShiva } from '../../services/shiva'
import { ShivaPanel, withPanel } from './Panel'
import Editable from '../../components/Editable'


const Meals = ({ shiva, editing, save }: ShivaPanel) => {
  const instructions = `Add link here`
  const [mealSignups, setMealSignups] = useState(shiva.mealSignups)
  const dispatch = useDispatch()
  useEffect(() => {
    if (save && save > 0 ) {
      console.log(`saving shiva ${save}`)
      const partialShiva = { mealSignups }
      dispatch(patchSelectedShiva(partialShiva))
    }
  }, [save])
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
