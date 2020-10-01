import React from 'react'
import { ShivaPanel, withPanel } from './Panel'

const About = ({ shiva, editing }: ShivaPanel) => {
  const renderView = () => (
    <>
      <h2>About {shiva.nameOfDeceased}</h2>
    </>
  )
  const renderEdit = () => <>edit mode</>
  return <>{editing ? renderEdit() : renderView()}</>
}

export default withPanel(About)
