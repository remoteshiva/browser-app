import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { updateSelectedShiva } from '../../services/shiva'
import Calendar from '../../components/Calendar'
import { ShivaPanel, withPanel } from './Panel'

const Schedule = ({ shiva, editing, save, role }: ShivaPanel) => {
  const dispatch = useDispatch()
  useEffect(() => {
    if (save && save > 0) {
      dispatch(updateSelectedShiva())
    }
  }, [dispatch, save])
  return (
    <>
      <div style={{ paddingLeft: '30px' }}>
        <h2>Attend the Shiva</h2>
        <p style={{ fontFamily: 'Lato' }}>Click on a slot to see who is planning to attend and to indicate when you plan to stop by.</p>
      </div>
      <Calendar mode={editing ? 'Edit' : 'View'} role={role} {...shiva} />
    </>
  )
}

export default withPanel(Schedule)
