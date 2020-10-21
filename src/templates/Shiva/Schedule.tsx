import React from 'react'
import Calendar from '../../components/Calendar'
import { ShivaPanel, withPanel } from './Panel'

const Schedule = ({ shiva, editing }: ShivaPanel) => {
  return (
    <>
      <h2>Attend the shiva</h2>
      <p>Click on a slot to see who is planning to attend and to indicate when you plan to stop by.</p>
      <Calendar startDate={shiva.startDate} endDate={shiva.endDate} visits={shiva.visits } editMode={false} />
    </>
  )
}

export default withPanel(Schedule)
