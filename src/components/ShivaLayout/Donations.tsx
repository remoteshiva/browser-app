import React, { useState } from 'react'
import { ShivaPanel, withPanel } from './Panel'
import Editable from '../Editable'

const Donations = ({ shiva, editing }: ShivaPanel) => {
  const instructions = `Add link here`
  const [donations, setDonations] = useState(shiva.donations)
  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDonations(event.target.value)
  }
  return (
    <>
      <h2>Minian Times</h2>
      <Editable className={editing ? 'active' : ''} html={donations || editing ? '' : instructions} active={editing || false} onInput={handleInput} />
      <p>{shiva.minianTimes}</p>
    </>
  )
}
export default withPanel(Donations)
