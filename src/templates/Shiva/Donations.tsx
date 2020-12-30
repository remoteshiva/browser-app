import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { patchSelectedShiva } from '../../services/shiva'
import { ShivaPanel, withPanel } from './Panel'
import Editable from '../../components/Editable'

const Donations = ({ shiva, editing, save }: ShivaPanel) => {
  const instructions = `Add link here`
  const [donations, setDonations] = useState(shiva.donations)
  const dispatch = useDispatch()
  useEffect(() => {
    if (save && save > 0 ) {
      const partialShiva = { donations }
      dispatch(patchSelectedShiva(partialShiva))
    }
  }, [dispatch, donations, save])
  const handleInput = (html: string) => {
    setDonations(html)
  }
  return (
    <>
      <h2>Memorial donations</h2>
      <Editable className={editing ? 'active' : ''} html={donations ? donations : editing ? '' : instructions} active={editing || false} onInput={handleInput} />
    </>
  )
}
export default withPanel(Donations)
