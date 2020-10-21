import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { updateShiva } from '../../services/shiva'
import { ShivaPanel, withPanel } from './Panel'
import Editable from '../../components/Editable'

const VideoLink = ({ shiva, editing, save }: ShivaPanel) => {
  const instructions = `Add link here`
  const [videoLink, setVideoLink] = useState(shiva.videoLink)
  const dispatch = useDispatch()
  useEffect(() => {
    if (save && save > 0) {
      const partialShiva = { videoLink }
      dispatch(updateShiva(shiva.id, partialShiva))
    }
  })
  const handleInput = (html: string) => {
    try {
      const url = new URL(html)
      setVideoLink(url)
    } catch (error) {}
  }
  const link = videoLink?.toString() || ''
  return (
    <>
      <h2>Video link</h2>
      <Editable className={editing ? 'video-link active' : 'video-link'} html={link || editing ? link : instructions} active={editing || false} onInput={handleInput} />
    </>
  )
}
export default withPanel(VideoLink)
