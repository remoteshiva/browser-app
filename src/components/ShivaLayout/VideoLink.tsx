import React from 'react'
import { ShivaPanel, withPanel } from './Panel'

const VideoLink = ({ shiva, editing }: ShivaPanel) => {
  const renderView = () => (
    <>
      <h2>Video link</h2>
      <a href={shiva.videoLink?.toString()}>{shiva.videoLink?.toString()}</a>
    </>
  )
  const renderEdit = () => <>edit mode</>
  return <>{editing ? renderEdit() : renderView()}</>
}

export default withPanel(VideoLink)
