import React, { useState, useRef, useContext } from 'react'
import { useDispatch, useSelector} from 'react-redux'
import { ThemeContext } from 'styled-components'
import { getHours, getMinutes } from 'date-fns'
import { RootState } from '../../store/'
import { Visit as VisitModel, VisitId, Visitor as VisitorModel, Mourner, MournerId, Role } from '../../store/shiva/types'
import { selectVisit, deleteVisit, updateVisit } from '../../store/shiva/actions'
import { updateSelectedShiva, addVisitorMessage } from '../../services/shiva'
import { CalendarMode } from '../types'
import { useEventListener } from '../common'
import ToolTip from './ToolTip'
import VisitData from './Data'
import Visitor from './Visitor'
import NewVisit from './new'
import ConfirmDeleteModal from './ConfirmDelete'
import { VisitWrapper, PIXELS_PER_HOUR, PIXELS_PER_MINUTE, Pixels } from './styles'


export { NewVisit }

type InteractionType = 'drag' | 'resize-from-top' | 'resize-from-bottom' | null
type Interaction = {
  type: InteractionType,
  deltaX: Pixels,
  deltaY: Pixels
}
const NoInteraction: Interaction = {
  type: null,
  deltaX: 0,
  deltaY: 0,
}

interface Props {
  role: Role,
  mode: CalendarMode
  visit: VisitModel
  mourners: Mourner[]
  hourOffset: number
  onVisitChange: (visitId: VisitId, top: Pixels, bottom: Pixels)=>void
}

type ShowToolTip = 'Data' | 'Visitor' | null

export const Visit = ({role, mode, visit, mourners, hourOffset, onVisitChange}: Props) => {
  const dispatch = useDispatch()
  const theme= useContext(ThemeContext)
  const meRef = useRef<HTMLDivElement>(null)
  const rafBusy = useRef(false)
  const { selectedVisit, selectedShiva } = useSelector((state: RootState) => state.shiva)
  const [ showTip, setShowTip] = useState<ShowToolTip>(null)
  const [ showConfirm, setShowConfirm ] = useState(false)
  const [ interaction, _setInteraction ] = useState<Interaction>(NoInteraction)
  const interactionRef = useRef(interaction);
  const setInteraction = (data:any) => {
    interactionRef.current = data
    _setInteraction(data)
  };

  const timeToPixels = (date: Date) => {
    const hour = getHours(date)
    const minutes = getMinutes(date)
    return (hour - hourOffset) * PIXELS_PER_HOUR + minutes * PIXELS_PER_MINUTE

  }
  const handleClick = (event: React.MouseEvent) => {
    if(mode!=='Edit'){
      dispatch(selectVisit(visit.id))
      console.log('selecting visit', visit.id)
      setShowTip('Data')
    }
  }
  const handleDeleteEvent = (event: React.MouseEvent) => {
    event.stopPropagation()
    event.preventDefault()
    if(visit.visitors.length)
      setShowConfirm(true)
    else
      handleConfirmDelete()
  }
  const handleConfirmDelete = () => {
    dispatch(deleteVisit(visit.id))
  }
  const handleDrag = (ev: React.MouseEvent) => handleMouseDown(ev, 'drag')
  const handleResizeFromTop = (ev: React.MouseEvent) => handleMouseDown(ev, 'resize-from-top')
  const handleResizeFromBottom = (ev: React.MouseEvent) => handleMouseDown(ev, 'resize-from-bottom')
  const handleMouseDown = (event: React.MouseEvent, type: InteractionType) => {
    event.stopPropagation()
    if (interaction.type === null && mode==='Edit' && visit.visitors.length===0){
      setInteraction({ type, deltaX: event.clientX, deltaY: event.clientY })
    }
  }
  const handleMouseMove = (event: MouseEvent)=>{
    event.preventDefault()
    event.stopPropagation()
    if(!rafBusy.current && interactionRef.current.type !== null){
      window.requestAnimationFrame(()=>{
        const node = meRef.current
        if(node){
          switch(interaction.type){
            case 'drag':
              node.style.top = `${node.offsetTop  + event.clientY - interactionRef.current.deltaY}px`
              break;
            case 'resize-from-top':
              node.style.top = `${node.offsetTop  + event.clientY - interactionRef.current.deltaY}px`
              node.style.height = `${node.offsetHeight - event.clientY + interactionRef.current.deltaY}px`
              break;
            case 'resize-from-bottom':
              node.style.height = `${node.offsetHeight  + event.clientY - interactionRef.current.deltaY}px`
              break;
          }
          setInteraction({
            ...interactionRef.current,
            deltaX: event.clientX,
            deltaY: event.clientY
          })
        }
        rafBusy.current = false
      })
      rafBusy.current = true
    }
  }
  const handleMouseUp = (event: MouseEvent) => {
    if(interactionRef.current.type !== null){
      const node = meRef.current
      if(node){
        onVisitChange(visit.id, node.offsetTop, node.offsetHeight)
      }
      setInteraction(NoInteraction)
      return false
    }
  }
  const hideTip = () => {
    setShowTip(null)
    dispatch(selectVisit(null))
  }
  const submitVisitor = (visitor: VisitorModel) => {
    setShowTip(null)
    dispatch(updateVisit({
      visitId: visit.id,
      partialVisit: {visitors: [...visit.visitors, visitor]}
    }))
    dispatch(updateSelectedShiva())
    // log the visitor in order to receive email from shiva
    dispatch(addVisitorMessage(visitor, visit.id, selectedShiva || ''))

  }
  const handleToggleMournerParticipation = (mourner: MournerId, attending: boolean)=>{
    if(attending){
      dispatch(updateVisit({
        visitId: visit.id,
        partialVisit: {missingMourners: visit.missingMourners.filter(m => m!==mourner)}
      }))
    }else{
      const ms = new Set(visit.missingMourners)
      ms.add(mourner)
      dispatch(updateVisit({
        visitId: visit.id,
        partialVisit: {missingMourners: Array.from(ms)}
      }))
    }
    dispatch(updateSelectedShiva())
  }
  const renderToolTip = () => {
    if(selectedVisit !== visit.id){
      return null
    }
    const node = meRef.current
    if(node){
      const rect = node.getBoundingClientRect()
      switch(showTip){
        case 'Data':
          return(
            <ToolTip left={`${rect.left}px`}  top={`${node.offsetTop}px`} onHide={hideTip}>
              <VisitData
                {...visit}
                role={role}
                mournersList={mourners}
                onAddVisitor={()=>setShowTip('Visitor')}
                onToggleMournerParticipation={handleToggleMournerParticipation}
              />
            </ToolTip>
          )
        case 'Visitor':
          return(
            <ToolTip left={`${rect.left}px`}  top={`${node.offsetTop}px`} onHide={hideTip} backgroundColor={theme.colors.sauvignonLight}>
              <Visitor onSubmitVisitor={submitVisitor} {...visit}/>
            </ToolTip>
          )
        case null:
          return null
      }
    }else{
      return null
    }
  }
  useEventListener('mousemove', handleMouseMove)
  useEventListener('mouseup', handleMouseUp)

  const startPosition = timeToPixels(visit.startTime)
  const endPosition = timeToPixels(visit.endTime)
  return(
    <>
      <VisitWrapper
        ref={meRef}
        style={{top: `${startPosition}px`, height: `${endPosition}px`}}
        onClickCapture={handleClick}
        onMouseDown={handleDrag}
      >
        {mode === 'Edit' ?
          <>
            <div className='close' onClick={handleDeleteEvent}></div>
            { visit.visitors.length===0 ? <div className='gripper gripper-top' onMouseDown={handleResizeFromTop}></div> : null }
            { visit.visitors.length===0 ? <div className='gripper gripper-bottom' onMouseDown={handleResizeFromBottom}></div>: null }
          </>
          : null
        }
        <div>{mourners.length -  (visit.missingMourners ? visit.missingMourners.length : 0)} Mourners</div>
        <div>{visit.visitors.length} Visitors</div>
      </VisitWrapper>
      { renderToolTip() }
      { showConfirm ? <ConfirmDeleteModal onConfirm={handleConfirmDelete} onCancel={()=>setShowConfirm(false)}/> : null}
    </>
  )
}

