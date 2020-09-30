import React from 'react'
import { ShivaPanel, withPanel } from './Panel'

const MinianTimes = ({shiva, editing}: ShivaPanel) => {
  const renderView = () =>(
    <>
      <h2>Minian times</h2>
      <p>The times will be the same for every day except none on Shabbat.</p>
      <p>Shacharit: 8:30</p>
      <p>Mincha: 5:00 pm</p>
      <p>Maariv: 6:00 pm</p>
      <p>You can attend the shiva minyan via Zoom at this link:</p>
      <a href={shiva.videoLink?.toString()}>{shiva.videoLink?.toString()}</a>
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

export default withPanel(MinianTimes)