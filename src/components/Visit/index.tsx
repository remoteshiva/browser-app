import React, { useState, useRef, useCallback, useContext } from 'react'
import { useDispatch, useSelector} from 'react-redux'
import { ThemeContext } from 'styled-components'
import { getHours, getMinutes } from 'date-fns'
import { RootState } from '../../store/'
import { Visit as VisitModel, VisitId, Visitor as VisitorModel, Mourner } from '../../store/shiva/types'
import { selectVisit, deleteVisit, updateVisit } from '../../store/shiva/actions'
import { updateSelectedShiva } from '../../services/shiva'
import { CalendarMode } from '../types'
import { useEventListener } from '../common'
import ToolTip from './ToolTip'
import VisitData from './Data'
import Visitor from './Visitor'
import { VisitWrapper, PIXELS_PER_HOUR, PIXELS_PER_MINUTE, Pixels } from './styles'
import NewVisit from './new'

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
  mode: CalendarMode
  visit: VisitModel
  mourners: Mourner[]
  hourOffset: number
  onVisitChange: (visitId: VisitId, top: Pixels, bottom: Pixels)=>void
}

type ShowToolTip = 'Data' | 'Visitor' | null

export const Visit = ({mode, visit, mourners, hourOffset, onVisitChange}: Props) => {
  const dispatch = useDispatch()
  const theme= useContext(ThemeContext)
  const meRef = useRef<HTMLDivElement>(null)
  const rafBusy = useRef(false)
  const { selectedVisit } = useSelector((state: RootState) => state.shiva)
  const [ showTip, setShowTip] = useState<ShowToolTip>(null)
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
      setShowTip('Data')
    }
  }
  const handleDeleteEvent = (event: React.MouseEvent) => {
    event.stopPropagation()
    event.preventDefault()
    dispatch(deleteVisit(visit.id))
  }
  const handleDrag = (ev: React.MouseEvent) => handleMouseDown(ev, 'drag')
  const handleResizeFromTop = (ev: React.MouseEvent) => handleMouseDown(ev, 'resize-from-top')
  const handleResizeFromBottom = (ev: React.MouseEvent) => handleMouseDown(ev, 'resize-from-bottom')
  const handleMouseDown = (event: React.MouseEvent, type: InteractionType) => {
    event.stopPropagation()
    if (interaction.type === null && mode==='Edit'){
      setInteraction({ type, deltaX: event.clientX, deltaY: event.clientY })
    }
  }
  const handleMouseMove = useCallback((event: MouseEvent)=>{
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
  }, [interaction])
  const handleMouseUp = (event: React.MouseEvent) => {
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
  const displayAddVisitor = () => {
    setShowTip('Visitor')
  }
  const submitVisitor = (visitor: VisitorModel) => {
    setShowTip(null)
    dispatch(updateVisit({
      visitId: visit.id,
      partialVisit: {visitors: [...visit.visitors, visitor]}
    }))
    dispatch(updateSelectedShiva())
  }
  const renderToolTip = () => {
    if(selectedVisit !== visit.id)
      return null
    const node = meRef.current
    if(node){
      const rect = node.getBoundingClientRect()
      switch(showTip){
        case 'Data':
          return(
            <ToolTip left={`${rect.left}px`}  top={`${node.offsetTop}px`} onHide={hideTip}>
              <VisitData mode={mode} {...visit} mournersList={mourners} onAddVisitor={displayAddVisitor}/>
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
  const startPosition = timeToPixels(visit.startTime)
  const endPosition = timeToPixels(visit.endTime)
  return(
    <>
      <VisitWrapper
        ref={meRef}
        style={{top: `${startPosition}px`, height: `${endPosition}px`}}
        onClickCapture={handleClick}
        onMouseDown={handleDrag}
        onMouseUp={handleMouseUp}
      >
        {mode === 'Edit' ?
          <>
            <div className='close' onClick={handleDeleteEvent}></div>
            <div className='gripper gripper-top' onMouseDown={handleResizeFromTop}></div>
            <div className='gripper gripper-bottom' onMouseDown={handleResizeFromBottom}></div>
          </>
          : null
        }
        <div>{mourners.length - visit.mourners.length} Mourners</div>
        <div>{visit.visitors.length} Visitors</div>
      </VisitWrapper>
      { renderToolTip() }
    </>
  )
}

