import React, { useState } from 'react'
import { ShivaPanel, withPanel } from './Panel'
import Editable from '../Editable'

const Donations = ({ shiva, editing }: ShivaPanel) => {
  const instructions = `Add link here`
  const [donations, setDonations] = useState(shiva.donations)
  const handleInput = (html: string) => {
    setDonations(html)
  }
  return (
    <>
      <h2>Memorial Donations</h2>
      <Editable className={editing ? 'active' : ''} html={donations ? donations : editing ? '' : instructions} active={editing || false} onInput={handleInput} />
    </>
  )
}
export default withPanel(Donations)
