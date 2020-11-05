import React, { useEffect } from 'react'
import { useDispatch} from 'react-redux'
import { updateSelectedShiva } from '../../services/shiva'
import Calendar from '../../components/Calendar'
import { ShivaPanel, withPanel } from './Panel'

const Schedule = ({ shiva, editing, save }: ShivaPanel) => {
  const dispatch = useDispatch()
  useEffect(() => {
    if (save && save > 0 ) {
      dispatch(updateSelectedShiva())
    }
  }, [save])
  return (
    <>
      <h2>Attend the shiva</h2>
      <p>Click on a slot to see who is planning to attend and to indicate when you plan to stop by.</p>
      <Calendar mode={editing? 'Edit': 'View'} {...shiva} />
    </>
  )
}

export default withPanel(Schedule)
