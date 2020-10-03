import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { updateShiva } from '../../store/shiva/actions'
import { ShivaPanel, withPanel } from './Panel'
import Editable from '../Editable'

const VideoLink = ({ shiva, editing, save }: ShivaPanel) => {
  const instructions = `Add link here`
  const [videoLink, setVideoLink] = useState(shiva.videoLink)
  const dispatch = useDispatch()
  useEffect(() => {
    const partialShiva = { videoLink }
    dispatch(updateShiva(shiva._id, partialShiva))
  }, [save, dispatch, videoLink, shiva._id])
  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const url = new URL(event.target.value)
    setVideoLink(url)
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
