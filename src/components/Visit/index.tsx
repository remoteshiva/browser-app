import React, { useState, useRef, useCallback } from 'react'
import { useDispatch, useSelector} from 'react-redux'
import { RootState } from '../../store/'
import { getHours, getMinutes } from 'date-fns'
import { Visit as VisitModel, Visitor as VisitorModel, Mourner } from '../../store/shiva/types'
import { selectVisit, deleteVisit, updateVisit } from '../../store/shiva/actions'
import { CalendarMode } from '../types'
import ToolTip from './ToolTip'
import VisitData from './Data'
import Visitor from './Visitor'
import { VisitWrapper, PIXELS_PER_HOUR, PIXELS_PER_MINUTE } from './styles'
import NewVisit from './new'

export { NewVisit }

interface InteractionData {
  isPristine: boolean
  dragStartX: number
  dragStartY: number
  mouseX: number
  mouseY: number
}

type Interaction = { type: 'none' } | { type: 'drag'; data: InteractionData } | { type: 'resize-from-top'; data: InteractionData } | { type: 'resize-from-bottom'; data: InteractionData }
type InteractionType = 'drag' | 'resize-from-top' | 'resize-from-bottom'

interface Props {
  mode: CalendarMode
  visit: VisitModel
  mourners: Mourner[]
  hourOffset: number
}

type ShowToolTip = 'Data' | 'Visitor' | null

export const Visit = ({mode, visit, mourners, hourOffset}: Props) => {
  const dispatch = useDispatch()
  const meRef = useRef<HTMLDivElement>(null)
  const rafBusy = useRef(false)
  const { selectedVisit } = useSelector((state: RootState) => state.shiva)
  const [ showTip, setShowTip] = useState<ShowToolTip>(null)
  const [ interaction, setInteraction ] = useState<Interaction>({ type: 'none' })
  const [offsetY, setOffsetY] = useState(0)
  const offsetRef = useRef(offsetY)


  const timeToPixels = (date: Date) => {
    const hour = getHours(date)
    const minutes = getMinutes(date)
    return (hour - hourOffset) * PIXELS_PER_HOUR + minutes * PIXELS_PER_MINUTE

  }
  const handleClick = (event: React.MouseEvent) => {
    event.preventDefault()
    event.stopPropagation()
    // setClickPosition({x: event.nativeEvent.offsetX, y: event.nativeEvent.offsetY})
    dispatch(selectVisit(visit.id))
    setShowTip('Data')
  }
  const handleDeleteEvent = (event: React.MouseEvent) => {
    event.stopPropagation()
    event.preventDefault()
    dispatch(deleteVisit(visit.id))
  }

  const handleMouseDown = (event: React.MouseEvent) => {
    event.stopPropagation()
    if (interaction.type === 'none'){
      const data: InteractionData = {
        isPristine: true,
        dragStartX: event.clientX,
        dragStartY: event.clientY,
        mouseX: event.clientX,
        mouseY: event.clientY,
      }
      setInteraction({ type: 'drag', data })
    }
  }
  const handleMouseMove = (event: React.MouseEvent) => {
    event.preventDefault()
    event.stopPropagation()
    if(!rafBusy.current && interaction.type === 'drag'){
      event.persist()
      window.requestAnimationFrame(()=>{
        const node = meRef.current
        if(node){
          node.style.top = `${node.offsetTop  + event.clientY - interaction.data.mouseY}px`
          setInteraction({
            ...interaction,
            data: {
              ...interaction.data,
              mouseY: event.clientY
            }
          })
        }
        rafBusy.current = false
      })
      rafBusy.current = true
    }
  }

  const handleMouseUp = (event: React.MouseEvent) => {
    event.stopPropagation()
    setInteraction({ type: 'none' })
  }

  const hideTip = () => {
    setShowTip(null)
    dispatch(selectVisit(null))
  }

  const displayAddVisitor = () => {
    setShowTip('Visitor')
    console.log('show the add visitor')
  }

  const submitVisitor = (visitor: VisitorModel) => {
    setShowTip(null)
    dispatch(updateVisit({
      visitId: visit.id,
      partialVisit: {visitors: [...visit.visitors, visitor]}
    }))
  }

  const renderToolTip = () => {
    if(selectedVisit !== visit.id)
      return null
    const node = meRef.current
    if(node){
      switch(showTip){
        case 'Data':
          return <ToolTip left='100px' top={node.style.top} onHide={hideTip}><VisitData mode={mode} {...visit} mournersList={mourners} onAddVisitor={displayAddVisitor}/></ToolTip>
        case 'Visitor':
          return <ToolTip left='100px' top={node.style.top} onHide={hideTip}><Visitor onSubmitVisitor={submitVisitor} {...visit}/></ToolTip>
        case null:
          return null
      }
    }else{
      return null
    }
  }

  const startPosition = timeToPixels(visit.startTime)
  const endPosition = timeToPixels(visit.endTime)
  return(
    <>
      <VisitWrapper
        ref={meRef}
        style={{top: `${startPosition}px`, height: `${endPosition}px`}}
        onClickCapture={handleClick}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      >
        {mode === 'Edit' ?
          <>
            <div className='close' onClick={handleDeleteEvent}></div>
            <div className='gripper-bottom' onClickCapture={ev => ev.stopPropagation()}></div>
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


/*
interface State {
  interaction: Interaction
}

type popup = 'VisitData' | 'VisitAdd'
export const CalendarEventOld = ({editMode, visit, hourOffset, mourners}:Props) => {
  const dispatch = useDispatch()
  const [clickPosition, setClickPosition ] = useState({x: 0, y: 0})
  const [popupType, setPopupType] = useState<popup>('VisitData')
  const { selectedVisit } = useSelector((state: RootState) => state.shiva)
  const hour = getHours(visit.startTime)
  const minutes = getMinutes(visit.startTime)
  const offset = (hour - hourOffset) * PIXELS_PER_HOUR + minutes * PIXELS_PER_MINUTE

  const handleClick = (event: React.MouseEvent) => {
    event.preventDefault()
    event.stopPropagation()
    setClickPosition({x: event.nativeEvent.offsetX, y: event.nativeEvent.offsetY})
    dispatch(selectVisit(visit.id))
  }
  const handleMouseDown = (event: React.MouseEvent) => {
    event.stopPropagation()
  }
  const handleDeleteEvent = (event: React.MouseEvent) => {
    dispatch(deleteVisit(visit.id))
  }
  return(
    <>
      <VisitWrapper onClick={handleClick} onMouseDown={handleMouseDown} top={offset} height={PIXELS_PER_HOUR * 4}>
        {editMode? <div className='close' onClick={handleDeleteEvent}></div> : null}
        <div>{visit.mourners.length} Mourners</div>
        <div>{visit ? visit.visitors.length : 0} Visitors</div>
      </VisitWrapper>
      { selectedVisit ===visit.id  ?
        popupType === 'VisitData' ?
          <ToolTip left={clickPosition.x} top={clickPosition.y}><VisitData {...visit} mournersList={mourners} visitAdd={()=>{setPopupType('VisitAdd')}}/></ToolTip> :
          <ToolTip left={clickPosition.x} top={clickPosition.y}><VisitAdd {...visit}/></ToolTip> :
        null
      }
    </>

  )
}
*/

