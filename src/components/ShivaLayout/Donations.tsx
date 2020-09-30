import React from 'react'
import { ShivaPanel, withPanel } from './Panel'

const Donations = ({shiva, editing}: ShivaPanel) => {
  const renderView = () =>(
    <>
      <h2>Memorial Donations</h2>
    </>
  )
  const renderEdit = () => (
    <>
      edit mode
    </>
  )
  return (
    <>{editing? renderEdit() : renderView()}</>
  )
}

export default withPanel(Donations)