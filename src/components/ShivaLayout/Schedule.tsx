import React from 'react'
import Calendar from '../Calendar'
import { ShivaPanel, withPanel } from './Panel'

const Schedule = ({ shiva, editing }: ShivaPanel) => {
  const renderView = () => (
    <>
      <h2>Attend the shiva</h2>
      <p>Click on a slot to see who is planning to attend and to indicate when you plan to stop by.</p>
      <Calendar startDate={shiva.startDate} endDate={shiva.endDate} visits={shiva.visits} editMode={false} />
    </>
  )
  const renderEdit = () => <>edit mode</>
  return <>{editing ? renderEdit() : renderView()}</>
}

export default withPanel(Schedule)
