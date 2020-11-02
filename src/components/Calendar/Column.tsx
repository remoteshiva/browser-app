import React, { useState, useRef, memo } from 'react'
import { useDispatch } from 'react-redux'
import { addMinutes, getDate, format } from 'date-fns'
import { VisitMap, Mourner} from '../../store/shiva/types'
import { addVisit, updateVisit, deleteVisit } from '../../store/shiva/actions'
import { initializeVisit } from '../../store/shiva/helpers'
import { withCalendarContext, CalendarContextProps } from './context'
import { Visit , NewVisit } from '../Visit'
import { ColumnWrapper, PIXELS_PER_MINUTE, PIXELS_PER_HOUR, SNAP, Pixels } from './styles'

const noop = () => {}

const pixelToMinutes = (offset: number) => (pixel: number) => offset + pixel / PIXELS_PER_MINUTE

interface Props extends CalendarContextProps {
  day: Date
  visits: VisitMap
  mourners: Mourner[]
}

const Column = memo(({mode, day, visits, mourners, endHour, startHour}:Props) => {
  const dispatch = useDispatch()
  const [dragging, setDragging] = useState(false)
  const [startY, setStartY] = useState(0)
  const [currentY, setCurrentY] = useState(0)

  const node = useRef<HTMLDivElement>(null)
  const newEventRef = useRef<HTMLDivElement>(null)
  const rafBusy = useRef(false)
  const height = (endHour - startHour) * PIXELS_PER_HOUR + 1

  const pixelToTimeDisplay = (pixels: number) => {
    return format(addMinutes(day,pixelToMinutes(startHour * 60)(pixels)), 'p')
  }
  const pixelToDate = (pixels: number) => {
    return addMinutes(day,pixelToMinutes(startHour * 60)(pixels))
  }
  const handleMouseDown = (event: React.MouseEvent) => {
    if(!rafBusy.current){
      event.persist()
      window.requestAnimationFrame(()=>{
        const y = event.nativeEvent.offsetY
        console.log('startin in hour', addMinutes(day,pixelToMinutes(startHour * 60)(y)))
        setStartY(y)
        setCurrentY(y)
        setDragging(true)
        const node = newEventRef.current
        if(node){
          node.style.top = `${y}px`
        }
        rafBusy.current = false
      })
      rafBusy.current = true
    }
  }
  const handleMouseMove = (event: React.MouseEvent) => {
    event.preventDefault()
    event.stopPropagation()
    if(!rafBusy.current && dragging){
      event.persist()
      window.requestAnimationFrame(()=>{
        const node = newEventRef.current
        if(node){
          const rect = node.getBoundingClientRect()
          const y = event.clientY - rect.top
          setCurrentY(y)
          node.style.height = `${y}px`
        }
        rafBusy.current = false
      })
      rafBusy.current = true
    }

  }
  const handleMouseUp = (event: React.MouseEvent) => {
    if(dragging){
      const node = newEventRef.current
      if(node){
        const visit = initializeVisit({
          startTime: pixelToDate(startY),
          endTime: pixelToDate(currentY)
        })
        dispatch(addVisit(visit))

      }
      setDragging(false)
      setStartY(0)
      setCurrentY(0)
    }
  }
  return (
    <ColumnWrapper
      ref={node}
      height={`${height}px`}
      mode={mode}
      onMouseDown={mode !== 'View' ? handleMouseDown : noop}
      onMouseMove={mode !== 'View' ? handleMouseMove : noop}
      onMouseUp={mode !== 'View' ? handleMouseUp : noop}
    >
      { Object.keys(visits).filter(id => getDate(visits[id].startTime) === getDate(day))
        .map((id) => (
          <Visit key={id} mode={mode} hourOffset={startHour} visit={visits[id]} mourners={mourners}/>
        ))}
      {dragging ? <NewVisit ref={newEventRef} start={pixelToTimeDisplay(startY)} end={pixelToTimeDisplay(startY+currentY)}/> : null}
    </ColumnWrapper>
  )
})


export default withCalendarContext(Column)
