import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { patchShiva } from '../../services/shiva'
import { ShivaPanel, withPanel } from './Panel'
import Editable from '../../components/Editable'

const VideoLink = ({ shiva, editing, save }: ShivaPanel) => {
  const instructions = `Add link here`
  const [videoLink, setVideoLink] = useState(shiva.videoLink)
  const dispatch = useDispatch()
  useEffect(() => {
    if (save && save > 0) {
      console.log(`saving shiva ${save}`, videoLink)
      const partialShiva = { videoLink }
      dispatch(patchShiva(shiva.id, partialShiva))
    }
  }, [save])
  const handleInput = (html: string) => {
    try {
      const url = new URL(html)
      debugger
      setVideoLink(url)
    } catch (error) {}
  }
  const link = videoLink?.toString() || ''
  return (
    <>
      <h2>Video link</h2>
      <Editable className={editing ? 'video-link active' : 'video-link'} html={link ? link : editing ? '' : instructions} active={editing || false} onInput={handleInput} />
    </>
  )
}
export default withPanel(VideoLink)
