import React from 'react'
import { ShivaPanel, withPanel } from './Panel'

const Meals = ({ role, shiva, editing }: ShivaPanel) => {
  const renderView = () => (
    <>
      <h2>Meal sign ups</h2>
    </>
  )
  const renderEdit = () => <>edit mode</>
  return <>{editing ? renderEdit() : renderView()}</>
}

export default withPanel(Meals)
